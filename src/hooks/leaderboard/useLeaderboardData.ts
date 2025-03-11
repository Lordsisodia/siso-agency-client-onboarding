
import { useState, useEffect } from 'react';
import { LeaderboardUser, UseLeaderboardResult } from '@/types/dashboard';

export const useLeaderboardData = (): UseLeaderboardResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);

  useEffect(() => {
    // In a real implementation, this would fetch data from an API
    // For now, we'll just set some mock data
    const mockData: LeaderboardUser[] = [
      {
        id: '1',
        user_id: '1',
        fullName: 'John Doe',
        points: 1200,
        rank: 'Gold',
        sisoTokens: 50,
        avatarUrl: null,
        updated: new Date().toISOString(),
        contributionCount: 25,
        referralCount: 5,
        achievements: [],
        profile: {
          full_name: 'John Doe',
          avatar_url: null
        },
        discord_url: '',
        github_url: '',
        linkedin_url: '',
        twitter_url: ''
      }
    ];

    setUsers(mockData);
    setFilteredData(mockData);
    setLoading(false);
  }, []);

  // Calculate totals for display
  const totalUsersWithPoints = filteredData.length;
  const totalPoints = filteredData.reduce((sum, user) => sum + user.points, 0);
  const totalSisoTokens = filteredData.reduce((sum, user) => sum + user.sisoTokens, 0);

  return {
    loading,
    error,
    users,
    leaderboardData: users,
    filteredData,
    setFilteredData,
    totalUsersWithPoints,
    totalPoints,
    totalSisoTokens,
    selectedUser,
    setSelectedUser
  };
};
