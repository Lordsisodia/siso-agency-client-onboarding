
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BasicUserData {
  id?: string;
  fullName?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  points?: number;
  rank?: string;
}

export const useBasicUserData = () => {
  const [userData, setUserData] = useState<BasicUserData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setLoading(false);
          return;
        }
        
        // Get basic user data
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, points, rank')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching basic user data:', error);
          setLoading(false);
          return;
        }
        
        setUserData({
          id: profile.id,
          fullName: profile.full_name,
          email: session.user.email,
          avatarUrl: profile.avatar_url,
          points: profile.points || 0,
          rank: profile.rank || 'Bronze'
        });
        
      } catch (error) {
        console.error('Error in useBasicUserData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
    
    // Set up real-time subscription for profile changes
    const profileSubscription = supabase
      .channel('basic-profile-changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
      }, 
      async (payload) => {
        // If this is our user's profile that changed
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && payload.new.id === session.user.id) {
          setUserData(prevData => ({
            ...prevData,
            fullName: payload.new.full_name,
            avatarUrl: payload.new.avatar_url,
            points: payload.new.points || 0,
            rank: payload.new.rank || 'Bronze'
          }));
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(profileSubscription);
    };
  }, []);
  
  return { userData, loading };
};
