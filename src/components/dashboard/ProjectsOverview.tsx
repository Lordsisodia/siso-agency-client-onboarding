
import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

// Create a ProjectPhase type to be used by ProjectCard
export interface ProjectPhase {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
}

// Sample project data
const projects = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Redesigning the company website with a new modern look.',
    deadline: '2023-12-15',
    phases: [
      { name: 'Planning', status: 'completed' as const, progress: 100 },
      { name: 'Design', status: 'completed' as const, progress: 100 },
      { name: 'Development', status: 'in-progress' as const, progress: 75 },
      { name: 'Testing', status: 'pending' as const, progress: 0 },
      { name: 'Deployment', status: 'pending' as const, progress: 0 }
    ],
    tags: ['Web', 'UI/UX', 'Branding']
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Creating a companion app for our main service.',
    deadline: '2024-02-28',
    phases: [
      { name: 'Planning', status: 'completed' as const, progress: 100 },
      { name: 'Design', status: 'in-progress' as const, progress: 60 },
      { name: 'Development', status: 'pending' as const, progress: 0 },
      { name: 'Testing', status: 'pending' as const, progress: 0 },
      { name: 'Deployment', status: 'pending' as const, progress: 0 }
    ],
    tags: ['Mobile', 'iOS', 'Android']
  },
  {
    id: '3',
    title: 'Marketing Campaign',
    description: 'Q4 marketing campaign for product launch.',
    deadline: '2023-11-30',
    phases: [
      { name: 'Research', status: 'completed' as const, progress: 100 },
      { name: 'Planning', status: 'completed' as const, progress: 100 },
      { name: 'Content Creation', status: 'in-progress' as const, progress: 85 },
      { name: 'Review', status: 'pending' as const, progress: 0 },
      { name: 'Launch', status: 'pending' as const, progress: 0 }
    ],
    tags: ['Marketing', 'Social Media', 'Content']
  }
];

export const ProjectsOverview: React.FC = () => {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Projects Overview</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
