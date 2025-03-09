
import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSubmit, 
  isLoading = false,
  placeholder = "Type a message...",
  className, 
  disabled = false
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex items-center", className)}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 pr-20 bg-siso-bg-alt/30 backdrop-blur-sm border border-siso-border rounded-lg text-siso-text placeholder-siso-text-muted focus:outline-none focus:ring-2 focus:ring-siso-red/50 transition-all"
        disabled={isLoading || disabled}
      />
      
      <motion.div
        className="absolute right-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="submit"
          className="bg-gradient-to-r from-siso-red to-siso-orange text-white rounded-md px-4 py-2 hover:opacity-90 transition-all"
          disabled={isLoading || !input.trim() || disabled}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </motion.div>
      
      {/* Input shimmer effect */}
      {input.trim() && (
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-siso-red to-siso-orange"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </form>
  );
};
