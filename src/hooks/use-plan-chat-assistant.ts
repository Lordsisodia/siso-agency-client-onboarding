
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
      
      // Create a fallback AI response in case the edge function fails
      const fallbackResponse = {
        response: "I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        threadId: threadId || null
      };
      
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
        
        // Show error toast
        toast({
          title: "Service Unavailable",
          description: "Unable to connect to the AI service. Please try again later.",
          variant: "destructive"
        });
        
        throw new Error(`Supabase function error: ${functionError.message || 'Unknown error'}`);
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
        m.content.includes("I'm having trouble connecting")
      )) {
        let errorMessage = 'Failed to get response from assistant';
        
        if (error instanceof Error) {
          errorMessage = `Error: ${error.message}`;
        }
        
        // Check for specific network issues
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
          errorMessage = 'Network error: Unable to connect to the assistant service. Please check your connection and try again.';
        }
        
        setError(errorMessage);
        
        // We don't need another toast since we already showed one earlier
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
