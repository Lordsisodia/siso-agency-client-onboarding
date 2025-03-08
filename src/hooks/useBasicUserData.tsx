
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// [Analysis] Lightweight hook for basic user data needed in shared components
export const useBasicUserData = () => {
  const [userData, setUserData] = useState<{
    id: string | null;
    email: string | null;
    fullName: string | null;
    avatarUrl: string | null;
    points: number | null;
    rank: string | null;
  }>({
    id: null,
    email: null,
    fullName: null,
    avatarUrl: null,
    points: null,
    rank: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    let debounceTimeout: NodeJS.Timeout;

    const fetchBasicUserData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (!session?.user || !isSubscribed) {
          setLoading(false);
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, points, rank')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        if (isSubscribed) {
          setUserData({
            id: session.user.id,
            email: session.user.email,
            fullName: profile?.full_name || null,
            avatarUrl: profile?.avatar_url || null,
            points: profile?.points || 0,
            rank: profile?.rank || 'Bronze',
          });
        }
      } catch (error) {
        console.error('[BasicUserData] Error fetching user data:', error);
        if (isSubscribed) {
          setError(error as Error);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    // Debounce the fetch to prevent rapid successive calls
    debounceTimeout = setTimeout(fetchBasicUserData, 100);

    // Set up real-time subscription for profile changes
    const profileSubscription = supabase
      .channel('public:profiles')
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'profiles',
          filter: `id=eq.${userData.id}` 
        }, 
        (payload) => {
          if (isSubscribed && payload.new) {
            setUserData(current => ({
              ...current,
              fullName: payload.new.full_name || current.fullName,
              avatarUrl: payload.new.avatar_url || current.avatarUrl,
              points: payload.new.points || current.points,
              rank: payload.new.rank || current.rank,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      isSubscribed = false;
      clearTimeout(debounceTimeout);
      supabase.removeChannel(profileSubscription);
    };
  }, [userData.id]);

  return { userData, loading, error };
};
