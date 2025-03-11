
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Phase } from '@/types/dashboard';

export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  phases: Phase[];
  tags: string[];
  financials?: {
    marketValue?: number;
    costSavings?: number;
    developmentCost?: number;
    roi?: number;
  };
}

interface ProjectsOverviewProps {
  projects?: Project[];
}

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({ projects }) => {
  const navigate = useNavigate();
  
  // Sample projects data - in a real app, these would come from an API
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

  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg">Projects Overview</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/new-project')}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          New Project
        </Button>
      </CardHeader>
      <CardContent>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center text-sm text-siso-text-muted hover:text-siso-text"
                onClick={() => navigate('/projects')}
              >
                View All Projects
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
