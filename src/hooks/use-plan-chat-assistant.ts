
import { useState, useCallback, useEffect } from 'react';
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

export function usePlanChatAssistant(projectId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { toast } = useToast();

  // Load previous conversation messages if we have a project ID
  useEffect(() => {
    if (projectId) {
      loadConversationHistory(projectId);
    }
  }, [projectId]);

  // Load conversation history from the database
  const loadConversationHistory = async (projectId: string) => {
    try {
      // First, fetch or create a conversation ID for this project
      const { data: convData, error: convError } = await supabase.functions.invoke(
        'chat-with-plan-assistant', 
        {
          body: { action: 'get-conversation', projectId }
        }
      );
      
      if (convError) {
        console.error('Error fetching conversation:', convError);
        return;
      }
      
      const conversationId = convData?.conversationId;
      setConversationId(conversationId);
      
      if (conversationId) {
        // Fetch messages for this conversation
        const { data: historyData, error: historyError } = await supabase
          .from('plan_chat_history')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('message_order', { ascending: true });
        
        if (historyError) {
          console.error('Error fetching chat history:', historyError);
          return;
        }
        
        if (historyData && historyData.length > 0) {
          // Transform the data to our message format
          const formattedMessages = historyData.map((item): Message => ({
            id: item.id,
            role: item.user_message ? 'user' : 'assistant',
            content: item.user_message || item.ai_response
          }));
          
          setMessages(formattedMessages);
        }
      }
    } catch (err) {
      console.error('Error loading conversation history:', err);
    }
  };

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
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
      
      // Add user message to UI immediately
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
          messages: [...messages, userMessage].map(({ id, loading, ...rest }) => rest),
          projectId,
          conversationId,
          formData,
          stream: true,
          userId: (await supabase.auth.getUser()).data.user?.id
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
        // If this is our first message, save the conversation ID from the response
        if (!conversationId && data.conversationId) {
          setConversationId(data.conversationId);
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
  }, [messages, projectId, conversationId, toast]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    conversationId
  };
}
