
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function useChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string, systemPrompt?: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);

    // Add user message
    const updatedMessages = [
      ...messages,
      { role: 'user', content: message }
    ];
    setMessages(updatedMessages);

    try {
      // Get the current user, if logged in
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('chat-with-assistant', {
        body: { 
          message,
          systemPrompt,
          userId
        },
      });

      if (error) throw error;

      // Add assistant response
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response }
      ]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from assistant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
}
