
import { useState } from 'react';

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  date: string;
  url: string;
  viewCount: number;
  creator?: {
    id: string;
    name: string;
    profileImageUrl: string;
  };
}

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // This is a stub implementation since we're not using video features
  // Normally this would fetch videos from the API

  return {
    videos,
    loading,
    error
  };
};
