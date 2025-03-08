
import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { AIThinkingLoader } from '@/components/ui/ai-thinking-loader';

interface ChatMessageProps {
  role: 'assistant' | 'user';
  content: string;
  assistantType?: string;
  isLoading?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  role, 
  content, 
  assistantType = 'AI Assistant',
  isLoading = false
}) => {
  const isAssistant = role === 'assistant';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        isAssistant 
          ? "bg-siso-bg-card border border-siso-border" 
          : "bg-gradient-to-r from-siso-red/5 to-siso-orange/5 border border-siso-border"
      )}
    >
      <div className="flex-shrink-0 mt-1">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isAssistant ? "bg-gradient-to-r from-siso-red to-siso-orange" : "bg-siso-bg-card border border-siso-border"
        )}>
          {isAssistant ? (
            <Bot className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-siso-text" />
          )}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="text-xs text-siso-text-muted mb-1">
          {isAssistant ? assistantType : 'You'}
        </div>
        
        {isLoading ? (
          <AIThinkingLoader variant="default" showStages={true} />
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};
