
import { useState, useEffect } from 'react';
import { Video, UseVideosResult } from '@/types/video';

export const useVideos = (): UseVideosResult => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // This is just a placeholder implementation since the actual service isn't needed
    setLoading(false);
  }, []);

  return { videos, loading, error };
};

export default useVideos;
