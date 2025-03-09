
import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { QuickStatsPanel } from '@/components/dashboard/QuickStatsPanel';
import { ProjectsOverview } from '@/components/dashboard/ProjectsOverview';
import { QuickActionsPanel } from '@/components/dashboard/QuickActionsPanel';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define correct types for notifications and events
export type NotificationType = 'alert' | 'success' | 'warning' | 'info';
export type EventType = 'deadline' | 'meeting' | 'reminder';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: EventType;
}

export default function Dashboard() {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeProjects: 0,
    pendingTasks: 0,
    upcomingEvents: 0
  });

  // Demo data for notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from Alex Smith',
      time: '5 min ago',
      type: 'info',
      read: false
    },
    {
      id: '2',
      title: 'Project Update',
      message: 'Your project "Website Redesign" has been updated',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: '3',
      title: 'Deadline Approaching',
      message: 'Project "Marketing Plan" deadline is tomorrow',
      time: '1 day ago',
      type: 'warning',
      read: true
    }
  ];

  // Demo data for events
  const events: Event[] = [
    {
      id: '1',
      title: 'Client Meeting',
      date: 'Today',
      time: '2:00 PM',
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: 'Tomorrow',
      time: '11:59 PM',
      type: 'deadline'
    },
    {
      id: '3',
      title: 'Team Standup',
      date: 'Wed, Sep 28',
      time: '10:00 AM',
      type: 'meeting'
    }
  ];
  
  // Mock implementation of mark as read
  const handleMarkAsRead = (id: string) => {
    console.log(`Marked notification ${id} as read`);
  };
  
  // Mock implementation of view all
  const handleViewAll = () => {
    navigate('/notifications');
  };
  
  // Mock implementation of view calendar
  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  useEffect(() => {
    // Fetch dashboard stats
    // This is a mock implementation
    setStats({
      activeProjects: 5,
      pendingTasks: 12,
      upcomingEvents: 3
    });
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
      <Sidebar />
      <motion.div 
        className="flex-1 p-5 md:p-8 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <DashboardHeader userName={user?.user_metadata?.full_name || 'User'} />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6"
          variants={itemVariants}
        >
          <div className="md:col-span-2">
            <QuickStatsPanel
              activeProjects={stats.activeProjects}
              pendingTasks={stats.pendingTasks}
              upcomingEvents={stats.upcomingEvents}
            />
          </div>
          <div>
            <QuickActionsPanel />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <ProjectsOverview />
          </motion.div>
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <NotificationsPanel 
              notifications={notifications} 
              onMarkAsRead={handleMarkAsRead}
              onViewAll={handleViewAll}
            />
            <UpcomingEvents 
              events={events}
              onViewAll={handleViewCalendar}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
