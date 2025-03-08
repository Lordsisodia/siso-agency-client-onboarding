
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type OnboardingStep = 'welcome' | 'profile' | 'goals' | 'complete';

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  profileData?: any;
  goalsData?: any;
}

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
};

export function useOnboardingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [progress, setProgress] = useState<OnboardingProgress>({
    currentStep: 'welcome',
    completedSteps: [],
  });
  const { toast } = useToast();

  const initOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get or create onboarding thread
      const { data, error } = await supabase.functions.invoke('manage-user-threads', {
        body: {
          action: 'get-or-create',
          userId: user.id,
          metadata: { 
            purpose: 'onboarding',
            currentStep: 'welcome',
            completedSteps: []
          }
        },
      });

      if (error) throw error;
      
      // Set thread ID
      setThreadId(data.id);
      
      // Get existing messages for this thread
      const chatResponse = await supabase.functions.invoke('chat-with-assistant', {
        body: {
          threadId: data.id,
          getMessages: true,
          userId: user.id
        }
      });
      
      if (chatResponse.error) throw chatResponse.error;
      
      // If it's a new thread, add welcome message
      if (data.isNew || !chatResponse.data?.messages?.length) {
        const welcomeMsg: ChatMessage = {
          role: 'assistant',
          content: "Welcome to SISO! I'm here to help you get started. Let's set up your profile and understand your goals. What's your name and what type of business do you run?",
          timestamp: new Date()
        };
        setMessages([welcomeMsg]);
      } else {
        // Load existing messages
        setMessages(chatResponse.data.messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at)
        })));
        
        // Load progress
        const { data: threadData } = await supabase
          .from('user_threads')
          .select('metadata')
          .eq('thread_id', data.id)
          .single();
          
        if (threadData?.metadata) {
          setProgress({
            currentStep: threadData.metadata.currentStep || 'welcome',
            completedSteps: threadData.metadata.completedSteps || [],
            profileData: threadData.metadata.profileData,
            goalsData: threadData.metadata.goalsData
          });
        }
      }
    } catch (err) {
      console.error('Error initializing onboarding:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize onboarding');
      toast({
        title: "Error",
        description: "Failed to load onboarding assistant",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading || !threadId) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMessage: ChatMessage = { 
      role: 'user', 
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get the system prompt based on current step
      let systemPrompt = "You are an onboarding assistant for SISO, a platform for agencies. Help the user set up their profile and understand their goals. Be friendly, conversational, and guide them through the process step by step.";
      
      if (progress.currentStep === 'profile') {
        systemPrompt += " Focus on collecting information about their business, including business name, size, industry, and services offered.";
      } else if (progress.currentStep === 'goals') {
        systemPrompt += " Focus on understanding their goals, challenges, and what they hope to achieve with SISO.";
      }

      // Call the chat function
      const { data, error } = await supabase.functions.invoke('chat-with-assistant', {
        body: { 
          message,
          threadId,
          assistantId: 'onboarding',
          systemPrompt,
          userId: user.id
        },
      });

      if (error) throw error;

      // Add assistant response
      const assistantMessage: ChatMessage = {
        role: 'assistant', 
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update progress based on content analysis
      let updatedProgress = {...progress};
      
      if (progress.currentStep === 'welcome' && messages.length > 2) {
        // Move to profile step after initial exchange
        updatedProgress = {
          ...progress,
          currentStep: 'profile',
          completedSteps: [...progress.completedSteps, 'welcome'],
          profileData: { ...progress.profileData, started: true }
        };
      } else if (progress.currentStep === 'profile' && messages.length > 6) {
        // Move to goals step after profile collection
        updatedProgress = {
          ...progress,
          currentStep: 'goals',
          completedSteps: [...progress.completedSteps, 'profile'],
          goalsData: { started: true }
        };
      } else if (progress.currentStep === 'goals' && messages.length > 10) {
        // Complete onboarding
        updatedProgress = {
          ...progress,
          currentStep: 'complete',
          completedSteps: [...progress.completedSteps, 'goals']
        };
      }
      
      // Save progress
      if (updatedProgress !== progress) {
        setProgress(updatedProgress);
        
        // Update in database
        await supabase.functions.invoke('manage-user-threads', {
          body: {
            action: 'update-onboarding',
            userId: user.id,
            threadId,
            progress: updatedProgress
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to get response from assistant');
      toast({
        title: "Error",
        description: "Failed to get response from assistant",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, threadId, progress, messages.length, toast]);

  return {
    messages,
    isLoading,
    error,
    threadId,
    progress,
    initOnboarding,
    sendMessage
  };
}
