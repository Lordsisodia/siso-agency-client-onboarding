
import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChatAssistant } from '@/hooks/use-chat-assistant';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { useChatInterfaceState } from './useChatInterfaceState';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatFooter } from './ChatFooter';

// Define a unified ChatMessage type
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
  
  // Create a wrapper for the sendMessage function to handle different parameter types
  const adaptedSendMessage = useCallback((message: string, formData?: Record<string, any>) => {
    if (usePlanAssistant) {
      return planChat.sendMessage(message, systemPrompt, formData);
    } else {
      return regularChat.sendMessage(message, systemPrompt);
    }
  }, [usePlanAssistant, planChat, regularChat, systemPrompt]);
  
  // Use the custom hook for handling chat interface state
  const {
    onlineStatus,
    retryCount,
    handleRetry,
    handleSendMessage
  } = useChatInterfaceState({
    messages: rawMessages as ChatMessage[], // Cast the messages to our unified type
    isLoading,
    error,
    clearMessages,
    welcomeMessage,
    systemPrompt,
    sendMessage: adaptedSendMessage
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
        messagesCount={rawMessages?.length || 0}
        onClear={() => clearMessages()}
      />
      
      <ChatMessageList 
        messages={rawMessages as ChatMessage[]} // Cast the messages to our unified type
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
