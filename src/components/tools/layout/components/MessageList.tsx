
import React, { useRef, useEffect } from 'react';
import { ChatMessageBubble } from './ChatMessageBubble';
import { TypingIndicator } from './TypingIndicator';

// Define a message type that matches what we're receiving
export interface ToolsMessage {
  id?: string;
  content: string;
  sender: 'user' | 'assistant'; // Using 'sender' rather than 'role'
  timestamp?: Date;
}

interface MessageListProps {
  messages: ToolsMessage[];
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
          }}
          isUser={message.sender === 'user'}
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
