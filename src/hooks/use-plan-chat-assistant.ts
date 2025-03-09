
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
      console.log('Sending message to chat-with-plan-assistant function', { 
        projectId, 
        threadId, 
        messageLength: message.length 
      });
      
      // Call the plan assistant edge function
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
        throw new Error(`Connection issue: ${functionError.message || 'Service temporarily unavailable'}`);
      }
      
      if (!data) {
        throw new Error('No data returned from function');
      }
      
      console.log('Response from AI assistant:', {
        responseLength: data.response?.length || 0,
        threadId: data.threadId || 'none'
      });
      
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
      console.error('Error communicating with assistant:', error);
      
      setError(error instanceof Error ? error.message : 'Connection to the AI service interrupted');
      
      // Show more specific error messages to the user
      let errorMessage = 'There was a problem connecting to the AI assistant.';
      
      if (error instanceof Error) {
        if (error.message.includes('Assistant verification failed')) {
          errorMessage = 'The AI assistant configuration is invalid. Please contact support.';
        } else if (error.message.includes('Connection issue')) {
          errorMessage = 'Connection to the AI service interrupted. Please try again later.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Connection Issue",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Add error message as system message
      const errorSystemMessage: ChatMessage = {
        role: 'system',
        content: `Error: ${errorMessage}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorSystemMessage]);
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
