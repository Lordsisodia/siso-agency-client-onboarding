
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
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuthSession();
  const { userData } = useBasicUserData();
  const { stats, fetchStats, isLoading: statsLoading, error } = useDashboardStats();
  const { notifications, handleMarkAsRead, handleViewAll } = useNotifications();
  const { events, handleViewCalendar } = useEvents();
  const location = useLocation();

  useEffect(() => {
    // Fetch stats if user is logged in
    if (user) {
      fetchStats();
      toast.success("Dashboard refreshed", {
        description: "Your latest data has been loaded",
        position: "bottom-right",
        duration: 2000,
      });
    }
    
    // Award points for visiting dashboard
    awardNavigationPoints(location.pathname);
  }, [user, fetchStats, location.pathname]);

  // Display error toast if stats fetching fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to load dashboard data", {
        description: "Please try refreshing the page",
        position: "bottom-right",
      });
    }
  }, [error]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Show loading state while authentication is being checked
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-siso-orange border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-siso-text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <motion.div 
        className="flex min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Sidebar />
        <DashboardLayout 
          userName={getDisplayName()} 
          greeting={getGreeting()}
          stats={stats}
          statsLoading={statsLoading}
          notifications={notifications}
          events={events}
          onNotificationRead={handleMarkAsRead}
          onViewAllNotifications={handleViewAll}
          onViewCalendar={handleViewCalendar}
        />
      </motion.div>
    </SidebarProvider>
  );
}
