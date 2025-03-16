
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useChatAssistant, usePlanChatAssistant } from '@/hooks/core';
import { useChatInterfaceState } from './useChatInterfaceState';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatFooter } from './ChatFooter';
import { ChatMessage } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Globe, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  title?: string;
  systemPrompt?: string;
  welcomeMessage?: string;
  inputPlaceholder?: string;
  className?: string;
  projectId?: string;
  usePlanAssistant?: boolean;
  messages?: ChatMessage[]; // Added messages prop
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = 'AI Assistant',
  systemPrompt,
  welcomeMessage = 'Hello! How can I help you today?',
  inputPlaceholder = 'Type your message...',
  className,
  projectId,
  usePlanAssistant = false,
  messages: propMessages, // Accept messages from props
}) => {
  // State for AI enhancement options
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [useReasoning, setUseReasoning] = useState(false);

  // Create basic toggle functions for regular chat (these will be overridden by plan assistant if used)
  const defaultToggleWebSearch = useCallback(() => {
    setUseWebSearch(prev => !prev);
  }, []);

  const defaultToggleReasoning = useCallback(() => {
    setUseReasoning(prev => !prev);
  }, []);

  // Use the chat assistant hook based on usePlanAssistant boolean
  const { 
    messages: hookMessages, 
    isLoading, 
    error, 
    sendMessage: hookSendMessage, 
    clearMessages,
    toggleWebSearch = defaultToggleWebSearch,
    toggleReasoning = defaultToggleReasoning 
  } = usePlanAssistant 
    ? usePlanChatAssistant(projectId, { useWebSearch, useReasoning }) 
    : { 
        messages: useChatAssistant().messages, 
        isLoading: useChatAssistant().isLoading, 
        error: useChatAssistant().error, 
        sendMessage: useChatAssistant().sendMessage, 
        clearMessages: useChatAssistant().clearMessages,
        toggleWebSearch: defaultToggleWebSearch,
        toggleReasoning: defaultToggleReasoning
      };
  
  // Use provided messages or the ones from the hook
  const messages = (propMessages || hookMessages || []).map(msg => ({
    ...msg,
    role: msg.role as "user" | "assistant"
  })) as ChatMessage[];
  
  // Use the custom hook for handling chat interface state
  const {
    onlineStatus,
    retryCount,
    handleRetry,
    handleSendMessage
  } = useChatInterfaceState({
    messages,
    isLoading,
    error,
    clearMessages,
    welcomeMessage,
    systemPrompt,
    sendMessage: (message: string) => {
      return hookSendMessage(message, systemPrompt || undefined);
    }
  });

  // Toggle handlers
  const handleToggleWebSearch = useCallback(() => {
    setUseWebSearch(prev => !prev);
    toggleWebSearch();
  }, [toggleWebSearch]);

  const handleToggleReasoning = useCallback(() => {
    setUseReasoning(prev => !prev);
    toggleReasoning();
  }, [toggleReasoning]);

  // Convert onlineStatus string to boolean
  const isOnline = onlineStatus === 'online';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col h-full bg-siso-bg-card/20 backdrop-blur-md border border-siso-border rounded-xl overflow-hidden shadow-xl ${className}`}
    >
      <ChatHeader 
        title={title}
        onlineStatus={isOnline}
        isLoading={isLoading}
        messagesCount={messages.length}
        onClear={() => clearMessages()}
      >
        {usePlanAssistant && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-8 w-8 rounded-full",
                useWebSearch && "bg-blue-500/20 text-blue-400"
              )}
              title={useWebSearch ? "Disable web search" : "Enable web search"}
              onClick={handleToggleWebSearch}
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-8 w-8 rounded-full",
                useReasoning && "bg-purple-500/20 text-purple-400"
              )}
              title={useReasoning ? "Disable advanced reasoning" : "Enable advanced reasoning"}
              onClick={handleToggleReasoning}
            >
              <Brain className="h-4 w-4" />
            </Button>
          </div>
        )}
      </ChatHeader>
      
      <ChatMessageList 
        messages={messages}
        isLoading={isLoading}
        error={error}
        onlineStatus={isOnline}
        onRetry={handleRetry}
        retryCount={retryCount}
      />
      
      <ChatFooter 
        onSubmit={handleSendMessage}
        isLoading={isLoading}
        inputPlaceholder={inputPlaceholder}
        onlineStatus={isOnline}
        useWebSearch={useWebSearch}
        useReasoning={useReasoning}
      />
    </motion.div>
  );
};
