
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Plus, Filter, Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Enhanced mock data with additional project metrics
const mockProjects = [
  { 
    id: '1', 
    title: 'Mobile App Redesign',
    status: 'in-progress' as const, 
    progress: 65,
    deadline: '2023-12-24',
    client: 'TechCorp',
    description: 'Complete redesign of the mobile app interface with focus on improved user experience and performance optimization.',
    priority: 'high' as const,
    tasks: { total: 18, completed: 12 },
    lastUpdated: '2023-11-15T10:30:00',
    team: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
    // New fields for enhanced project card
    phases: [
      { name: 'Planning', status: 'completed', progress: 100 },
      { name: 'Design', status: 'completed', progress: 100 },
      { name: 'Development', status: 'in-progress', progress: 45 },
      { name: 'Testing', status: 'pending', progress: 0 },
      { name: 'Deployment', status: 'pending', progress: 0 }
    ],
    codeMetrics: {
      linesOfCode: 8450,
      commits: 72,
      files: 34,
      quality: 92
    },
    financialMetrics: {
      marketValue: 48000,
      costSavings: 12500,
      developmentCost: 35500,
      roi: 35
    }
  },
  { 
    id: '2', 
    title: 'Website Development',
    status: 'planning' as const, 
    progress: 20,
    deadline: '2024-01-15',
    client: 'Design Studio',
    description: 'Build a responsive website with modern design patterns, optimized for all devices and screen sizes.',
    priority: 'medium' as const,
    tasks: { total: 24, completed: 5 },
    lastUpdated: '2023-11-10T14:15:00',
    team: ['Lisa Wong', 'James Taylor'],
    phases: [
      { name: 'Planning', status: 'in-progress', progress: 60 },
      { name: 'Design', status: 'pending', progress: 0 },
      { name: 'Development', status: 'pending', progress: 0 },
      { name: 'Testing', status: 'pending', progress: 0 },
      { name: 'Deployment', status: 'pending', progress: 0 }
    ],
    codeMetrics: {
      linesOfCode: 2120,
      commits: 28,
      files: 15,
      quality: 88
    },
    financialMetrics: {
      marketValue: 35000,
      costSavings: 8000,
      developmentCost: 27000,
      roi: 29
    }
  },
  { 
    id: '3', 
    title: 'E-commerce Platform',
    status: 'reviewing' as const, 
    progress: 80,
    deadline: '2023-11-30',
    client: 'RetailFusion',
    description: 'Develop a custom e-commerce platform with payment integration, inventory management and analytics dashboard.',
    priority: 'high' as const,
    tasks: { total: 32, completed: 26 },
    lastUpdated: '2023-11-18T09:45:00',
    team: ['Chris Lee', 'Amanda Park', 'David Miller', 'Emma White'],
    phases: [
      { name: 'Planning', status: 'completed', progress: 100 },
      { name: 'Design', status: 'completed', progress: 100 },
      { name: 'Development', status: 'completed', progress: 100 },
      { name: 'Testing', status: 'in-progress', progress: 75 },
      { name: 'Deployment', status: 'pending', progress: 0 }
    ],
    codeMetrics: {
      linesOfCode: 15320,
      commits: 142,
      files: 78,
      quality: 95
    },
    financialMetrics: {
      marketValue: 95000,
      costSavings: 22000,
      developmentCost: 73000,
      roi: 30
    }
  },
  { 
    id: '4', 
    title: 'Brand Identity Design',
    status: 'completed' as const, 
    progress: 100,
    client: 'StartupX',
    description: 'Create a comprehensive brand identity including logo, color palette, typography and brand guidelines document.',
    priority: 'low' as const,
    tasks: { total: 15, completed: 15 },
    lastUpdated: '2023-11-05T16:20:00',
    team: ['Jennifer Garcia', 'Robert Chen'],
    phases: [
      { name: 'Planning', status: 'completed', progress: 100 },
      { name: 'Research', status: 'completed', progress: 100 },
      { name: 'Concept Development', status: 'completed', progress: 100 },
      { name: 'Refinement', status: 'completed', progress: 100 },
      { name: 'Delivery', status: 'completed', progress: 100 }
    ],
    codeMetrics: {
      linesOfCode: 0,
      commits: 0,
      files: 12,
      quality: 98
    },
    financialMetrics: {
      marketValue: 22000,
      costSavings: 5500,
      developmentCost: 16500,
      roi: 33
    }
  }
];

