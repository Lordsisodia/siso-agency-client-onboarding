import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessageProps } from '@/types/chat';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { HomeMessage } from './types';

// Other code remains the same

// Update the rendering of chat messages
export const ChatState: React.FC<{
  messages: HomeMessage[];
  typingMessage?: string;
  isLoading?: boolean;
}> = ({ messages, typingMessage, isLoading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * Math.min(index, 3) }}
        >
          <ChatMessage message={{
            id: message.id || `msg-${index}`,
            role: message.role,
            content: message.content
          }} />
        </motion.div>
      ))}
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ChatMessage 
            message={{
              id: 'loading',
              role: 'assistant',
              content: '',
              loading: true
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export const ChatStateWrapper: React.FC<{
  messages: HomeMessage[];
  typingMessage?: string;
  isLoading?: boolean;
}> = ({ messages, typingMessage, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="p-4 border-b border-gray-200 bg-white/80">
        <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
        <p className="text-sm text-gray-500">Ask me anything about AI and technology</p>
      </div>
      
      <ChatState 
        messages={messages}
        typingMessage={typingMessage}
        isLoading={isLoading}
      />
      
      <div className="p-4 border-t border-gray-200 bg-white/80">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};
