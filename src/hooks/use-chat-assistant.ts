
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { showPointsEarnedToast } from '@/components/points/PointsEarnedToast';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
};

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

      if (!data || !data.response) {
        throw new Error('No response received from assistant');
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
  }, [isLoading, toast]);

  const clearMessages = useCallback(() => {
    setMessages([]);
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
