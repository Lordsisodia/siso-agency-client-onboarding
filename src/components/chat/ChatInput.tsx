
import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSubmit, 
  isLoading = false,
  placeholder = "Type a message...",
  className 
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
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
        className="w-full p-4 pr-20 bg-siso-bg-alt border border-siso-border rounded-lg text-siso-text placeholder-siso-text-muted focus:outline-none focus:ring-2 focus:ring-siso-red"
        disabled={isLoading}
      />
      <Button
        type="submit"
        className="absolute right-2 bg-gradient-to-r from-siso-red to-siso-orange text-white rounded-md px-4 py-2 hover:opacity-90 transition-opacity"
        disabled={isLoading || !input.trim()}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
};
