
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { QuickStatsPanel } from '@/components/dashboard/QuickStatsPanel';
import { ProjectsOverview } from '@/components/dashboard/ProjectsOverview';
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel';
import { QuickActionsPanel } from '@/components/dashboard/QuickActionsPanel';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { toast } from '@/hooks/use-toast';

// Sample data for the notifications panel
const mockNotifications = [
  {
    id: '1',
    title: 'Project Updated',
    message: 'Mobile App Redesign project status changed to In Progress',
    time: '2h ago',
    type: 'info',
    read: false
  },
  {
    id: '2',
    title: 'New Comment',
    message: 'John Doe commented on Website Development project',
    time: '5h ago',
    type: 'info',
    read: false
  },
  {
    id: '3',
    title: 'Deadline Approaching',
    message: 'E-commerce Platform project deadline in 3 days',
    time: '1d ago',
    type: 'warning',
    read: true
  },
  {
    id: '4',
    title: 'Project Completed',
    message: 'Brand Identity Design project marked as completed',
    time: '2d ago',
    type: 'success',
    read: true
  }
];

// Sample data for upcoming events
const mockEvents = [
  {
    id: '1',
    title: 'Client Meeting - ABC Corp',
    date: '2023-11-28',
    time: '10:00 AM - 11:00 AM',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'E-commerce Platform Deadline',
    date: '2023-11-30',
    time: 'End of day',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'Submit Website Design',
    date: '2023-12-05',
    time: '12:00 PM',
    type: 'reminder'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [events] = useState(mockEvents);

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast({
      title: "Notification marked as read",
      duration: 3000,
    });
  };

  const handleViewAllNotifications = () => {
    navigate('/notifications');
  };

  const handleViewCalendar = () => {
    // This would navigate to a calendar page if you have one
    toast({
      title: "Calendar feature coming soon!",
      description: "This feature is under development.",
      duration: 3000,
    });
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.1)"
            waveSpeedX={0.01}
            waveSpeedY={0.005}
            waveAmpX={30}
            waveAmpY={15}
            friction={0.95}
            tension={0.01}
            maxCursorMove={80}
            xGap={14}
            yGap={40}
          />
        </div>
        
        <div className="relative z-10 container px-4 py-8 mx-auto">
          {/* Header Section */}
          <DashboardHeader />
          
          {/* Quick Stats Panel */}
          <QuickStatsPanel 
            activeProjects={4} 
            pendingTasks={7} 
            upcomingEvents={3} 
          />
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects Overview (Takes 2/3 of the width on large screens) */}
            <div className="lg:col-span-2">
              <ProjectsOverview />
            </div>
            
            {/* Sidebar (Takes 1/3 of the width on large screens) */}
            <div className="space-y-6">
              {/* Notifications Panel */}
              <NotificationsPanel 
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onViewAll={handleViewAllNotifications}
              />
              
              {/* Quick Actions Panel */}
              <QuickActionsPanel />
              
              {/* Upcoming Events */}
              <UpcomingEvents 
                events={events}
                onViewAll={handleViewCalendar}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
