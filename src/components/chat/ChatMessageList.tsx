
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useAutoScroll } from '@/hooks/use-auto-scroll';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import { ChatMessage } from '@/types/chat';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  error?: string | null;
  onlineStatus?: 'online' | 'offline' | 'reconnecting';
  onRetry?: () => void;
  retryCount?: number;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  error,
  onlineStatus = 'online',
  onRetry,
  retryCount = 0,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use our custom hook to scroll to bottom on new messages
  useAutoScroll({
    dependencies: [messages, isLoading, error],
    behavior: 'smooth',
    targetRef: messagesEndRef
  });

  // Empty state when no messages
  if (messages.length === 0 && !isLoading && !error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-siso-text-light">
        <p className="text-center max-w-md">
          {onlineStatus === 'offline' 
            ? "You're currently offline. Please check your connection and try again."
            : "No messages yet. Start a conversation by typing below."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesEndRef}>
      {messages.map((message, index) => (
        <motion.div 
          key={message.id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * Math.min(index, 3) }}
        >
          <ChatMessageComponent message={message} />
        </motion.div>
      ))}
      
      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-2"
        >
          <ChatMessageComponent 
            message={{ role: 'assistant', content: '', loading: true }} 
          />
        </motion.div>
      )}
      
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center p-3 mt-2 bg-red-50 text-red-700 rounded-lg"
        >
          <AlertTriangle className="shrink-0 mr-2 h-5 w-5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{error}</p>
            {onRetry && (
              <button 
                onClick={onRetry}
                className="text-xs underline mt-1 hover:text-red-900"
              >
                Retry {retryCount > 0 ? `(${retryCount})` : ''}
              </button>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Offline message */}
      {onlineStatus === 'offline' && (
        <div className="p-3 bg-gray-100 text-gray-700 rounded-lg text-sm mt-4">
          You're currently offline. Messages will be sent when you're back online.
        </div>
      )}
      
      {/* Reconnecting message */}
      {onlineStatus === 'reconnecting' && (
        <div className="p-3 bg-amber-50 text-amber-700 rounded-lg text-sm mt-4">
          Reconnecting to server...
        </div>
      )}
    </div>
  );
};
