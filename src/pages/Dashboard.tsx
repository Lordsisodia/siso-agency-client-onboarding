
import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardLayout } from '@/components/dashboard/EnhancedDashboardLayout';
import { useNotifications } from '@/hooks/useNotifications';
import { useEvents } from '@/hooks/useEvents';
import { awardNavigationPoints } from '@/utils/navigationPoints';
import { useLocation } from 'react-router-dom';
import { useBasicUserData } from '@/hooks/useBasicUserData';

export default function Dashboard() {
  const { user, loading } = useAuthSession();
  const { userData } = useBasicUserData();
  const { stats, fetchStats } = useDashboardStats();
  const { notifications } = useNotifications();
  const { events } = useEvents();
  const location = useLocation();

  useEffect(() => {
    // Fetch stats if user is logged in
    if (user) {
      fetchStats();
    }
    
    // Award points for visiting dashboard
    awardNavigationPoints(location.pathname);
  }, [user, fetchStats, location.pathname]);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get display name from user data
  const getDisplayName = () => {
    if (userData?.fullName) return userData.fullName;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    return 'Friend';
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
        <Sidebar />
        <DashboardLayout 
          userName={getDisplayName()} 
          greeting={getGreeting()}
          stats={stats}
          notifications={notifications}
          events={events}
        />
      </div>
    </SidebarProvider>
  );
}
