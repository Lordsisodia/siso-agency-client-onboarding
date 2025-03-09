
import React, { useRef, useEffect } from 'react';
import { ChatMessageList } from '@/components/ui/chat-message-list';
import { ChatMessage } from '../hooks/useChatAssistantState';
import { ChatMessageBubble } from './ChatMessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  isSubmitting: boolean;
}

export function MessageList({ messages, isSubmitting }: MessageListProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the bottom when messages change or when loading
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSubmitting]);

  return (
    <ChatMessageList>
      {messages.map((message) => (
        <ChatMessageBubble key={message.id || `${message.role}-${message.timestamp?.getTime() || Date.now()}`} message={message} />
      ))}
      {isSubmitting && <TypingIndicator />}
      <div ref={messageEndRef} />
    </ChatMessageList>
  );
}
