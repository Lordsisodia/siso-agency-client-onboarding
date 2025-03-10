
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Star, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProjectPhase } from './DashboardLayout';

interface ProjectCardProps {
  name: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  progress: number;
  phases: ProjectPhase[];
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  dueDate,
  priority,
  progress,
  phases
}) => {
  return (
    <Card className="border-border/40 hover:border-border/80 transition-all duration-200 shadow-sm hover:shadow">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <Badge className={priorityColors[priority]}>
          {priority === 'high' && <AlertCircle className="w-3 h-3 mr-1" />}
          {priority === 'medium' && <Star className="w-3 h-3 mr-1" />}
          {priority === 'low' && <CheckCircle className="w-3 h-3 mr-1" />}
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            Due: {dueDate}
          </div>
          <span className="text-sm font-medium">{progress}% Complete</span>
        </div>
        
        <Progress value={progress} className="h-2 mb-4" />
        
        <div className="space-y-2 mb-4">
          {phases.map((phase, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-xs">{phase.name}</span>
              <div className="flex items-center">
                <span className="text-xs mr-2">
                  {phase.status === 'completed' ? 'Completed' : 
                   phase.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </span>
                <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${phase.status === 'completed' ? 'bg-green-500' : 
                                      phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="w-full">
          View Details <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
