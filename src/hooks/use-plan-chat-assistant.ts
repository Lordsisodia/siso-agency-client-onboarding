
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { v4 as uuidv4 } from 'uuid';

type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id?: string;
  role: MessageRole;
  content: string;
  loading?: boolean;
}

interface UsePlanChatAssistantProps {
  projectId?: string;
}

export function usePlanChatAssistant(projectId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [responseId, setResponseId] = useState<string | null>(null);
  const { toast } = useToast();

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setThreadId(null);
    setResponseId(null);
  }, []);

  const sendMessage = useCallback(async (
    content: string, 
    systemPrompt?: string, 
    formData?: Record<string, any>
  ) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add user message to state
      const userMessageId = uuidv4();
      const userMessage: Message = { id: userMessageId, role: 'user', content };
      
      // Prepare the messages array, including system message if provided
      const messagesArray = [...messages, userMessage];
      
      // Add system message to the beginning if provided and not already present
      if (systemPrompt && !messages.some(m => m.role === 'system')) {
        messagesArray.unshift({
          id: uuidv4(),
          role: 'system',
          content: systemPrompt
        });
      }
      
      setMessages(prev => [...prev, userMessage]);

      // Optimistically show the loading message
      setMessages(prev => [...prev, { 
        id: uuidv4(), 
        role: 'assistant', 
        content: '', 
        loading: true 
      }]);

      // Make the API call to the Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-plan-assistant', {
        body: {
          messages: messagesArray.map(({ id, loading, ...rest }) => rest),
          projectId,
          formData,
          threadId,
          responseId
        }
      });

      // Remove the loading message
      setMessages(prev => prev.filter(msg => !msg.loading));

      if (error) {
        console.error('Error getting reply:', error);
        setError(`Failed to get a response: ${error.message || 'Unknown error'}`);
        toast({
          title: 'Error',
          description: 'Failed to get a response from the assistant.',
          variant: 'destructive',
        });
      } else if (data) {
        // Store thread ID for conversation continuity
        if (data.threadId) {
          setThreadId(data.threadId);
        }
        
        // Store response ID for API continuity
        if (data.responseId) {
          setResponseId(data.responseId);
          console.log('Stored Response ID:', data.responseId);
        }
        
        const assistantMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: data.response || 'Sorry, I couldn\'t generate a response.'
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        return data;
      }
    } catch (err: any) {
      console.error('Error in chat:', err);
      setError(`Something went wrong: ${err.message || 'Unknown error'}`);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, projectId, threadId, responseId, toast]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    threadId,
    responseId
  };
}
