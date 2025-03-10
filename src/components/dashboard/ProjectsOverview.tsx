
import React from 'react';
import { ProjectCard } from './ProjectCard';

export interface ProjectPhase {
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  phases: ProjectPhase[];
  tags: string[];
}

interface ProjectsOverviewProps {
  projects: Project[];
}

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="text-center py-8 text-muted-foreground">
          <p>No projects to display.</p>
          <p className="mt-2 text-sm">Start a new project to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
