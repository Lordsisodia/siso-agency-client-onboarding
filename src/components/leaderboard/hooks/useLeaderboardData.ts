
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LeaderboardUser {
  id: string;
  full_name: string;
  avatar_url: string | null;
  points: number;
  rank: string;
}

export const useLeaderboardData = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('points', { ascending: false })
          .limit(10);

        if (error) {
          throw error;
        }

        setLeaderboardData(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return {
    leaderboardData,
    loading
  };
};
