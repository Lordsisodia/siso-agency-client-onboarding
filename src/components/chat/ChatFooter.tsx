
import React from 'react';
import { ChatInput } from './ChatInput';
import { WifiOff } from 'lucide-react';

interface ChatFooterProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  inputPlaceholder: string;
  onlineStatus: boolean;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  onSubmit,
  isLoading,
  inputPlaceholder,
  onlineStatus,
}) => {
  return (
    <div className="p-4 border-t border-siso-border bg-gradient-to-r from-black/10 to-transparent backdrop-blur-lg">
      <ChatInput 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        placeholder={inputPlaceholder}
        disabled={!onlineStatus}
      />
      {!onlineStatus && (
        <p className="text-xs text-amber-500 mt-2 flex items-center">
          <WifiOff className="h-3 w-3 mr-1" />
          Waiting for connection to resume...
        </p>
      )}
    </div>
  );
};
