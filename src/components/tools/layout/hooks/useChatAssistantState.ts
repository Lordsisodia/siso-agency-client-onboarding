
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function useChatAssistantState() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      content: "Hello! I'm your AI tools assistant. How can I help you find the right tools for your needs?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const { toast } = useToast();

  // Load thread ID from localStorage on component mount
  useEffect(() => {
    const savedThreadId = localStorage.getItem('tools_assistant_thread_id');
    if (savedThreadId) {
      setThreadId(savedThreadId);
      console.log('Loaded existing thread ID:', savedThreadId);
    }
  }, []);

  const generateFallbackResponse = (userInput: string): string => {
    const lowerCaseInput = userInput.toLowerCase();
    
    if (lowerCaseInput.includes('daily summary') || lowerCaseInput.includes('news summary')) {
      return "You can find the daily AI news summary on the AI News page. It provides executive summaries, key points, and industry impacts specifically for agency owners.";
    }
    
    if (lowerCaseInput.includes('ai news') || lowerCaseInput.includes('news')) {
      return "Our AI News section provides daily curated articles about AI developments relevant to agency owners. You can access categorized news, impact assessments, and daily summaries.";
    }
    
    if (lowerCaseInput.includes('tools') || lowerCaseInput.includes('recommendations')) {
      return "We offer various AI tools categorized by function. You can browse them in the Tools section, where you'll find descriptions, ratings, and use cases for each tool.";
    }

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi') || lowerCaseInput.includes('hey')) {
      return "Hello! I'm here to help you navigate our AI tools and features. What would you like to know about?";
    }
    
    return "I'd be happy to help you with that. You can explore our AI tools, news, and resources through the navigation menu. Is there something specific you're looking for?";
  };

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!inputValue.trim() || isSubmitting) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSubmitting(true);
    
    try {
      // Try using the Supabase edge function for AI responses
      const { data, error } = await supabase.functions.invoke('chat-with-plan-assistant', {
        body: { 
          messages: [{ role: 'user', content: userMessage.content }],
          threadId: threadId
        },
      });
      
      if (error) {
        console.error('Error calling AI assistant:', error);
        throw new Error(`Failed to get AI response: ${error.message}`);
      }
      
      if (data?.threadId && threadId !== data.threadId) {
        // Save the thread ID for future conversations
        setThreadId(data.threadId);
        localStorage.setItem('tools_assistant_thread_id', data.threadId);
        console.log('Saved new thread ID:', data.threadId);
      }
      
      // Add AI response
      const botResponse: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: data?.response || generateFallbackResponse(inputValue.trim()),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback to local response generation if the edge function fails
      const fallbackResponse: ChatMessage = {
        id: `assistant-fallback-${Date.now()}`,
        content: generateFallbackResponse(inputValue.trim()),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      
      toast({
        title: 'Connection Issue',
        description: 'Using offline mode. Some features may be limited.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [inputValue, isSubmitting, threadId, toast]);

  return {
    messages,
    inputValue,
    setInputValue,
    isSubmitting,
    handleSubmit
  };
}
