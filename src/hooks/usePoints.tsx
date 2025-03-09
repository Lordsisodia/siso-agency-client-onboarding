
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { useQuery } from '@tanstack/react-query';
import { showPointsEarnedToast } from '@/components/points/PointsEarnedToast';

// Simplified type for point actions
type PointActionType = 
  | Database['public']['Enums']['point_action_type'] 
  | 'bookmark_article'
  | 'analyze_article';

export const usePoints = (userId: string | undefined) => {
  console.log('[usePoints] Hook called with userId:', userId);
  const { toast } = useToast();

  const { data: pointsData, isLoading, error } = useQuery({
    queryKey: ['points', userId],
    queryFn: async () => {
      console.log('[usePoints] Fetching points data for userId:', userId);
      if (!userId) throw new Error('No user ID provided');
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('points, rank')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('[usePoints] Error fetching points:', error);
        throw error;
      }

      console.log('[usePoints] Points data fetched:', profile);
      return profile;
    },
    enabled: !!userId,
  });

  const points = pointsData?.points || 0;
  const rank = pointsData?.rank || 'Newbie';

  useEffect(() => {
    if (!userId) return;
    console.log('[usePoints] Setting up realtime subscription for points');

    const channel = supabase
      .channel('points-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'points_log',
          filter: `user_id=eq.${userId}`,
        },
        (payload: any) => {
          console.log('[usePoints] Realtime points update received:', payload);
          if (payload.new) {
            showPointsEarnedToast({
              points: payload.new.points_earned,
              action: payload.new.action.replace(/_/g, ' ').toLowerCase(),
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('[usePoints] Cleaning up points subscription');
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const awardPoints = async (action: PointActionType) => {
    console.log('[usePoints] Awarding points for action:', action);
    if (!userId) return;

    try {
      const { data: config, error: configError } = await supabase
        .from('point_configurations')
        .select('points')
        .eq('action', action)
        .single();

      if (configError) throw configError;

      if (config) {
        const { error: logError } = await supabase
          .from('points_log')
          .insert([
            {
              user_id: userId,
              action: action,
              points_earned: config.points
            }
          ]);

        if (logError) throw logError;
      }
    } catch (error: any) {
      console.error('[usePoints] Error awarding points:', error);
      toast({
        variant: "destructive",
        title: "Error awarding points",
        description: error.message,
      });
    }
  };

  return { points, rank, isLoading, awardPoints };
};
