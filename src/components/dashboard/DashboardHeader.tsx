
import React from 'react';
import { DashboardStats } from './DashboardLayout';

interface DashboardHeaderProps {
  userName: string;
  stats?: DashboardStats;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  stats 
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">
        Welcome back, {userName}!
      </h1>
      
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active Projects" value={stats.activeProjects || 0} />
          <StatCard label="Completed Projects" value={stats.completedProjects || 0} />
          <StatCard label="Pending Tasks" value={stats.pendingTasks || 0} />
          <StatCard label="Upcoming Deadlines" value={stats.upcomingDeadlines || 0} />
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-background/50 p-4 rounded-lg border border-border">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};
