
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
    tasksCompleted: 0,
    upcomingDeadlines: 0,
    resources: 0
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

  useEffect(() => {
    // Fetch dashboard stats
    // This is a mock implementation
    setStats({
      activeProjects: 5,
      tasksCompleted: 12,
      upcomingDeadlines: 3,
      resources: 8
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
      <Sidebar />
      <div className="flex-1 p-8">
        <DashboardHeader userName={user?.user_metadata?.full_name || 'User'} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <QuickStatsPanel stats={stats} />
          </div>
          <div>
            <QuickActionsPanel />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ProjectsOverview />
          </div>
          <div className="space-y-8">
            <NotificationsPanel notifications={notifications} />
            <UpcomingEvents events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}
