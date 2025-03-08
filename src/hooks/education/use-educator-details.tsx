
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Educator } from './use-educators-list';

export function useEducatorDetails(slug: string) {
  const [educator, setEducator] = useState<Educator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEducatorDetails() {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // Fetch educator details
        const { data, error } = await supabase
          .from('education_creators')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error('Educator not found');
        }

        // Get video count
        const { count, error: countError } = await supabase
          .from('youtube_videos')
          .select('*', { count: 'exact', head: true })
          .eq('channel_id', data.channel_id);
        
        if (countError) {
          console.error('Error getting video count:', countError);
        }

        setEducator({ ...data, videos_count: count || 0 });
      } catch (err) {
        console.error('Error fetching educator details:', err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching educator details'));
      } finally {
        setLoading(false);
      }
    }

    fetchEducatorDetails();
  }, [slug]);

  return { educator, loading, error };
}
