
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Educator = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  specialization?: string[];
  channel_avatar_url?: string;
  number_of_subscribers?: number;
  sync_status?: string;
  videos_count?: number;
};

export function useEducatorsList() {
  const [educators, setEducators] = useState<Educator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEducators() {
      try {
        setLoading(true);
        
        // Get educators with video count using a join
        const { data, error } = await supabase
          .from('education_creators')
          .select('*');
        
        if (error) {
          throw error;
        }

        // Get video counts
        const educatorsWithVideoCounts = await Promise.all(
          data.map(async (educator) => {
            const { count, error: countError } = await supabase
              .from('youtube_videos')
              .select('*', { count: 'exact', head: true })
              .eq('channel_id', educator.channel_id);
            
            if (countError) {
              console.error('Error getting video count:', countError);
              return { ...educator, videos_count: 0 };
            }
            
            return { ...educator, videos_count: count || 0 };
          })
        );

        setEducators(educatorsWithVideoCounts);
      } catch (err) {
        console.error('Error fetching educators:', err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching educators'));
      } finally {
        setLoading(false);
      }
    }

    fetchEducators();
  }, []);

  return { educators, loading, error };
}
