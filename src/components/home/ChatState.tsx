import React, { useState, useEffect } from 'react';
import { ChatMessage } from '../chat/ChatMessage';
import { motion } from 'framer-motion';
import { HomeMessage } from './types';

export const ChatState: React.FC = () => {
  const [messages, setMessages] = useState<HomeMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      assistantType: 'general'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setIsLoading(true);
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            role: 'user',
            content: newMessage,
          },
          {
            role: 'assistant',
            content: "This is a dummy response. I'm still under development!",
            assistantType: 'general',
            isLoading: false
          }
        ]);
        setNewMessage('');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-4 p-4"
    >
      {messages.map((message, index) => (
        <ChatMessage 
          key={index}
          message={{
            role: message.role,
            content: message.content,
            id: index.toString()
          }} 
          assistantType={message.assistantType}
          isLoading={message.isLoading}
        />
      ))}
      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </motion.div>
  );
};
