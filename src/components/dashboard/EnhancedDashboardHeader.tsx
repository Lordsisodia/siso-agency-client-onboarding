
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  userName: string;
  greeting: string;
  stats?: DashboardStats;
}

export const EnhancedDashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  greeting,
  stats 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {greeting}, {userName}!
        </motion.h1>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/notifications')}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
            >
              3
            </Badge>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/preferences')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            label="Active Projects" 
            value={stats.activeProjects || 0}
            onClick={() => navigate('/projects')}
          />
          <StatCard 
            label="Pending Tasks" 
            value={stats.pendingTasks || 0} 
            onClick={() => navigate('/tasks')}
          />
          <StatCard 
            label="Upcoming Events" 
            value={stats.upcomingEvents || 0} 
            onClick={() => navigate('/calendar')}
          />
          <StatCard 
            label="Login Streak" 
            value={stats.loginStreak || 0} 
            badgeText={stats.loginStreak && stats.loginStreak > 5 ? "Impressive!" : undefined}
          />
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={() => navigate('/new-project')}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          Start New Project
        </Button>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  badgeText?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, badgeText, onClick }) => {
  return (
    <motion.div 
      className={`bg-gradient-to-br from-background/80 to-background/40 p-4 rounded-lg border border-border 
                  hover:shadow-md hover:border-primary/20 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground flex justify-between items-center">
        <span>{label}</span>
        {badgeText && (
          <Badge variant="secondary" className="text-xs py-0 px-1.5">
            {badgeText}
          </Badge>
        )}
      </div>
    </motion.div>
  );
};
