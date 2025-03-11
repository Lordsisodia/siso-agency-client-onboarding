
import { useState, useEffect } from 'react';
import { ChatMessage } from '@/types/chat';

interface UseChatInterfaceStateProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  clearMessages: (initialMessages?: ChatMessage[]) => void;
  welcomeMessage: string;
  systemPrompt?: string;
  sendMessage: (message: string) => Promise<void>;
}

export const useChatInterfaceState = ({
  messages,
  isLoading,
  error,
  clearMessages,
  welcomeMessage,
  systemPrompt,
  sendMessage
}: UseChatInterfaceStateProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [hasAutoRetried, setHasAutoRetried] = useState(false);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true);
      // If we were offline and now we're back online, consider auto-retrying the last message
      if (!onlineStatus && !hasAutoRetried && messages.length > 0) {
        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
        if (lastUserMessage && error) {
          console.log('Auto-retrying last message after reconnection');
          setHasAutoRetried(true);
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            sendMessage(lastUserMessage.content);
          }, 1000); // Wait a second before auto-retry
        }
      }
    };
    const handleOffline = () => setOnlineStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onlineStatus, messages, error, hasAutoRetried, sendMessage]);

  // Add welcome message on mount, but only if there are no existing messages
  useEffect(() => {
    if (!isInitialized && messages.length === 0) {
      // Create a welcome message directly instead of sending it through the API
      const welcomeMsg: ChatMessage = {
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      };
      
      // Add the welcome message to messages state through the clear function
      clearMessages([welcomeMsg]);
      setIsInitialized(true);
    }
  }, [isInitialized, messages.length, clearMessages, welcomeMessage]);

  // Reset auto-retry flag when error is cleared
  useEffect(() => {
    if (!error) {
      setHasAutoRetried(false);
    }
  }, [error]);

  const handleRetry = () => {
    // Find the last user message and resend it
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setRetryCount(prev => prev + 1);
      sendMessage(lastUserMessage.content);
    }
  };

  const handleSendMessage = async (message: string) => {
    // Reset retry count on new message
    setRetryCount(0);
    setHasAutoRetried(false);
    
    // Check online status before sending
    if (!onlineStatus) {
      return;
    }
    
    try {
      await sendMessage(message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return {
    onlineStatus,
    retryCount,
    handleRetry,
    handleSendMessage,
  };
};
