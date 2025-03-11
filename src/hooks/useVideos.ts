
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  thumbnailUrl: string;
  date: string | null;
  education_creators?: any[];
  viewCount?: number;
}

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('youtube_videos')
          .select('*');

        if (error) {
          throw error;
        }

        // Transform to proper Video objects
        const formattedVideos: Video[] = (data || []).map((video: any) => ({
          id: video.id || '',
          title: video.title || '',
          url: video.url || '',
          duration: video.duration || '',
          thumbnailUrl: video.thumbnail_url || '',
          date: video.date || null,
          education_creators: video.education_creators || [],
          viewCount: video.viewcount || 0
        }));

        setVideos(formattedVideos);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};
