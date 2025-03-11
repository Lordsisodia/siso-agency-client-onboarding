
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/chat';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onlineStatus: boolean;
  onRetry: () => void;
  retryCount: number;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  error,
  onlineStatus,
  onRetry,
  retryCount,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Determine if we're showing a loading state
  const showLoadingState = isLoading && messages.length > 0 && 
    messages[messages.length - 1].role === 'user';
    
  return (
    <ScrollArea className="flex-1 px-4 py-6">
      <div className="space-y-6 max-w-3xl mx-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={`${index}-${retryCount}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1 * Math.min(index, 5),
                ease: "easeOut" 
              }}
            >
              <ChatMessageComponent
                role={message.role}
                content={message.content}
                isLoading={isLoading && index === messages.length - 1 && message.role === 'assistant'}
                timestamp={message.timestamp}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {!onlineStatus && (
          <Alert variant="warning" className="mb-4 animate-fade-in bg-amber-900/20 border-amber-500/50">
            <WifiOff className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              You're currently offline. The assistant will continue when you reconnect.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="default" className="mb-4 animate-fade-in bg-blue-900/10 border-blue-500/50">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetry}
                disabled={isLoading || !onlineStatus}
                className="ml-2"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {showLoadingState && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatMessageComponent
              role="assistant"
              content=""
              isLoading={true}
            />
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
