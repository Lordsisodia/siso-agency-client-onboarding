
import React from 'react';
import { ProjectPhase } from './ProjectsOverview';

interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  phases: ProjectPhase[];
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Calculate overall progress
  const overallProgress = Math.round(
    project.phases.reduce((acc, phase) => acc + phase.progress, 0) / project.phases.length
  );
  
  // Format deadline
  const formattedDeadline = new Date(project.deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Determine status color
  const getStatusColor = (status: ProjectPhase['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card/50 hover:bg-card/80 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
          {formattedDeadline}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2" 
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-1 mb-4">
        {project.phases.map((phase, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-4 h-4 rounded-full ${getStatusColor(phase.status)} mb-1`} 
            />
            <span className="text-xs text-center leading-tight">{phase.name}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span 
            key={index}
            className="bg-muted px-2 py-1 rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
