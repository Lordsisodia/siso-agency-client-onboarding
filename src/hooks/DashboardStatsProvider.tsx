
import React, { createContext, useContext } from 'react';
import { useDashboardStats } from './useDashboardStats';
import { DashboardStats } from '@/types/dashboard';

type DashboardStatsContextType = {
  stats: DashboardStats;
  fetchStats: () => void;
  isLoading: boolean;
  error: string | null;
};

const DashboardStatsContext = createContext<DashboardStatsContextType | undefined>(undefined);

export const DashboardStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dashboardStats = useDashboardStats();

  return (
    <DashboardStatsContext.Provider value={dashboardStats}>
      {children}
    </DashboardStatsContext.Provider>
  );
};

export const useDashboardStatsContext = () => {
  const context = useContext(DashboardStatsContext);
  if (context === undefined) {
    throw new Error('useDashboardStatsContext must be used within a DashboardStatsProvider');
  }
  return context;
};
