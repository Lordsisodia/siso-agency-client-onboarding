
import { useState, useCallback } from 'react';
import { DashboardStats } from '@/types/dashboard';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    pendingTasks: 0,
    upcomingEvents: 0,
    loginStreak: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(() => {
    // This is a mock implementation
    // In a real application, you would fetch this data from your API
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setStats({
        activeProjects: 5,
        pendingTasks: 12,
        upcomingEvents: 3,
        loginStreak: 7
      });
      setIsLoading(false);
    }, 500);
  }, []);

  return { stats, fetchStats, isLoading };
}
