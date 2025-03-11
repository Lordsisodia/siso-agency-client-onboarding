
import React from 'react';
import { DashboardStats, Notification, Event } from '@/types/dashboard';
import { EnhancedDashboardHeader } from './EnhancedDashboardHeader';
import { NotificationsPanel } from './NotificationsPanel';
import { UpcomingEvents } from './UpcomingEvents';
import { ProjectsOverview } from './ProjectsOverview';
import { TasksPreview } from './TasksPreview';
import { EnhancedQuickStatsPanel } from './EnhancedQuickStatsPanel';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  userName: string;
  greeting: string;
  stats?: DashboardStats;
  statsLoading?: boolean;
  notifications?: Notification[];
  events?: Event[];
  onNotificationRead?: (id: string) => void;
  onViewAllNotifications?: () => void;
  onViewCalendar?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  userName, 
  greeting, 
  stats,
  statsLoading = false,
  notifications = [],
  events = [],
  onNotificationRead,
  onViewAllNotifications,
  onViewCalendar
}) => {
  const navigate = useNavigate();

  const handleStatClick = (statType: string) => {
    switch (statType) {
      case 'projects':
        navigate('/projects');
        break;
      case 'tasks':
        navigate('/tasks');
        break;
      case 'events':
        navigate('/calendar');
        break;
      case 'streak':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  const handleViewAllTasks = () => {
    navigate('/tasks');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.main 
      className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#0A0A0A]/90 to-[#121212]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div variants={itemVariants}>
          <EnhancedDashboardHeader 
            userName={userName} 
            greeting={greeting} 
            stats={stats}
          />
        </motion.div>
        
        {stats && (
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium">Quick Stats</h2>
                <Sparkles className="h-4 w-4 text-siso-orange/70" />
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-siso-text-muted hover:text-white flex items-center gap-1"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-3 w-3" />
                Refresh
              </Button>
            </div>
            <EnhancedQuickStatsPanel 
              stats={stats}
              loading={statsLoading}
              onClick={handleStatClick}
            />
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div variants={itemVariants} className="md:col-span-8">
            <ProjectsOverview />
            <div className="mt-6">
              <TasksPreview 
                pendingTasks={stats?.pendingTasks || 0} 
                onViewAll={handleViewAllTasks} 
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
            {notifications && (
              <NotificationsPanel 
                notifications={notifications} 
                onViewAll={onViewAllNotifications}
                onMarkAsRead={onNotificationRead}
                loading={statsLoading}
              />
            )}
            
            {events && (
              <UpcomingEvents 
                events={events} 
                onViewCalendar={onViewCalendar}
                loading={statsLoading}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};
