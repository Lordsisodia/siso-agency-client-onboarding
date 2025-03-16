
import React from 'react';
import { Trash2, Wifi, WifiOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ChatHeaderProps {
  title?: string;
  onlineStatus: boolean;
  isLoading: boolean;
  messagesCount: number;
  onClear: () => void;
  children?: React.ReactNode;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = 'AI Assistant',
  onlineStatus,
  isLoading,
  messagesCount,
  onClear,
  children
}) => {
  return (
    <div className="p-4 border-b border-siso-border bg-gradient-to-r from-siso-red/10 to-siso-orange/10 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center animate-glow">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-siso-text">{title}</h2>
      </div>
      
      <div className="flex items-center gap-2">
        {/* AI feature toggles passed as children */}
        {children}
        
        {onlineStatus ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-amber-500" />
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          disabled={isLoading || messagesCount === 0}
          title="Clear conversation"
          className="text-siso-text-muted hover:text-siso-red transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
