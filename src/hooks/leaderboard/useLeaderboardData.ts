
import { useState, useEffect } from 'react';
import { LeaderboardUser, UseLeaderboardResult } from '@/types/dashboard';

export const useLeaderboardData = (): UseLeaderboardResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    // In a real implementation, this would fetch data from an API
    // For now, we'll just set some mock data
    const mockData: LeaderboardUser[] = [
      {
        id: '1',
        user_id: '1',
        full_name: 'John Doe',
        points: 1200,
        rank: 'Gold',
        siso_tokens: 50,
        avatar_url: null,
        updated_at: new Date().toISOString(),
        contribution_count: 25,
        referral_count: 5,
        achievements: [],
        discord_url: '',
        github_url: '',
        linkedin_url: '',
        twitter_url: ''
      }
    ];

    setLeaderboardData(mockData);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    leaderboardData
  };
};
