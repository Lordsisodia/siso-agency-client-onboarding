
import React from 'react';
import { ChatMessageList } from '@/components/ui/chat-message-list';
import { ChatMessage } from '../hooks/useChatAssistantState';
import { ChatMessageBubble } from './ChatMessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  isSubmitting: boolean;
}

export function MessageList({ messages, isSubmitting }: MessageListProps) {
  return (
    <ChatMessageList>
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
      {isSubmitting && <TypingIndicator />}
    </ChatMessageList>
  );
}
