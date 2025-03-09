
import { motion } from 'framer-motion';
import { DashboardHeader } from './DashboardHeader';
import { QuickStatsPanel } from './QuickStatsPanel';
import { ProjectsOverview } from './ProjectsOverview';
import { DashboardSidebar } from './DashboardSidebar';

interface DashboardLayoutProps {
  userName: string;
  stats: {
    activeProjects: number;
    pendingTasks: number;
    upcomingEvents: number;
  };
}

export const DashboardLayout = ({ userName, stats }: DashboardLayoutProps) => {
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
    <motion.div 
      className="flex-1 p-4 md:p-5 overflow-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <DashboardHeader userName={userName} />
      
      <div className="grid grid-cols-12 gap-4 mt-4">
        {/* Main content area - 9 columns */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          {/* Quick Stats Panel - Full width within main content */}
          <motion.div variants={itemVariants}>
            <QuickStatsPanel
              activeProjects={stats.activeProjects}
              pendingTasks={stats.pendingTasks}
              upcomingEvents={stats.upcomingEvents}
            />
          </motion.div>
          
          {/* Projects Overview - Full width within main content */}
          <motion.div variants={itemVariants}>
            <div className="bg-siso-bg/30 border border-siso-border/30 rounded-xl overflow-hidden">
              <ProjectsOverview />
            </div>
          </motion.div>
        </div>
        
        {/* Right sidebar - 3 columns */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <DashboardSidebar />
        </div>
      </div>
    </motion.div>
  );
};
