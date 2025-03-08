
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Plus, Filter, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// This would come from your API
const mockProjects = [
  { 
    id: '1', 
    title: 'Mobile App Redesign',
    status: 'in-progress' as const, 
    progress: 65,
    deadline: '2023-12-24',
    client: 'TechCorp'
  },
  { 
    id: '2', 
    title: 'Website Development',
    status: 'planning' as const, 
    progress: 20,
    deadline: '2024-01-15',
    client: 'Design Studio'
  },
  { 
    id: '3', 
    title: 'E-commerce Platform',
    status: 'reviewing' as const, 
    progress: 80,
    deadline: '2023-11-30',
    client: 'RetailFusion'
  },
  { 
    id: '4', 
    title: 'Brand Identity Design',
    status: 'completed' as const, 
    progress: 100,
    client: 'StartupX'
  }
];

type ProjectStatus = 'planning' | 'in-progress' | 'reviewing' | 'completed' | 'all';

export const ProjectsOverview = () => {
  const navigate = useNavigate();
  const [projects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>('all');
  
  const handleViewDetails = (id: string) => {
    navigate(`/projects/${id}`);
  };
  
  const handleEdit = (id: string) => {
    navigate(`/projects/${id}/edit`);
  };
  
  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  const filteredProjects = projects.filter(project => {
    // First apply status filter
    if (activeFilter !== 'all' && project.status !== activeFilter) return false;
    
    // Then apply search term filter
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.client.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const filterOptions: { value: ProjectStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'reviewing', label: 'Reviewing' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mb-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-siso-text-bold">Recent Projects</h2>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-[200px] bg-siso-bg/60 border-siso-border"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-siso-text/50" />
          </div>
          
          <div className="flex gap-2">
            <div className="flex rounded-md border border-siso-border overflow-hidden">
              {filterOptions.map((option, index) => (
                <Button
                  key={option.value}
                  variant={activeFilter === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(option.value)}
                  className={`
                    ${activeFilter === option.value ? 'bg-siso-orange text-white' : 'text-siso-text hover:text-siso-text-bold'}
                    rounded-none
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === filterOptions.length - 1 ? 'rounded-r-md' : ''}
                    px-2 py-1 h-9 text-xs
                  `}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleCreateProject}
                size="sm" 
                className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
              >
                <Plus size={14} className="mr-1" />
                New Project
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-siso-border rounded-lg bg-siso-bg/30">
          <p className="text-siso-text/70 mb-4">
            {searchTerm || activeFilter !== 'all'
              ? "No projects match your filters."
              : "You don't have any projects yet."}
          </p>
          {!searchTerm && activeFilter === 'all' && (
            <Button 
              onClick={handleCreateProject}
              size="sm" 
              className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
            >
              <Plus size={14} className="mr-1" />
              Create your first project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              delay={index * 0.05}
            />
          ))}
        </div>
      )}
      
      {filteredProjects.length > 0 && (
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
