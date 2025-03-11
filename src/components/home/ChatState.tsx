
import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '../chat/ChatMessage';
import { HomeMessage } from './types';
import { v4 as uuidv4 } from 'uuid';

interface ChatStateProps {
  messages: HomeMessage[];
  isLoading: boolean;
  onSubmit: (message: string) => void;
}

export const ChatState: React.FC<ChatStateProps> = ({ messages, isLoading, onSubmit }) => {
  // Helper function to convert HomeMessage to ChatMessage type
  const convertToChatMessage = (message: HomeMessage) => ({
    id: message.id || uuidv4(),
    role: message.role,
    content: message.content,
    loading: !!message.isLoading
  });

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 pb-6">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatMessage 
              message={convertToChatMessage(message)}
            />
          </motion.div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ChatMessage 
              message={{
                role: 'assistant',
                content: '',
                loading: true
              }}
            />
          </motion.div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {/* Input component would go here */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
            if (input.value.trim()) {
              onSubmit(input.value);
              input.value = '';
            }
          }}
          className="flex items-center space-x-2"
        >
          <input
            name="message"
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
