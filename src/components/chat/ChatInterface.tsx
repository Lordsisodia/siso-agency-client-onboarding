
import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChatAssistant } from '@/hooks/use-chat-assistant';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useChatInterfaceState } from './useChatInterfaceState';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatFooter } from './ChatFooter';

// Define a common ChatMessage type that works with both hooks
export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  id?: string;
};

interface ChatInterfaceProps {
  title?: string;
  systemPrompt?: string;
  welcomeMessage?: string;
  inputPlaceholder?: string;
  className?: string;
  usePlanAssistant?: boolean;
  projectId?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = 'AI Assistant',
  systemPrompt,
  welcomeMessage = 'Hello! How can I help you today?',
  inputPlaceholder = 'Type your message...',
  className,
  usePlanAssistant = false,
  projectId
}) => {
  // Choose which chat hook to use based on the usePlanAssistant prop
  const regularChat = useChatAssistant();
  const planChat = usePlanChatAssistant(projectId);
  
  // Use the appropriate chat hook
  const { 
    messages: rawMessages, 
    isLoading, 
    error, 
    sendMessage: hookSendMessage, 
    clearMessages 
  } = usePlanAssistant ? planChat : regularChat;
  
  // Map messages to ensure they match our expected ChatMessage type
  const messages = (rawMessages || []).map(msg => ({
    ...msg,
    role: msg.role === "system" ? "system" : msg.role
  })) as any[];
  
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
    sendMessage: (message: string, formData?: Record<string, any>) => {
      return hookSendMessage(message, formData as any);
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col h-full bg-siso-bg-card/20 backdrop-blur-md border border-siso-border rounded-xl overflow-hidden shadow-xl ${className}`}
    >
      <ChatHeader 
        title={title}
        onlineStatus={onlineStatus}
        isLoading={isLoading}
        messagesCount={messages.length}
        onClear={() => clearMessages()}
      />
      
      <ChatMessageList 
        messages={messages as any}
        isLoading={isLoading}
        error={error}
        onlineStatus={onlineStatus}
        onRetry={handleRetry}
        retryCount={retryCount}
      />
      
      <ChatFooter 
        onSubmit={handleSendMessage}
        isLoading={isLoading}
        inputPlaceholder={inputPlaceholder}
        onlineStatus={onlineStatus}
      />
    </motion.div>
  );
};
