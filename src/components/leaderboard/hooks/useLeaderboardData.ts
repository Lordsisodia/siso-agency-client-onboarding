
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LeaderboardUser, UseLeaderboardResult } from '@/types/dashboard';

export const useLeaderboardData = (): UseLeaderboardResult => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);
  const [filteredData, setFilteredData] = useState<LeaderboardUser[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [totalUsersWithPoints, setTotalUsersWithPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalSisoTokens, setTotalSisoTokens] = useState(0);

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
            user_id: user.id,
            fullName: user.full_name || 'Anonymous User',
            points: user.points || 0,
            rank: user.rank || 'Bronze',
            sisoTokens: user.siso_tokens || 0,
            avatarUrl: user.avatar_url || null,
            bio: user.bio || '',
            updated: user.updated_at || '',
            contributionCount: user.contribution_count || 0,
            referralCount: user.referral_count || 0,
            achievements: user.achievements || [],
            discord_url: user.discord_url || '',
            github_url: user.github_url || '',
            linkedin_url: user.linkedin_url || '',
            twitter_url: user.twitter_url || ''
          }));
          
          setUsers(transformedData);
          setLeaderboardData(transformedData);
          setFilteredData(transformedData);
          
          // Calculate totals
          setTotalUsersWithPoints(transformedData.filter(user => user.points > 0).length);
          setTotalPoints(transformedData.reduce((acc, user) => acc + user.points, 0));
          setTotalSisoTokens(transformedData.reduce((acc, user) => acc + (user.sisoTokens || 0), 0));
          
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
            bio: profile.bio || '',
            updated: profile.updated_at || '',
            contributionCount: profile.contribution_count || 0,
            referralCount: profile.referral_count || 0,
            achievements: profile.achievements || [],
            discord_url: profile.discord_url || '',
            github_url: profile.github_url || '',
            linkedin_url: profile.linkedin_url || '',
            twitter_url: profile.twitter_url || ''
          }));
          
          setUsers(transformedData);
          setLeaderboardData(transformedData);
          setFilteredData(transformedData);
          
          // Calculate totals
          setTotalUsersWithPoints(transformedData.filter(user => user.points > 0).length);
          setTotalPoints(transformedData.reduce((acc, user) => acc + user.points, 0));
          setTotalSisoTokens(transformedData.reduce((acc, user) => acc + (user.sisoTokens || 0), 0));
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

  return { 
    users, 
    loading, 
    error, 
    selectedUser, 
    setSelectedUser, 
    leaderboardData,
    filteredData,
    setFilteredData,
    totalUsersWithPoints,
    totalPoints,
    totalSisoTokens
  };
};

export default useLeaderboardData;
