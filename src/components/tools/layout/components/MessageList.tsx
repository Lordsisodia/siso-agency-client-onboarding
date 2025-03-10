
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat/ChatInterface';
import { ChatMessageBubble } from './ChatMessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: any[]; // Use any[] to accommodate different message types
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
          message={{
            role: message.sender === 'user' ? 'user' : 'assistant',
            content: message.content
          } as ChatMessage}
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
