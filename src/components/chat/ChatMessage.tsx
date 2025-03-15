
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { ThinkingDots } from './processing/ThinkingDots';

export interface ChatMessageProps {
  message?: ChatMessageType;
  content?: string;
  assistantType?: string;
  isLoading?: boolean;
  role?: 'user' | 'assistant' | string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  content,
  assistantType,
  isLoading,
  role: explicitRole
}) => {
  // Use explicit role if provided, otherwise use message.role
  const isUser = explicitRole 
    ? explicitRole === 'user' 
    : (message && typeof message.role === 'string' && message.role === 'user');
  
  // Use content prop directly or from message object
  const displayContent = content || (message?.content || '');

  // State for typewriter effect
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Apply typewriter effect when message content changes and it's an assistant message
  useEffect(() => {
    if (!isUser && !isLoading && displayContent && displayContent.trim() !== '') {
      setIsTyping(true);
      setDisplayedText('');
      
      let i = 0;
      const speed = 10; // ms per character - adjust for faster/slower typing
      
      const typeWriter = () => {
        if (i < displayContent.length) {
          setDisplayedText(displayContent.substring(0, i + 1));
          i++;
          setTimeout(typeWriter, speed);
        } else {
          setIsTyping(false);
        }
      };
      
      typeWriter();
    } else if (isUser) {
      // For user messages, display text immediately
      setDisplayedText(displayContent);
    }
  }, [displayContent, isUser, isLoading]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          px-5 py-4 rounded-lg max-w-[80%] shadow-md border
          ${isUser 
            ? 'bg-gradient-to-r from-siso-orange/90 to-siso-red/90 text-white border-siso-orange/20' 
            : 'bg-gradient-to-r from-slate-800/90 to-slate-900/90 text-slate-50 border-white/10'
          }
          ${(message?.loading || isLoading) ? 'animate-pulse' : ''}
        `}
      >
        {(message?.loading || isLoading) ? (
          <ThinkingDots />
        ) : (
          <div className="whitespace-pre-wrap break-words leading-relaxed">
            {isUser ? displayedText : (isTyping ? (
              <>
                {displayedText}
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-siso-orange/70 animate-pulse"></span>
              </>
            ) : displayedText)}
          </div>
        )}
      </div>
    </motion.div>
  );
};