type ProjectStatus = 'planning' | 'in-progress' | 'reviewing' | 'completed' | 'all';
type ProjectPriority = 'low' | 'medium' | 'high' | 'all';

export const ProjectsOverview = () => {
  const navigate = useNavigate();
  const [projects] = useState(mockProjects);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<ProjectStatus>('all');
  const [activePriorityFilter, setActivePriorityFilter] = useState<ProjectPriority>('all');
  
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
    if (activeStatusFilter !== 'all' && project.status !== activeStatusFilter) return false;
    
    // Then apply priority filter
    if (activePriorityFilter !== 'all' && project.priority !== activePriorityFilter) return false;
    
    // Then apply search term filter
    if (searchTerm && 
        !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.client?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const currentProject = filteredProjects[currentProjectIndex] || null;

  const nextProject = () => {
    if (currentProjectIndex < filteredProjects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    } else {
      setCurrentProjectIndex(0); // Loop back to the first project
    }
  };

  const prevProject = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    } else {
      setCurrentProjectIndex(filteredProjects.length - 1); // Loop to the last project
    }
  };

  const statusFilterOptions: { value: ProjectStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'reviewing', label: 'Reviewing' },
    { value: 'completed', label: 'Completed' }
  ];

  const priorityFilterOptions: { value: ProjectPriority; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mb-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-siso-text-bold">Projects Overview</h2>
        
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
          
          <div className="flex gap-2 flex-wrap">
            <div className="flex rounded-md border border-siso-border overflow-hidden">
              {statusFilterOptions.map((option, index) => (
                <Button
                  key={option.value}
                  variant={activeStatusFilter === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveStatusFilter(option.value)}
                  className={`
                    ${activeStatusFilter === option.value ? 'bg-siso-orange text-white' : 'text-siso-text hover:text-siso-text-bold'}
                    rounded-none
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === statusFilterOptions.length - 1 ? 'rounded-r-md' : ''}
                    px-2 py-1 h-9 text-xs
                  `}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <div className="flex rounded-md border border-siso-border overflow-hidden">
              {priorityFilterOptions.map((option, index) => (
                <Button
                  key={option.value}
                  variant={activePriorityFilter === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActivePriorityFilter(option.value)}
                  className={`
                    ${activePriorityFilter === option.value ? 'bg-siso-orange text-white' : 'text-siso-text hover:text-siso-text-bold'}
                    rounded-none
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === priorityFilterOptions.length - 1 ? 'rounded-r-md' : ''}
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
            {searchTerm || activeStatusFilter !== 'all' || activePriorityFilter !== 'all'
              ? "No projects match your filters."
              : "You don't have any projects yet."}
          </p>
          {!searchTerm && activeStatusFilter === 'all' && activePriorityFilter === 'all' && (
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
        <div className="relative">
          {/* Project navigation controls */}
          {filteredProjects.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10 px-2">
              <Button 
                onClick={prevProject} 
                variant="secondary" 
                size="icon" 
                className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg pointer-events-auto"
              >
                <ArrowLeft size={18} />
              </Button>
              <Button 
                onClick={nextProject} 
                variant="secondary" 
                size="icon" 
                className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg pointer-events-auto"
              >
                <ArrowRight size={18} />
              </Button>
            </div>
          )}
          
          {/* Current project card */}
          {currentProject && (
            <div className="w-full mb-4">
              <ProjectCard
                key={currentProject.id}
                {...currentProject}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                isFullWidth={true}
              />
            </div>
          )}
          
          {/* Project pagination indicator */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`h-2.5 rounded-full transition-all 
                    ${index === currentProjectIndex ? 'w-8 bg-siso-orange' : 'w-2.5 bg-siso-border hover:bg-siso-orange/50'}`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      {filteredProjects.length > 0 && (
        <div className="mt-6 text-center">
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
