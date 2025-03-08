
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatAssistant, ChatMessage as ChatMessageType } from '@/hooks/use-chat-assistant';
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const { messages, isLoading, error, sendMessage, clearMessages } = useChatAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Add welcome message on mount
  useEffect(() => {
    if (!isInitialized && messages.length === 0) {
      sendMessage(welcomeMessage, systemPrompt);
      setIsInitialized(true);
    }
  }, [isInitialized, messages.length, sendMessage, systemPrompt, welcomeMessage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleRetry = () => {
    // Find the last user message and resend it
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content, systemPrompt);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-siso-bg-card border border-siso-border rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="p-4 border-b border-siso-border flex items-center justify-between bg-gradient-to-r from-siso-red/10 to-siso-orange/10">
          <h2 className="text-lg font-semibold text-siso-text">{title}</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearMessages}
            disabled={isLoading || messages.length === 0}
            title="Clear conversation"
            className="text-siso-text-muted hover:text-siso-red"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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
              timestamp={message.timestamp}
            />
          ))}
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  disabled={isLoading}
                  className="ml-2"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <ChatMessage
              role="assistant"
              content=""
              isLoading={true}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-siso-border">
        <ChatInput 
          onSubmit={(message) => sendMessage(message, systemPrompt)} 
          isLoading={isLoading} 
          placeholder={inputPlaceholder}
        />
      </div>
    </div>
  );
};
