
import { useState, useCallback } from 'react';
import { DashboardStats } from '@/types/dashboard';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    pendingTasks: 0,
    upcomingEvents: 0
  });

  const fetchStats = useCallback(() => {
    // This is a mock implementation
    setStats({
      activeProjects: 5,
      pendingTasks: 12,
      upcomingEvents: 3
    });
  }, []);

  return { stats, fetchStats };
}
