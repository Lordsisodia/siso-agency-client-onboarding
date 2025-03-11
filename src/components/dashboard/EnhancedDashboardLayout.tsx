
import React from 'react';
import { DashboardStats, Notification, Event } from '@/types/dashboard';
import { EnhancedDashboardHeader } from './EnhancedDashboardHeader';
import { NotificationsPanel } from './NotificationsPanel';
import { UpcomingEvents } from './UpcomingEvents';
import { ProjectsOverview } from './ProjectsOverview';
import { TasksPreview } from './TasksPreview';
import { EnhancedQuickStatsPanel } from './EnhancedQuickStatsPanel';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  userName: string;
  greeting: string;
  stats?: DashboardStats;
  notifications?: Notification[];
  events?: Event[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  userName, 
  greeting, 
  stats,
  notifications = [],
  events = []
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

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <EnhancedDashboardHeader 
          userName={userName} 
          greeting={greeting} 
          stats={stats}
        />
        
        {stats && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Quick Stats</h2>
            <EnhancedQuickStatsPanel 
              stats={stats} 
              onClick={handleStatClick}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <ProjectsOverview />
            <div className="mt-6">
              <TasksPreview />
            </div>
          </div>
          
          <div className="md:col-span-4 space-y-6">
            {notifications && notifications.length > 0 && (
              <NotificationsPanel notifications={notifications} />
            )}
            
            {events && events.length > 0 && (
              <UpcomingEvents events={events} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
