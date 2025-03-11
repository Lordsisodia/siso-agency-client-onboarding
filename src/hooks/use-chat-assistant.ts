
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/types/chat';

export function useChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
      // Simple mock response for development
      const assistantMessage: ChatMessage = {
        role: 'assistant', 
        content: `I received your message: "${message}"`,
        timestamp: new Date()
      };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      // Set a user-friendly error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to get response from assistant';
      
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast]);

  // Modified to accept initial messages
  const clearMessages = useCallback((initialMessages: ChatMessage[] = []) => {
    setMessages(initialMessages);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
}
