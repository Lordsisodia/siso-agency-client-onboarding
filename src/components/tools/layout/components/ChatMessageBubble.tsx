
import React from 'react';
import { ChatMessage } from '@/components/chat/ChatInterface';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isUser: boolean;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-3/4 p-3 rounded-lg 
          ${isUser ? 
            'bg-primary text-primary-foreground' : 
            'bg-muted text-muted-foreground'
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
};
