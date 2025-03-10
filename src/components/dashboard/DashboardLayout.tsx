
import { motion } from 'framer-motion';
import { QuickActionsPanel } from './QuickActionsPanel';
import { NotificationsPanel } from './NotificationsPanel';
import { UpcomingEvents } from './UpcomingEvents';
import { DashboardHeader } from './DashboardHeader';
import { ProjectsOverview } from './ProjectsOverview';
import { DashboardSidebar } from './DashboardSidebar';
import { ResourcesOverview } from './ResourcesOverview';
import { useNotifications } from '@/hooks/useNotifications';
import { useEvents } from '@/hooks/useEvents';

// Explicitly define the DashboardStats interface
export interface DashboardStats {
  activeProjects?: number;
  completedProjects?: number;
  pendingTasks?: number;
  upcomingDeadlines?: number;
}

// Define props interface
export interface DashboardLayoutProps {
  userName: string;
  stats?: DashboardStats;
}

export const DashboardLayout = ({ 
  userName, 
  stats = {
    activeProjects: 3,
    completedProjects: 7,
    pendingTasks: 12,
    upcomingDeadlines: 4
  }
}: DashboardLayoutProps) => {
  const { notifications, handleMarkAsRead, handleViewAll } = useNotifications();
  const { events, handleViewCalendar } = useEvents();

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
      <DashboardHeader userName={userName} stats={stats} />
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content - Projects Overview */}
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <ProjectsOverview />
        </motion.div>
        
        {/* Sidebar Content */}
        <motion.div 
          className="space-y-6 lg:col-span-1"
          variants={containerVariants}
        >
          <DashboardSidebar />
          <motion.div variants={itemVariants}>
            <ResourcesOverview />
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
};
