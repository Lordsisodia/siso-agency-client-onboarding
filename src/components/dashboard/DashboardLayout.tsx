
import { motion } from 'framer-motion';
import { QuickActionsPanel } from './QuickActionsPanel';
import { NotificationsPanel } from './NotificationsPanel';
import { UpcomingEvents } from './UpcomingEvents';
import { DashboardHeader } from './DashboardHeader';
import { ProjectsOverview, Project } from './ProjectsOverview';
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
interface DashboardLayoutProps {
  userName: string;
  stats?: DashboardStats;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  userName, 
  stats = {
    activeProjects: 3,
    completedProjects: 7,
    pendingTasks: 12,
    upcomingDeadlines: 4
  }
}) => {
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

  // Sample projects data
  const sampleProjects: Project[] = [
    {
      id: "1",
      title: "Website Redesign",
      description: "Modernizing the company website with new UI/UX",
      deadline: "2023-12-31",
      phases: [
        { name: "Research", status: "completed", progress: 100 },
        { name: "Design", status: "in-progress", progress: 70 },
        { name: "Development", status: "pending", progress: 0 }
      ],
      tags: ["Design", "Frontend"]
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Creating a native mobile app for both iOS and Android",
      deadline: "2024-03-15",
      phases: [
        { name: "Planning", status: "completed", progress: 100 },
        { name: "UI Design", status: "in-progress", progress: 85 },
        { name: "Backend API", status: "in-progress", progress: 45 },
        { name: "Frontend Development", status: "pending", progress: 0 }
      ],
      tags: ["Mobile", "Backend", "API"]
    },
    {
      id: "3",
      title: "Data Analytics Dashboard",
      description: "Building an interactive analytics dashboard",
      deadline: "2024-01-30",
      phases: [
        { name: "Requirements", status: "completed", progress: 100 },
        { name: "Data Modeling", status: "completed", progress: 100 },
        { name: "Dashboard Design", status: "in-progress", progress: 60 },
        { name: "Implementation", status: "pending", progress: 10 }
      ],
      tags: ["Analytics", "Dashboard", "Visualization"]
    }
  ];

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
          <ProjectsOverview projects={sampleProjects} />
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
