
import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Dashboard() {
  const { user, loading } = useAuthSession();
  const { stats, fetchStats } = useDashboardStats();

  useEffect(() => {
    // Fetch stats if user is logged in
    if (user) {
      fetchStats();
    }
  }, [user, fetchStats]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
        <Sidebar />
        <DashboardLayout 
          userName={user?.user_metadata?.full_name || 'User'} 
          stats={stats}
        />
      </div>
    </SidebarProvider>
  );
}
