
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Plus, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// This would come from your API
const mockProjects = [
  { 
    id: '1', 
    title: 'Mobile App Redesign',
    status: 'in-progress' as const, 
    progress: 65,
    deadline: '2023-12-24'
  },
  { 
    id: '2', 
    title: 'Website Development',
    status: 'planning' as const, 
    progress: 20,
    deadline: '2024-01-15'
  },
  { 
    id: '3', 
    title: 'E-commerce Platform',
    status: 'reviewing' as const, 
    progress: 80,
    deadline: '2023-11-30'
  },
  { 
    id: '4', 
    title: 'Brand Identity Design',
    status: 'completed' as const, 
    progress: 100
  }
];

export const ProjectsOverview = () => {
  const navigate = useNavigate();
  const [projects] = useState(mockProjects);
  
  const handleViewDetails = (id: string) => {
    navigate(`/projects/${id}`);
  };
  
  const handleEdit = (id: string) => {
    navigate(`/projects/${id}/edit`);
  };
  
  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mb-10"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-siso-text-bold">Recent Projects</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter size={14} className="mr-1" />
            Filter
          </Button>
          <Button 
            onClick={handleCreateProject}
            size="sm" 
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
          >
            <Plus size={14} className="mr-1" />
            New Project
          </Button>
        </div>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-siso-border rounded-lg">
          <p className="text-siso-text/70 mb-4">You don't have any projects yet.</p>
          <Button 
            onClick={handleCreateProject}
            size="sm" 
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
          >
            <Plus size={14} className="mr-1" />
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
      
      {projects.length > 0 && (
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/projects')}
            className="text-siso-orange hover:text-siso-red"
          >
            View all projects
          </Button>
        </div>
      )}
    </motion.div>
  );
};
