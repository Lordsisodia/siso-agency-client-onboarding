
import { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { AnimatePresence } from 'framer-motion';
import { PreChatState } from '@/components/home/PreChatState';
import { EnhancedChatState } from '@/components/home/EnhancedChatState';
import { ChatMessage, ProcessingStage, AgentCategory } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

export default function PlanBuilder() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Initialize assistant message with first stage
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: '',
      loading: true,
      processingStage: {
        current: 'initial',
        progress: 0
      },
      agentResponses: {
        'ai-tools': { category: 'ai-tools', content: '', status: 'pending', relevance: 0 },
        'videos': { category: 'videos', content: '', status: 'pending', relevance: 0 },
        'networking': { category: 'networking', content: '', status: 'pending', relevance: 0 },
        'assistants': { category: 'assistants', content: '', status: 'pending', relevance: 0 },
        'educators': { category: 'educators', content: '', status: 'pending', relevance: 0 },
        'news': { category: 'news', content: '', status: 'pending', relevance: 0 }
      }
    }]);
    
    setIsLoading(true);

    try {
      // Simulate the multi-stage processing
      const stages: ProcessingStage[] = ['initial', 'context', 'agents', 'synthesis'];
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      // Initial understanding stage
      await delay(1000);
      updateProcessingStage('initial');

      // Company context stage
      await delay(1000);
      updateProcessingStage('context');

      // Agent processing stage
      await delay(1000);
      updateProcessingStage('agents');

      // Simulate individual agent processing
      const agentCategories: AgentCategory[] = ['ai-tools', 'videos', 'networking', 'assistants', 'educators', 'news'];
      for (const category of agentCategories) {
        await delay(800);
        updateAgentStatus(category, 'processing');
        await delay(1200);
        updateAgentStatus(category, 'complete');
      }

      // Final synthesis stage
      await delay(1000);
      updateProcessingStage('synthesis');

      // Get the final response from the edge function
      const { data, error } = await supabase.functions.invoke('chat-with-plan-assistant', {
        body: { messages: formatMessagesForAPI(messages, message) }
      });

      if (error) throw error;

      // Update with final response
      setMessages(prev => {
        const newMessages = [...prev.slice(0, -1)];
        newMessages.push({ 
          role: 'assistant', 
          content: data.message || "I've analyzed your project needs. How would you like to proceed with your app planning?",
          loading: false
        });
        return newMessages;
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessagesForAPI = (currentMessages: ChatMessage[], latestMessage: string) => {
    // Format messages for the API - include only content and role
    const formattedMessages = currentMessages
      .filter(msg => !msg.loading)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));
    
    // Add the latest message if it's not already included
    if (!formattedMessages.some(msg => msg.role === 'user' && msg.content === latestMessage)) {
      formattedMessages.push({
        role: 'user',
        content: latestMessage
      });
    }
    
    return formattedMessages;
  };

  const updateProcessingStage = (stage: ProcessingStage) => {
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage.role === 'assistant') {
        return [...prev.slice(0, -1), {
          ...lastMessage,
          processingStage: {
            ...lastMessage.processingStage!,
            current: stage
          }
        }];
      }
      return prev;
    });
  };

  const updateAgentStatus = (category: AgentCategory, status: 'pending' | 'processing' | 'complete') => {
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage.role === 'assistant' && lastMessage.agentResponses) {
        return [...prev.slice(0, -1), {
          ...lastMessage,
          agentResponses: {
            ...lastMessage.agentResponses,
            [category]: {
              ...lastMessage.agentResponses[category],
              status
            }
          }
        }];
      }
      return prev;
    });
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen w-full bg-gradient-to-b from-siso-bg to-siso-bg/95 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        <div className="relative z-10 flex-1 p-4 md:p-8">
          <div className="h-[calc(100vh-8rem)]">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <PreChatState 
                  handleSubmit={handleSubmit} 
                  isLoading={isLoading} 
                  searchPlaceholders={[
                    "What type of app do you want to build?",
                    "What are the main features you need?",
                    "What's your budget range for this project?",
                    "When do you need this project completed?",
                    "Tell me about your business requirements...",
                  ]}
                  titleText="Plan Builder"
                  subtitleText="Create detailed specifications for your custom app. Our interactive builder helps you define requirements and generate accurate estimates."
                />
              ) : (
                <EnhancedChatState 
                  messages={messages} 
                  handleSubmit={handleSubmit} 
                  isLoading={isLoading} 
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
