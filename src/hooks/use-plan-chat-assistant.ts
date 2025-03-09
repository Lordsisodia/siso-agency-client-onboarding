
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
};

export function usePlanChatAssistant(projectId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const { toast } = useToast();

  const clearMessages = useCallback((initialMessages: ChatMessage[] = []) => {
    setMessages(initialMessages);
  }, []);

  const sendMessage = useCallback(async (message: string, systemPrompt?: string, formData?: Record<string, any>) => {
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);

    // Add user message to UI immediately
    const userMessage: ChatMessage = { 
      role: 'user', 
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      console.log('Preparing to send message to chat-with-plan-assistant function');
      
      // Create a fallback AI response for resilience
      let fallbackResponse = {
        response: "I'm analyzing your project requirements. While I prepare a detailed response, here's what I understand so far: you're looking to create a comprehensive project plan. Could you provide more details about your specific requirements or timeline expectations?",
        threadId: threadId || null
      };
      
      if (formData) {
        fallbackResponse = {
          response: "Thank you for providing your project details. I'm working on creating a comprehensive plan based on your requirements. In the meantime, could you share any additional constraints or preferences you might have for this project?",
          threadId: threadId || null
        };
      }
      
      // Call the plan assistant edge function with improved error handling
      const { data, error: functionError } = await supabase.functions.invoke('chat-with-plan-assistant', {
        body: { 
          messages: [...messages, userMessage],
          projectId,
          formData,
          threadId
        },
      });

      if (functionError) {
        console.error('Function error details:', functionError);
        
        // Use the fallback response in case of error
        const assistantMessage: ChatMessage = {
          role: 'assistant', 
          content: fallbackResponse.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Show error toast but with less alarming messaging
        toast({
          title: "AI Service Notice",
          description: "I'm using a fallback response while the AI service reconnects. Your project planning will continue.",
          variant: "default"
        });
        
        throw new Error(`Connection issue: ${functionError.message || 'Service temporarily unavailable'}`);
      }
      
      if (!data) {
        throw new Error('No data returned from function');
      }
      
      console.log('Success! Response from assistant:', data);
      
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      // Add assistant response
      const assistantMessage: ChatMessage = {
        role: 'assistant', 
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with assistant (detailed):', error);
      
      // Only set error if we haven't already added a fallback message
      if (!messages.find(m => 
        m.role === 'assistant' && 
        m.content.includes("I'm analyzing your project requirements")
      )) {
        let errorMessage = 'Connection to planning service interrupted';
        
        if (error instanceof Error) {
          errorMessage = `Notice: ${error.message}`;
        }
        
        // Check for specific network issues
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
          errorMessage = 'Network issue detected. The planning service will reconnect shortly.';
        }
        
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, projectId, threadId, toast]);

  return {
    messages,
    isLoading,
    error,
    threadId,
    sendMessage,
    clearMessages
  };
}
