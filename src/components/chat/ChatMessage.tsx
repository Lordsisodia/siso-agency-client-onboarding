
import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/types/chat';

export interface ChatMessageProps {
  message: ChatMessageType;
  assistantType?: string;
  isLoading?: boolean;
  role?: 'user' | 'assistant'; // Add role property to support direct passing
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  assistantType,
  isLoading,
  role: explicitRole // Accept explicit role if provided
}) => {
  // Use explicit role if provided, otherwise use message.role
  const isUser = explicitRole ? explicitRole === 'user' : message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          px-4 py-3 rounded-lg max-w-[80%] shadow-sm
          ${isUser ? 'bg-siso-orange-100 text-siso-orange-800' : 'bg-white text-siso-text'}
          ${message.loading || isLoading ? 'animate-pulse' : ''}
        `}
      >
        {message.loading || isLoading ? (
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-siso-text/40 rounded-full animate-bounce delay-100"></div>
            <div className="h-2 w-2 bg-siso-text/40 rounded-full animate-bounce delay-200"></div>
            <div className="h-2 w-2 bg-siso-text/40 rounded-full animate-bounce delay-300"></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        )}
      </div>
    </motion.div>
  );
};
