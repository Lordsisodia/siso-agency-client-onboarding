
import { useState } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface VideoTopic {
  title: string;
  content: string;
}

export const useEducationChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState<VideoTopic[]>([]);

  const sendMessage = async (message: string) => {
    // Stub implementation
    console.log('Message would be sent:', message);
    return true;
  };

  // Updated to support the VideoAnalysis component
  const getVideoAnalysis = (videoId: string) => {
    console.log('Getting analysis for video:', videoId);
    return {
      topics: [] as string[],
      loading: false
    };
  };

  return {
    messages,
    isLoading,
    topics,
    sendMessage,
    getVideoAnalysis
  };
};
