
import { useState, useEffect } from 'react';
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
import { FeaturedProjects } from '@/components/portfolio/FeaturedProjects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectFilters } from '@/components/portfolio/ProjectFilters';
import { ProjectDetailView } from '@/components/portfolio/ProjectDetailView';
import { ProjectSorter } from '@/components/portfolio/ProjectSorter';
import { Project } from '@/components/portfolio/types';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Skeleton } from '@/components/ui/skeleton';
import { seedPortfolioData } from '@/services/portfolio-seed.service';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  const handleSeedData = async () => {
    setSeedingData(true);
    try {
      const success = await seedPortfolioData(true);
      if (success) {
        // Refresh projects after seeding
        refreshProjects();
      }
    } catch (error) {
      console.error('Error in seed operation:', error);
    } finally {
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
          
          {/* Featured Projects Carousel */}
          {loading ? (
            <div className="w-full h-[500px] rounded-xl overflow-hidden border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
              <Skeleton className="w-full h-full" />
            </div>
          ) : (
            featuredProjects.length > 0 && (
              <FeaturedProjects 
                projects={featuredProjects} 
                onProjectClick={handleProjectClick}
              />
            )
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-96 rounded-xl overflow-hidden border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl border border-red-500/20 bg-black/20 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-red-500 mb-2">Error loading projects</h3>
                <p className="text-siso-text/80 mb-4">{error}</p>
                <Button 
                  variant="destructive" 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </motion.div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl border border-siso-orange/20 bg-black/20 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-siso-text-bold mb-2">No projects found</h3>
                <p className="text-siso-text/80">Try adjusting your search criteria or filters.</p>
                {activeFilters.length > 0 && (
                  <Button 
                    variant="link" 
                    onClick={clearFilters}
                    className="text-siso-orange mt-2"
                  >
                    Clear filters
                  </Button>
                )}
              </motion.div>
            </div>
          )}
          
          {/* Project Detail Dialog */}
          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="max-w-4xl p-0 bg-black/90 border-siso-orange/30">
              {selectedProject && (
                <ProjectDetailView project={selectedProject} onClose={() => setDetailOpen(false)} />
              )}
            </DialogContent>
          </Dialog>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 p-8 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm text-center"
          >
            <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Ready to Build Your Custom App?</h3>
            <p className="text-siso-text/80 mb-6 max-w-2xl mx-auto">
              Our team specializes in creating tailor-made applications that solve your specific business challenges. Let's discuss your project!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="px-6 py-3 rounded-lg bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white font-medium transition-all">
                Start Your Project
              </Button>
              <Button variant="outline" className="px-6 py-3 rounded-lg border-siso-orange/40 text-siso-text-bold hover:bg-siso-orange/10">
                View Our Process
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
