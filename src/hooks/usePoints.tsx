
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePoints = (userId: string) => {
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('Bronze');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no userId, don't fetch anything
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPoints = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('points, rank')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching points:', error);
          return;
        }

        setPoints(data.points || 0);
        setRank(data.rank || 'Bronze');
      } catch (error) {
        console.error('Error in points fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();

    // Setup subscription for real-time updates
    const pointsSubscription = supabase
      .channel('points-changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`,
      }, 
      (payload) => {
        if (payload.new.points !== undefined) {
          setPoints(payload.new.points || 0);
        }
        if (payload.new.rank !== undefined) {
          setRank(payload.new.rank || 'Bronze');
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(pointsSubscription);
    };
  }, [userId]);

  return { points, rank, loading };
};
