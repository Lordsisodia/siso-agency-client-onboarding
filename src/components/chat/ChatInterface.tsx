
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useChatAssistant, usePlanChatAssistant } from '@/hooks/core';
import { useChatInterfaceState } from './useChatInterfaceState';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatFooter } from './ChatFooter';
import { ChatMessage } from '@/types/chat';

interface ChatInterfaceProps {
  title?: string;
  systemPrompt?: string;
  welcomeMessage?: string;
  inputPlaceholder?: string;
  className?: string;
  projectId?: string;
  usePlanAssistant?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = 'AI Assistant',
  systemPrompt,
  welcomeMessage = 'Hello! How can I help you today?',
  inputPlaceholder = 'Type your message...',
  className,
  projectId,
  usePlanAssistant = false
}) => {
  // Use the chat assistant hook based on usePlanAssistant boolean
  const { 
    messages: rawMessages, 
    isLoading, 
    error, 
    sendMessage: hookSendMessage, 
    clearMessages 
  } = usePlanAssistant ? usePlanChatAssistant(projectId) : useChatAssistant();
  
  // Map messages to ensure they match our ChatMessage type
  const messages = (rawMessages || []).map(msg => ({
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
      />
      
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
      />
    </motion.div>
  );
};
