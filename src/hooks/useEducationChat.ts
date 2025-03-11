
import { useState } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useEducationChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    // Stub implementation
    console.log('Message would be sent:', message);
    return true;
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};
