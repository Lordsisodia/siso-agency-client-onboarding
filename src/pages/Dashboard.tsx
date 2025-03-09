
import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useNavigate } from 'react-router-dom';
import { useDashboardStats } from '@/hooks/useDashboardStats';

export default function Dashboard() {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();
  const { stats, fetchStats } = useDashboardStats();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
      <Sidebar />
      <DashboardLayout 
        userName={user?.user_metadata?.full_name || 'User'} 
        stats={stats}
      />
    </div>
  );
}
