
import React from 'react';
import { Bot, User, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { AIThinkingLoader } from '@/components/ui/ai-thinking-loader';
import { useToast } from '@/hooks/use-toast';

interface ChatMessageProps {
  role: 'assistant' | 'user';
  content: string;
  assistantType?: string;
  isLoading?: boolean;
  timestamp?: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  role, 
  content, 
  assistantType = 'AI Assistant',
  isLoading = false,
  timestamp
}) => {
  const isAssistant = role === 'assistant';
  const { toast } = useToast();
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied",
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex gap-4 p-4 rounded-xl backdrop-blur-sm transition-all",
        isAssistant 
          ? "bg-siso-bg-card/40 border border-siso-border hover:border-siso-border-hover shadow-lg" 
          : "bg-gradient-to-r from-siso-red/5 to-siso-orange/5 border border-siso-border/50 hover:border-siso-border"
      )}
    >
      <div className="flex-shrink-0 mt-1">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center relative",
          isAssistant ? "bg-gradient-to-r from-siso-red to-siso-orange" : "bg-siso-bg-card border border-siso-border"
        )}>
          {isAssistant ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-siso-text" />
          )}
          
          {isAssistant && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-siso-red to-siso-orange opacity-30"
              initial={{ scale: 0.85 }}
              animate={{ scale: [0.85, 1.1, 0.85] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-sm text-siso-text-muted">
            {isAssistant ? assistantType : 'You'}
          </div>
          
          {timestamp && (
            <div className="text-xs text-siso-text-muted">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
        
        {isLoading ? (
          <AIThinkingLoader variant="default" showStages={true} />
        ) : (
          <div className="relative group">
            {isAssistant && (
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute right-1 top-1 p-1.5 text-siso-text-muted hover:text-siso-text bg-siso-bg/80 hover:bg-siso-bg rounded-md cursor-pointer"
                onClick={handleCopyContent}
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            )}
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
