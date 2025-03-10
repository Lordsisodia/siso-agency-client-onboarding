
import React, { useRef, useEffect } from 'react';
import { ChatMessageBubble } from './ChatMessageBubble';
import { TypingIndicator } from './TypingIndicator';

// Define a local interface that matches the structure expected by this component
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  role?: 'user' | 'assistant' | 'system';
}

interface MessageListProps {
  messages: ChatMessage[];
  isSubmitting: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isSubmitting 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessageBubble
          key={index}
          message={message.content}
          isUser={message.sender === 'user' || message.role === 'user'}
        />
      ))}
      
      {isSubmitting && (
        <div className="flex justify-start">
          <TypingIndicator />
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
