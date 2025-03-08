
import { useQuery } from '@tanstack/react-query';

// Placeholder implementation to maintain compatibility
export const useVideoDetail = (videoId: string) => {
  return useQuery({
    queryKey: ['video', videoId],
    queryFn: async () => {
      console.log('Video detail functionality is currently disabled');
      return null;
    },
    enabled: false
  });
};
