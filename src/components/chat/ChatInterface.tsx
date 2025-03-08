
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatAssistant, ChatMessage as ChatMessageType } from '@/hooks/use-chat-assistant';
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface ChatInterfaceProps {
  title?: string;
  systemPrompt?: string;
  welcomeMessage?: string;
  inputPlaceholder?: string;
  className?: string;
  isOnboarding?: boolean;
  projectId?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = 'AI Assistant',
  systemPrompt,
  welcomeMessage = 'Hello! How can I help you today?',
  inputPlaceholder = 'Type your message...',
  className,
  isOnboarding = false,
  projectId
}) => {
  const { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearMessages,
    onboardingProgress
  } = useChatAssistant({ 
    isOnboarding,
    projectId
  });
  
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

  // Map onboarding stages to user-friendly names (if in onboarding mode)
  const stageLabels: Record<string, string> = {
    'COMPANY_INFO': 'Company Information',
    'PROJECT_OVERVIEW': 'Project Overview',
    'FEATURE_SELECTION': 'Features & Requirements',
    'BUDGET_TIMELINE': 'Budget & Timeline',
    'ADDITIONAL_INFO': 'Additional Details',
  };

  return (
    <div className={`flex flex-col h-full bg-siso-bg-card border border-siso-border rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="p-4 border-b border-siso-border flex items-center justify-between bg-gradient-to-r from-siso-red/10 to-siso-orange/10">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-siso-text">{title}</h2>
            {isOnboarding && onboardingProgress && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-siso-text-muted">
                    Current stage: {stageLabels[onboardingProgress.current_stage] || onboardingProgress.current_stage}
                  </span>
                  <span className="text-xs font-medium text-siso-text-muted">{onboardingProgress.progress}%</span>
                </div>
                <Progress value={onboardingProgress.progress} className="h-1.5" />
              </div>
            )}
          </div>
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
              assistantType={isOnboarding && message.role === 'assistant' ? 'Project Consultant' : undefined}
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
              assistantType={isOnboarding ? 'Project Consultant' : undefined}
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
