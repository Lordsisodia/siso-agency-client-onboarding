
import { motion } from 'framer-motion';
import { QuickActionsPanel } from './QuickActionsPanel';
import { NotificationsPanel } from './NotificationsPanel';
import { UpcomingEvents } from './UpcomingEvents';
import { useNotifications } from '@/hooks/useNotifications';
import { useEvents } from '@/hooks/useEvents';

export const DashboardSidebar = () => {
  const { notifications, handleMarkAsRead, handleViewAll } = useNotifications();
  const { events, handleViewCalendar } = useEvents();

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
    <>
      {/* Quick Actions Panel */}
      <motion.div variants={itemVariants} className="h-auto">
        <QuickActionsPanel />
      </motion.div>
      
      {/* Notifications Panel */}
      <motion.div variants={itemVariants}>
        <NotificationsPanel 
          notifications={notifications} 
          onMarkAsRead={handleMarkAsRead}
          onViewAll={handleViewAll}
        />
      </motion.div>
      
      {/* Upcoming Events */}
      <motion.div variants={itemVariants}>
        <UpcomingEvents 
          events={events}
          onViewAll={handleViewCalendar}
        />
      </motion.div>
    </>
  );
};
