
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatAssistant, ChatMessage as ChatMessageType } from '@/hooks/use-chat-assistant';

interface ChatInterfaceProps {
  title?: string;
  systemPrompt?: string;
  welcomeMessage?: string;
  inputPlaceholder?: string;
  className?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = 'AI Assistant',
  systemPrompt,
  welcomeMessage = 'Hello! How can I help you today?',
  inputPlaceholder = 'Type your message...',
  className
}) => {
  const { messages, isLoading, sendMessage } = useChatAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      sendMessage(welcomeMessage, systemPrompt);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex flex-col h-full bg-siso-bg-card border border-siso-border rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="p-4 border-b border-siso-border bg-gradient-to-r from-siso-red/10 to-siso-orange/10">
          <h2 className="text-lg font-semibold text-siso-text">{title}</h2>
        </div>
      )}
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              isLoading={isLoading && index === messages.length - 1 && message.role === 'assistant'}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-siso-border">
        <ChatInput 
          onSubmit={sendMessage} 
          isLoading={isLoading} 
          placeholder={inputPlaceholder}
        />
      </div>
    </div>
  );
};
