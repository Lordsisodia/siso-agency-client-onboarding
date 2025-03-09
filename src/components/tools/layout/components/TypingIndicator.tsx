
import React from 'react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat-bubble';

export function TypingIndicator() {
  return (
    <ChatBubble variant="received">
      <ChatBubbleAvatar
        className="h-8 w-8"
        src="/lovable-uploads/c482563a-42db-4f47-83f2-c2e7771400b7.png"
        fallback="AI"
      />
      <ChatBubbleMessage>
        <div className="flex space-x-1">
          <div className="animate-bounce delay-0">•</div>
          <div className="animate-bounce delay-150">•</div>
          <div className="animate-bounce delay-300">•</div>
        </div>
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
