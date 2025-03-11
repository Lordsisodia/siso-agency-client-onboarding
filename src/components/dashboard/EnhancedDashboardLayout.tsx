
import { motion } from 'framer-motion';
import { QuickActionsPanel } from './QuickActionsPanel';
import { NotificationsPanel } from './NotificationsPanel';
import { UpcomingEvents } from './UpcomingEvents';
import { EnhancedDashboardHeader } from './EnhancedDashboardHeader';
import { ProjectsOverview } from './ProjectsOverview';
import { TasksPreview } from './TasksPreview';
import { DashboardStats } from '@/types/dashboard';
import { Notification, Event } from '@/types/dashboard';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  userName: string;
  greeting: string;
  stats?: DashboardStats;
  notifications: Notification[];
  events: Event[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  userName, 
  greeting,
  stats = {
    activeProjects: 3,
    pendingTasks: 12,
    upcomingEvents: 4,
    loginStreak: 3
  },
  notifications,
  events
}) => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <EnhancedDashboardHeader 
        userName={userName} 
        greeting={greeting}
        stats={stats} 
      />
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content - 2/3 width */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          variants={itemVariants}
        >
          {/* Projects Overview */}
          <ProjectsOverview />
          
          {/* Tasks Preview */}
          <TasksPreview 
            pendingTasks={stats?.pendingTasks || 0}
            onViewAll={() => navigate('/tasks')}
          />
        </motion.div>
        
        {/* Sidebar Content - 1/3 width */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
        >
          {/* Quick Actions Panel */}
          <motion.div variants={itemVariants}>
            <QuickActionsPanel />
          </motion.div>
          
          {/* Notifications Panel */}
          <motion.div variants={itemVariants}>
            <NotificationsPanel 
              notifications={notifications.slice(0, 3)} 
              onViewAll={() => navigate('/notifications')}
            />
          </motion.div>
          
          {/* Upcoming Events */}
          <motion.div variants={itemVariants}>
            <UpcomingEvents 
              events={events.slice(0, 3)} 
              onViewCalendar={() => navigate('/calendar')}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
};
