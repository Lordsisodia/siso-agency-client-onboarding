
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
  metadata?: {
    web_search?: boolean;
    reasoning?: boolean;
    structured_data?: any;
    [key: string]: any;
  };
}

interface UsePlanChatAssistantOptions {
  useWebSearch?: boolean;
  useReasoning?: boolean;
  extractProjectData?: boolean;
}

export function usePlanChatAssistant(projectId?: string, options: UsePlanChatAssistantOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [useWebSearch, setUseWebSearch] = useState(options.useWebSearch || false);
  const [useReasoning, setUseReasoning] = useState(options.useReasoning || false);
  const { toast } = useToast();

  // Load conversation ID if we have a project ID
  useEffect(() => {
    if (projectId) {
      initializeConversation(projectId);
    }
  }, [projectId]);

  // Initialize a conversation ID
  const initializeConversation = async (projectId: string) => {
    try {
      console.log("Initializing conversation for project:", projectId);
      
      // Get a conversation ID from the edge function
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
      if (conversationId) {
        console.log("Received conversation ID:", conversationId);
        setConversationId(conversationId);
      }
    } catch (err) {
      console.error('Error initializing conversation:', err);
    }
  };

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const toggleWebSearch = useCallback(() => {
    setUseWebSearch(prev => !prev);
    toast({
      title: useWebSearch ? "Web search disabled" : "Web search enabled",
      description: useWebSearch ? "AI will use only its training data." : "AI will search the web for current information when relevant."
    });
  }, [useWebSearch, toast]);
  
  const toggleReasoning = useCallback(() => {
    setUseReasoning(prev => !prev);
    toast({
      title: useReasoning ? "Advanced reasoning disabled" : "Advanced reasoning enabled",
      description: useReasoning ? "AI will use standard reasoning." : "AI will use advanced reasoning capabilities for complex problems."
    });
  }, [useReasoning, toast]);

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
      const userMessage: Message = { 
        id: userMessageId, 
        role: 'user', 
        content,
        metadata: {
          web_search: useWebSearch,
          reasoning: useReasoning
        }
      };
      
      // Add user message to UI immediately
      setMessages(prev => [...prev, userMessage]);

      // Optimize the system prompt to encourage returning structured data
      const enhancedSystemPrompt = systemPrompt ? 
        `${systemPrompt}\n\nWhen possible, include structured data about the project in JSON format wrapped in triple backticks (\`\`\`json ... \`\`\`) to help build the project overview. Include fields like title, description, businessContext (industry, companyName, target_audience), goals, features, and timeline when you have that information.` 
        : undefined;

      // Optimistically show the loading message
      setMessages(prev => [...prev, { 
        id: uuidv4(), 
        role: 'assistant', 
        content: '', 
        loading: true,
        metadata: {
          web_search: useWebSearch,
          reasoning: useReasoning
        }
      }]);

      // Generate a temporary conversation ID if none exists
      if (!conversationId) {
        const tempConversationId = uuidv4();
        setConversationId(tempConversationId);
      }

      try {
        // Make the API call to the Edge Function with proper message format
        const { data, error: apiError } = await supabase.functions.invoke('chat-with-plan-assistant', {
          body: {
            messages: [...messages, userMessage].map(({ id, loading, ...rest }) => rest),
            projectId,
            conversationId,
            formData,
            stream: true,
            userId: (await supabase.auth.getUser()).data.user?.id,
            useWebSearch,
            useReasoning,
            systemPrompt: enhancedSystemPrompt
          }
        });

        // Remove the loading message
        setMessages(prev => prev.filter(msg => !msg.loading));

        if (apiError) {
          console.error('Error getting reply:', apiError);
          setError(`Failed to get a response: ${apiError.message || 'Unknown error'}`);
          toast({
            title: 'Error',
            description: 'Failed to get a response from the assistant.',
            variant: 'destructive',
          });
          return;
        } 
        
        if (data) {
          // If this is our first message, save the conversation ID from the response
          if (data.conversationId) {
            setConversationId(data.conversationId);
          }
          
          // Extract structured data if present in JSON format
          let structuredData = null;
          const jsonMatch = data.response?.match(/```json\n([\s\S]*?)\n```/);
          if (jsonMatch && jsonMatch[1]) {
            try {
              structuredData = JSON.parse(jsonMatch[1]);
            } catch (e) {
              console.error("Failed to parse JSON from AI response", e);
            }
          }
          
          const assistantMessage: Message = {
            id: uuidv4(),
            role: 'assistant',
            content: data.response || 'Sorry, I couldn\'t generate a response.',
            metadata: {
              web_search: data.web_search || useWebSearch,
              reasoning: data.reasoning || useReasoning,
              model: data.model,
              structured_data: structuredData
            }
          };
          
          setMessages(prev => [...prev.filter(msg => !msg.loading), assistantMessage]);
          return data;
        } else {
          // Handle case where there's no error but also no data
          setError('No response received from the assistant');
          toast({
            title: 'Error',
            description: 'No response received from the assistant.',
            variant: 'destructive',
          });
        }
      } catch (err: any) {
        // Handle edge function error
        console.error('Edge function error:', err);
        setError(`Failed to communicate with backend: ${err.message || 'Unknown error'}`);
        
        // Remove the loading message and add an error message
        setMessages(prev => {
          const filtered = prev.filter(msg => !msg.loading);
          return [...filtered, {
            id: uuidv4(),
            role: 'assistant',
            content: 'Sorry, I encountered an error while trying to respond. Please try again later.',
            metadata: {
              error: true
            }
          }];
        });
        
        toast({
          title: 'Connection Error',
          description: 'There was a problem connecting to the AI service. Please try again.',
          variant: 'destructive',
        });
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
  }, [messages, projectId, conversationId, toast, useWebSearch, useReasoning]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    conversationId,
    useWebSearch,
    useReasoning,
    toggleWebSearch,
    toggleReasoning
  };
}
