
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CalendarClock, 
  User, 
  BarChart, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { Phase } from './ProjectsOverview';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric' 
  });
};

export interface ProjectCardProps {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  deadline: string;
  client: string;
  description: string;
  team: Array<{ id: string; name: string; avatar: string }>;
  phases: Phase[];
  tasks: { total: number; completed: number };
  priority: 'low' | 'medium' | 'high';
  isFullWidth?: boolean;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  status,
  progress,
  deadline,
  client,
  description,
  team,
  phases,
  tasks,
  priority,
  isFullWidth = false,
  onViewDetails,
  onEdit,
}) => {
  // Status styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-500';
      case 'in-progress': return 'bg-blue-500/10 text-blue-500';
      case 'pending': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  // Priority styling
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'low': return 'bg-green-500/10 text-green-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  // For phases status icons
  const getPhaseIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />;
      case 'in-progress': return <Clock className="h-3.5 w-3.5 text-blue-500" />;
      case 'pending': return <AlertCircle className="h-3.5 w-3.5 text-gray-400" />;
      default: return <AlertCircle className="h-3.5 w-3.5 text-gray-400" />;
    }
  };
  
  // Format status text
  const formatStatus = (status: string) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  return (
    <Card className={`border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm overflow-hidden ${isFullWidth ? 'w-full' : 'w-80'}`}>
      <CardContent className="p-0">
        {/* Progress bar at top */}
        <div className="w-full h-1 bg-siso-bg-alt">
          <div 
            className="h-full bg-gradient-to-r from-siso-primary to-siso-primary-light"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="p-4">
          {/* Header with status and priority */}
          <div className="flex justify-between items-start mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {formatStatus(status)}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>
          </div>
          
          {/* Project title */}
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          
          {/* Description - shorter for smaller cards */}
          {isFullWidth ? (
            <p className="text-sm text-siso-text-muted mb-4">{description}</p>
          ) : (
            <p className="text-sm text-siso-text-muted mb-4 line-clamp-2">{description}</p>
          )}
          
          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-siso-text-muted">
              <CalendarClock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Due: {formatDate(deadline)}</span>
            </div>
            <div className="flex items-center text-sm text-siso-text-muted">
              <User className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Client: {client}</span>
            </div>
            <div className="flex items-center text-sm text-siso-text-muted">
              <BarChart className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Tasks: {tasks.completed}/{tasks.total} completed</span>
            </div>
          </div>
          
          {/* Project phases */}
          {isFullWidth && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Project Phases</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {phases.map((phase, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md bg-siso-bg-alt/50 border border-siso-border/20"
                  >
                    <div className="flex items-center">
                      {getPhaseIcon(phase.status)}
                      <span className="text-xs ml-1.5">{phase.name}</span>
                    </div>
                    <span className="text-xs font-medium">{phase.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Team members */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Team</h4>
            <div className="flex items-center">
              {team.map((member) => (
                <div 
                  key={member.id}
                  className="flex items-center mr-3"
                >
                  <div className="h-6 w-6 rounded-full bg-siso-bg-alt overflow-hidden mr-1.5">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-xs">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onEdit(id)}
            >
              Edit Project
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onViewDetails(id)}
            >
              View Details
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
