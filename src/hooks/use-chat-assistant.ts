
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { showPointsEarnedToast } from '@/components/points/PointsEarnedToast';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
};

export type OnboardingProgress = {
  current_stage: string;
  progress: number;
  data: Record<string, any>;
};

export interface UseChatAssistantProps {
  isOnboarding?: boolean;
  projectId?: string;
}

export function useChatAssistant({ isOnboarding = false, projectId }: UseChatAssistantProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onboardingProgress, setOnboardingProgress] = useState<OnboardingProgress | null>(null);
  const { toast } = useToast();

  // Fetch onboarding progress at initialization if in onboarding mode
  useEffect(() => {
    if (isOnboarding) {
      const fetchOnboardingProgress = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const { data, error } = await supabase
            .from('client_onboarding')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error("Error fetching onboarding progress:", error);
            return;
          }

          if (data) {
            const stages = ['COMPANY_INFO', 'PROJECT_OVERVIEW', 'FEATURE_SELECTION', 'BUDGET_TIMELINE', 'ADDITIONAL_INFO'];
            const completedStages = Object.keys(data.data || {}).filter(key => stages.includes(key));
            const progress = Math.round((completedStages.length / stages.length) * 100);

            setOnboardingProgress({
              current_stage: data.current_stage || 'COMPANY_INFO',
              progress,
              data: data.data || {}
            });
          } else {
            setOnboardingProgress({
              current_stage: 'COMPANY_INFO',
              progress: 0,
              data: {}
            });
          }
        } catch (error) {
          console.error("Error in fetchOnboardingProgress:", error);
        }
      };

      fetchOnboardingProgress();
    }
  }, [isOnboarding]);

  const sendMessage = useCallback(async (message: string, systemPrompt?: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Add user message with timestamp
    const userMessage: ChatMessage = { 
      role: 'user', 
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get the current user, if logged in
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('chat-with-assistant', {
        body: { 
          message,
          systemPrompt,
          userId,
          projectId,
          isOnboarding
        },
      });

      if (error) throw error;

      if (!data || !data.response) {
        throw new Error('No response received from assistant');
      }

      // Update onboarding progress if available
      if (data.onboardingProgress) {
        setOnboardingProgress(data.onboardingProgress);
      }

      // Add assistant response with timestamp
      const assistantMessage: ChatMessage = {
        role: 'assistant', 
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Award points if user is logged in
      if (userId) {
        try {
          // Award points for chat interaction
          await supabase.from('points_log').insert([{
            user_id: userId,
            action: 'chat_interaction',
            points_earned: 2
          }]);
          
          // Show points earned toast
          showPointsEarnedToast({ 
            points: 2, 
            action: 'Chatting with AI Assistant' 
          });
        } catch (pointsError) {
          console.error('Error awarding points:', pointsError);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to get response from assistant');
      
      toast({
        title: "Error",
        description: "Failed to get response from assistant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast, projectId, isOnboarding]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    onboardingProgress
  };
}
