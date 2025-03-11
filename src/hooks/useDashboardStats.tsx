
import { useState, useCallback, useEffect } from 'react';
import { DashboardStats } from '@/types/dashboard';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    pendingTasks: 0,
    upcomingEvents: 0,
    loginStreak: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate network request
    setTimeout(() => {
      try {
        // Simulate some randomness in the data
        setStats({
          activeProjects: Math.floor(Math.random() * 3) + 4, // 4-6
          pendingTasks: Math.floor(Math.random() * 5) + 10, // 10-14
          upcomingEvents: Math.floor(Math.random() * 3) + 2, // 2-4
          loginStreak: Math.floor(Math.random() * 3) + 6 // 6-8
        });
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard stats');
        setIsLoading(false);
      }
    }, 800);
  }, []);

  // Auto-refresh stats every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchStats();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [fetchStats]);

  return { stats, fetchStats, isLoading, error };
}
