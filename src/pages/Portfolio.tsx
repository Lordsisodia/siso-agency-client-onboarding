
import { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Filter, Search, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

// These are placeholder components since we can't access the original components
// In a real implementation, you would use the actual components
const FeaturedProjects = ({ projects, onProjectClick }: any) => (
  <div className="mb-12 p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
    <h2 className="text-2xl font-bold text-siso-text-bold mb-4">Featured Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project: any) => (
        <div 
          key={project.id} 
          className="p-4 rounded-xl border border-siso-orange/20 bg-black/30 cursor-pointer hover:bg-black/40 transition-all"
          onClick={() => onProjectClick(project)}
        >
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-sm text-siso-text/80">{project.description.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project, index, onClick }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="p-4 rounded-xl border border-siso-border bg-black/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
    onClick={() => onClick(project)}
  >
    <div className="aspect-video bg-black/40 rounded-lg mb-3 flex items-center justify-center">
      {project.thumbnailUrl ? (
        <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="text-siso-text/30">No Image</div>
      )}
    </div>
    <h3 className="font-semibold text-siso-text-bold text-lg">{project.title}</h3>
    <p className="text-sm text-siso-text/80 mt-1 line-clamp-2">{project.description}</p>
    <div className="flex items-center gap-2 mt-3">
      {project.tags?.map((tag: string, index: number) => (
        <span key={index} className="text-xs bg-siso-bg px-2 py-0.5 rounded-full text-siso-text/60">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectFilters = ({ onFilterChange }: any) => (
  <div className="flex flex-wrap gap-2">
    <Button variant="outline" size="sm" className="bg-black/30 border-siso-orange/30 text-siso-text">
      All
    </Button>
    <Button variant="outline" size="sm" className="bg-black/30 border-siso-border text-siso-text">
      Web
    </Button>
    <Button variant="outline" size="sm" className="bg-black/30 border-siso-border text-siso-text">
      Mobile
    </Button>
    <Button variant="outline" size="sm" className="bg-black/30 border-siso-border text-siso-text">
      E-commerce
    </Button>
  </div>
);

const ProjectSorter = ({ onSortChange, currentSort }: any) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-siso-text/70">Sort:</span>
    <select 
      className="bg-black/30 border border-siso-border rounded text-sm p-1.5 text-siso-text focus:outline-none focus:ring-1 focus:ring-siso-orange"
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="recent">Most Recent</option>
      <option value="oldest">Oldest First</option>
      <option value="az">A-Z</option>
      <option value="za">Z-A</option>
    </select>
  </div>
);

const ProjectDetailView = ({ project, onClose }: any) => (
  <div className="p-6 max-h-[80vh] overflow-y-auto">
    <button 
      className="absolute top-4 right-4 text-siso-text/70 hover:text-siso-text"
      onClick={onClose}
    >
      &times;
    </button>
    <h2 className="text-2xl font-bold text-siso-text-bold">{project.title}</h2>
    <p className="text-siso-text/80 mt-2">{project.description}</p>
  </div>
);

// Sample data
const sampleProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart, and checkout functionality.',
    tags: ['web', 'e-commerce', 'react'],
    featured: true,
    thumbnailUrl: ''
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'A secure mobile banking application with transaction history, transfers, and bill payments.',
    tags: ['mobile', 'fintech', 'react-native'],
    featured: true,
    thumbnailUrl: ''
  },
  {
    id: '3',
    title: 'Healthcare Management System',
    description: 'A comprehensive healthcare management system for hospitals and clinics.',
    tags: ['web', 'healthcare', 'angular'],
    featured: true,
    thumbnailUrl: ''
  },
  {
    id: '4',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media managers to track performance across platforms.',
    tags: ['web', 'analytics', 'vue'],
    featured: false,
    thumbnailUrl: ''
  }
];

// Hooks for Portfolio page - simplified version
const usePortfolio = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('recent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter projects based on search and filters
  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilters.length === 0) return matchesSearch;
    
    return matchesSearch && activeFilters.some(filter => 
      project.tags?.includes(filter)
    );
  });

  // Get featured projects
  const featuredProjects = sampleProjects.filter(project => project.featured);

  // Handlers
  const handleSearchChange = (query: string) => setSearchQuery(query);
  
  const handleFilterChange = (filter: string) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };
  
  const handleSortChange = (option: string) => setSortOption(option);
  
  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilters([]);
    setSortOption('recent');
  };
  
  const refreshProjects = () => {
    setLoading(true);
    // In a real app, this would make an API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    filteredProjects,
    featuredProjects,
    loading,
    error,
    searchQuery,
    activeFilters,
    sortOption,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    clearFilters,
    refreshProjects
  };
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [seedingData, setSeedingData] = useState(false);
  
  const {
    filteredProjects,
    featuredProjects,
    loading,
    error,
    searchQuery,
    activeFilters,
    sortOption,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    clearFilters,
    refreshProjects
  } = usePortfolio();

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  const handleSeedData = async () => {
    setSeedingData(true);
    try {
      // In a real app, this would make an API call
      setTimeout(() => {
        refreshProjects();
        setSeedingData(false);
      }, 1000);
    } catch (error) {
      console.error('Error in seed operation:', error);
      setSeedingData(false);
    }
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        <div className="relative z-10 container px-4 py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Our Portfolio
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl mx-auto">
              Discover our collection of custom applications built for agencies across different industries. Each project showcases our commitment to innovation and quality.
            </p>
            
            {/* Admin button to seed data (for development only) */}
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-black/30 border-siso-orange/30 text-siso-orange"
                onClick={handleSeedData}
                disabled={seedingData}
              >
                <Database className="w-4 h-4 mr-2" />
                {seedingData ? 'Seeding Data...' : 'Seed Sample Data'}
              </Button>
            </div>
          </motion.div>
          
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <FeaturedProjects 
              projects={featuredProjects} 
              onProjectClick={handleProjectClick}
            />
          )}
          
          {/* Search & Filters */}
          <div className="my-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-siso-orange/20">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 bg-black/30 border-siso-orange/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-siso-text/50" />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <ProjectFilters onFilterChange={handleFilterChange} />
              <div className="h-8 w-px bg-siso-border/30 mx-1 hidden md:block"></div>
              <ProjectSorter onSortChange={handleSortChange} currentSort={sortOption} />
            </div>
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
          
          {/* Project Detail Dialog */}
          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="max-w-4xl p-0 bg-black/90 border-siso-orange/30">
              {selectedProject && (
                <ProjectDetailView project={selectedProject} onClose={() => setDetailOpen(false)} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  );
}
