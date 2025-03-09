
import React from 'react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat-bubble';
import { ChatMessage } from '../hooks/useChatAssistantState';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  return (
    <ChatBubble key={message.id} variant={message.sender === 'assistant' ? 'received' : 'sent'}>
      {message.sender === 'assistant' && (
        <ChatBubbleAvatar
          className="h-8 w-8"
          src="/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png"
          fallback="AI"
        />
      )}
      <ChatBubbleMessage>
        {message.content}
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
