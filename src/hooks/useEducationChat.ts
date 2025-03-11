
import { useState } from 'react';

export const useEducationChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      // This is a stub implementation
      console.log('Message sent:', message);
      
      // Simulate response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: 'user', content: message },
          { role: 'assistant', content: 'This is a placeholder response.' }
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};
