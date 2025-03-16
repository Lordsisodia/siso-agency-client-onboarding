
import React from 'react';
import { ChatInput } from './ChatInput';
import { WifiOff, Globe, Brain } from 'lucide-react';

interface ChatFooterProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  inputPlaceholder: string;
  onlineStatus: boolean;
  useWebSearch?: boolean;
  useReasoning?: boolean;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  onSubmit,
  isLoading,
  inputPlaceholder,
  onlineStatus,
  useWebSearch,
  useReasoning,
}) => {
  return (
    <div className="p-4 border-t border-siso-border bg-gradient-to-r from-black/10 to-transparent backdrop-blur-lg">
      <ChatInput 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        placeholder={inputPlaceholder}
        disabled={!onlineStatus}
      />

      {/* AI features indicators */}
      {(useWebSearch || useReasoning) && (
        <div className="flex mt-2 gap-4 text-xs">
          {useWebSearch && (
            <div className="flex items-center text-blue-400">
              <Globe className="h-3 w-3 mr-1" />
              <span>Web search enabled</span>
            </div>
          )}
          {useReasoning && (
            <div className="flex items-center text-purple-400">
              <Brain className="h-3 w-3 mr-1" />
              <span>Advanced reasoning enabled</span>
            </div>
          )}
        </div>
      )}
      
      {!onlineStatus && (
        <p className="text-xs text-amber-500 mt-2 flex items-center">
          <WifiOff className="h-3 w-3 mr-1" />
          Waiting for connection to resume...
        </p>
      )}
    </div>
  );
};
