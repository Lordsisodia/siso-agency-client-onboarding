
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LeaderboardUser {
  id: string;
  user_id?: string;
  fullName: string;
  email?: string | null;
  points: number;
  rank: string;
  sisoTokens: number;
  avatarUrl?: string | null;
  bio?: string | null;
  updated?: string | null;
  contributionCount?: number;
  referralCount?: number;
  achievements?: any[] | null;
  professional_role?: string | null;
  linkedin_url?: string | null;
  website_url?: string | null;
  youtube_url?: string | null;
  instagram_url?: string | null;
  twitter_url?: string | null;
}

export interface UseLeaderboardResult {
  users: LeaderboardUser[];
  loading: boolean;
  error: Error | null;
  selectedUser: LeaderboardUser | null;
  setSelectedUser: (user: LeaderboardUser | null) => void;
}

export const useLeaderboardData = (): UseLeaderboardResult => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        
        // First try to get data from the leaderboard view if it exists
        let { data: leaderboardData, error: leaderboardError } = await supabase
          .from('leaderboard')
          .select('*')
          .order('points', { ascending: false });

        // If leaderboard view exists and has data
        if (!leaderboardError && leaderboardData && leaderboardData.length > 0) {
          const transformedData: LeaderboardUser[] = leaderboardData.map(user => ({
            id: user.id,
            fullName: user.full_name || 'Anonymous User',
            points: user.points || 0,
            rank: user.rank || 'Bronze',
            sisoTokens: user.siso_tokens || 0,
            avatarUrl: user.avatar_url || null,
            contributionCount: user.contribution_count || 0,
            referralCount: user.referral_count || 0,
            achievements: user.achievements || []
          }));
          
          setUsers(transformedData);
          setLoading(false);
          return;
        }
        
        // Fallback to directly querying profiles table
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('points', { ascending: false });
          
        if (profilesError) {
          throw profilesError;
        }

        if (profilesData) {
          const transformedData: LeaderboardUser[] = profilesData.map(profile => ({
            id: profile.id || '',
            user_id: profile.id || '',
            fullName: profile.full_name || 'Anonymous User',
            points: profile.points || 0,
            rank: profile.rank || 'Bronze',
            sisoTokens: profile.siso_tokens || 0,
            avatarUrl: profile.avatar_url || null,
            bio: profile.bio || null,
            updated: profile.updated_at || null,
            contributionCount: profile.contribution_count || 0,
            referralCount: profile.referral_count || 0,
            achievements: profile.achievements || [],
            professional_role: profile.professional_role || null,
            linkedin_url: profile.linkedin_url || null,
            website_url: profile.website_url || null,
            youtube_url: profile.youtube_url || null,
            instagram_url: profile.instagram_url || null,
            twitter_url: profile.twitter_url || null
          }));
          
          setUsers(transformedData);
        }
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return { users, loading, error, selectedUser, setSelectedUser };
};
