
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatAssistant, ChatMessage as ChatMessageType } from '@/hooks/use-chat-assistant';
import { usePlanChatAssistant } from '@/hooks/use-plan-chat-assistant';
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle, RefreshCw, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  title?: string;
  systemPrompt?: string;
  welcomeMessage?: string;
  inputPlaceholder?: string;
  className?: string;
  usePlanAssistant?: boolean;
  projectId?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = 'AI Assistant',
  systemPrompt,
  welcomeMessage = 'Hello! How can I help you today?',
  inputPlaceholder = 'Type your message...',
  className,
  usePlanAssistant = false,
  projectId
}) => {
  // Choose which chat hook to use based on the usePlanAssistant prop
  const regularChat = useChatAssistant();
  const planChat = usePlanChatAssistant(projectId);
  
  // Use the appropriate chat hook
  const { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearMessages 
  } = usePlanAssistant ? planChat : regularChat;
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Add welcome message on mount, but only if there are no existing messages
  useEffect(() => {
    if (!isInitialized && messages.length === 0) {
      // Create a welcome message directly instead of sending it through the API
      const welcomeMsg: ChatMessageType = {
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      };
      
      // Add the welcome message to messages state through the clear function
      // which will reset messages and add our welcome message
      clearMessages([welcomeMsg]);
      setIsInitialized(true);
    }
  }, [isInitialized, messages.length, clearMessages, welcomeMessage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleRetry = () => {
    // Find the last user message and resend it
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setRetryCount(prev => prev + 1);
      sendMessage(lastUserMessage.content, systemPrompt);
    }
  };

  const handleSendMessage = async (message: string) => {
    // Reset retry count on new message
    setRetryCount(0);
    
    // Check online status before sending
    if (!onlineStatus) {
      return;
    }
    
    await sendMessage(message, systemPrompt);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col h-full bg-siso-bg-card/20 backdrop-blur-md border border-siso-border rounded-xl overflow-hidden shadow-xl ${className}`}
    >
      {title && (
        <div className="p-4 border-b border-siso-border bg-gradient-to-r from-siso-red/10 to-siso-orange/10 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center animate-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-siso-text">{title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            {onlineStatus ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => clearMessages()}
              disabled={isLoading || messages.length === 0}
              title="Clear conversation"
              className="text-siso-text-muted hover:text-siso-red transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
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
                <ChatMessage
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
                You're currently offline. Please check your internet connection.
              </AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive" className="mb-4 animate-fade-in">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  disabled={isLoading || !onlineStatus}
                  className="ml-2"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage
                role="assistant"
                content=""
                isLoading={true}
              />
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-siso-border bg-gradient-to-r from-black/10 to-transparent backdrop-blur-lg">
        <ChatInput 
          onSubmit={handleSendMessage} 
          isLoading={isLoading} 
          placeholder={inputPlaceholder}
          disabled={!onlineStatus}
        />
        {!onlineStatus && (
          <p className="text-xs text-amber-500 mt-2 flex items-center">
            <WifiOff className="h-3 w-3 mr-1" />
            You're offline. Messaging is unavailable.
          </p>
        )}
      </div>
    </motion.div>
  );
}
