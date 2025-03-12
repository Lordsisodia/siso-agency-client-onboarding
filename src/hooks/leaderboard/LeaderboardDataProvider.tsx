
import React, { createContext, useContext, useState } from 'react';

type LeaderboardEntry = {
  id: string;
  userName: string;
  rank: number;
  points: number;
  projects: number;
  avatar?: string;
};

type LeaderboardContextType = {
  leaderboardData: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  fetchLeaderboardData: () => void;
};

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const LeaderboardDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([
    { id: '1', userName: 'User 1', rank: 1, points: 1000, projects: 10 },
    { id: '2', userName: 'User 2', rank: 2, points: 800, projects: 8 },
    { id: '3', userName: 'User 3', rank: 3, points: 700, projects: 7 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboardData = () => {
    // Mock implementation to fetch leaderboard data
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLeaderboardData([
        { id: '1', userName: 'User 1', rank: 1, points: 1000, projects: 10 },
        { id: '2', userName: 'User 2', rank: 2, points: 800, projects: 8 },
        { id: '3', userName: 'User 3', rank: 3, points: 700, projects: 7 },
        { id: '4', userName: 'User 4', rank: 4, points: 600, projects: 6 },
        { id: '5', userName: 'User 5', rank: 5, points: 500, projects: 5 },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboardData, isLoading, error, fetchLeaderboardData }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboardData = () => {
  const context = useContext(LeaderboardContext);
  if (context === undefined) {
    throw new Error('useLeaderboardData must be used within a LeaderboardDataProvider');
  }
  return context;
};
