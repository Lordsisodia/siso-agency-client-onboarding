
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Phase } from '@/types/dashboard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Defining the Project type to resolve the TS error
export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  phases: Phase[];
  tags: string[];
  financials?: {
    marketValue: number;
    costSavings: number;
    developmentCost: number;
    roi: number;
  };
}

interface ProjectsOverviewProps {
  projects?: Project[];
}

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({ projects }) => {
  const navigate = useNavigate();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  const sampleProjects: Project[] = [
    {
      id: "1",
      title: "Website Redesign",
      description: "Modernizing the company website with new UI/UX",
      deadline: "2023-12-31",
      phases: [
        { name: "Research", status: "completed", progress: 100 },
        { name: "Design", status: "in-progress", progress: 70 },
        { name: "Development", status: "pending", progress: 0 }
      ],
      tags: ["Design", "Frontend"],
      financials: {
        marketValue: 25000,
        costSavings: 8000,
        developmentCost: 12000,
        roi: 108
      }
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Creating a native mobile app for both iOS and Android",
      deadline: "2024-03-15",
      phases: [
        { name: "Planning", status: "completed", progress: 100 },
        { name: "UI Design", status: "in-progress", progress: 85 },
        { name: "Backend API", status: "in-progress", progress: 45 },
        { name: "Frontend Development", status: "pending", progress: 0 }
      ],
      tags: ["Mobile", "Backend", "API"],
      financials: {
        marketValue: 75000,
        costSavings: 21000,
        developmentCost: 35000,
        roi: 114
      }
    },
    {
      id: "3",
      title: "Data Analytics Dashboard",
      description: "Building an interactive analytics dashboard",
      deadline: "2024-01-30",
      phases: [
        { name: "Requirements", status: "completed", progress: 100 },
        { name: "Data Modeling", status: "completed", progress: 100 },
        { name: "Dashboard Design", status: "in-progress", progress: 60 },
        { name: "Implementation", status: "pending", progress: 10 }
      ],
      tags: ["Analytics", "Dashboard", "Visualization"],
      financials: {
        marketValue: 45000,
        costSavings: 15000,
        developmentCost: 18000,
        roi: 150
      }
    }
  ];
  
  const displayProjects = projects || sampleProjects;
  
  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % displayProjects.length);
  };
  
  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
  };

  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg">Projects & Tasks Overview</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/new-project')}
          className="flex items-center gap-1 bg-gradient-to-r from-siso-red to-siso-orange text-white border-none hover:opacity-90"
        >
          <PlusCircle className="h-4 w-4" />
          New Project
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {displayProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No projects to display.</p>
                <p className="mt-2 text-sm">Start a new project to see it here.</p>
                <Button 
                  className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => navigate('/new-project')}
                >
                  Create Your First Project
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">
                    Project {currentProjectIndex + 1} of {displayProjects.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevProject}
                      className="h-8 w-8"
                      disabled={displayProjects.length <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextProject}
                      className="h-8 w-8"
                      disabled={displayProjects.length <= 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={displayProjects[currentProjectIndex].id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={displayProjects[currentProjectIndex]} />
                  </motion.div>
                </AnimatePresence>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center text-sm text-siso-text hover:text-siso-text-bold"
                    onClick={() => navigate('/projects')}
                  >
                    View All Projects
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="active">
            {displayProjects.filter(p => p.phases.some(phase => phase.status === 'in-progress')).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active projects to display.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">
                    Active Project
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevProject}
                      className="h-8 w-8"
                      disabled={displayProjects.filter(p => p.phases.some(phase => phase.status === 'in-progress')).length <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextProject}
                      className="h-8 w-8"
                      disabled={displayProjects.filter(p => p.phases.some(phase => phase.status === 'in-progress')).length <= 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  {displayProjects
                    .filter(p => p.phases.some(phase => phase.status === 'in-progress'))
                    .map((project, index) => (
                      index === currentProjectIndex % displayProjects.filter(p => p.phases.some(phase => phase.status === 'in-progress')).length && (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      )
                    ))}
                </AnimatePresence>
              </>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {displayProjects.filter(p => p.phases.every(phase => phase.status === 'completed')).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No completed projects to display.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">
                    Completed Project
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevProject}
                      className="h-8 w-8"
                      disabled={displayProjects.filter(p => p.phases.every(phase => phase.status === 'completed')).length <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextProject}
                      className="h-8 w-8"
                      disabled={displayProjects.filter(p => p.phases.every(phase => phase.status === 'completed')).length <= 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  {displayProjects
                    .filter(p => p.phases.every(phase => phase.status === 'completed'))
                    .map((project, index) => (
                      index === currentProjectIndex % displayProjects.filter(p => p.phases.every(phase => phase.status === 'completed')).length && (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      )
                    ))}
                </AnimatePresence>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
