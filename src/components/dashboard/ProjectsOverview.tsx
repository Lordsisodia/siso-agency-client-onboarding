
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ArrowRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';

// Define proper Phase type
export interface Phase {
  name: string;
  status: "pending" | "completed" | "in-progress";
  progress: number;
}

export const ProjectsOverview = () => {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();
  
  // Sample project data
  const projects = {
    active: [
      {
        id: 'proj-1',
        title: 'Digital Marketing Strategy',
        status: 'in-progress' as const,
        progress: 65,
        deadline: '2023-12-15',
        client: 'TechCorp Inc.',
        description: 'Comprehensive digital marketing strategy focusing on lead generation and conversion optimization.',
        team: [
          { id: 'user-1', name: 'Alex Moore', avatar: '/placeholder-avatar.jpg' },
          { id: 'user-2', name: 'Sarah Kim', avatar: '/placeholder-avatar.jpg' },
        ],
        phases: [
          { name: 'Research', status: 'completed' as const, progress: 100 },
          { name: 'Strategy', status: 'in-progress' as const, progress: 75 },
          { name: 'Implementation', status: 'pending' as const, progress: 0 },
        ],
        tasks: { total: 24, completed: 14 },
        priority: 'high',
      },
      {
        id: 'proj-2',
        title: 'Website Redesign',
        status: 'in-progress' as const,
        progress: 40,
        deadline: '2024-01-30',
        client: 'GreenLife Co.',
        description: 'Complete redesign of e-commerce website with focus on improved user experience and conversion rate.',
        team: [
          { id: 'user-1', name: 'Alex Moore', avatar: '/placeholder-avatar.jpg' },
          { id: 'user-3', name: 'David Chen', avatar: '/placeholder-avatar.jpg' },
        ],
        phases: [
          { name: 'Discovery', status: 'completed' as const, progress: 100 },
          { name: 'Design', status: 'in-progress' as const, progress: 60 },
          { name: 'Development', status: 'pending' as const, progress: 0 },
          { name: 'Testing', status: 'pending' as const, progress: 0 },
        ],
        tasks: { total: 36, completed: 12 },
        priority: 'medium',
      },
    ],
    completed: [
      {
        id: 'proj-3',
        title: 'Brand Identity Design',
        status: 'completed' as const,
        progress: 100,
        deadline: '2023-10-15',
        client: 'Fusion Fitness',
        description: 'Complete brand identity package including logo, color palette, typography, and brand guidelines.',
        team: [
          { id: 'user-2', name: 'Sarah Kim', avatar: '/placeholder-avatar.jpg' },
          { id: 'user-4', name: 'Michael Johnson', avatar: '/placeholder-avatar.jpg' },
        ],
        phases: [
          { name: 'Research', status: 'completed' as const, progress: 100 },
          { name: 'Concepts', status: 'completed' as const, progress: 100 },
          { name: 'Refinement', status: 'completed' as const, progress: 100 },
          { name: 'Delivery', status: 'completed' as const, progress: 100 },
        ],
        tasks: { total: 18, completed: 18 },
        priority: 'medium',
      },
    ],
    draft: [
      {
        id: 'proj-4',
        title: 'Social Media Campaign',
        status: 'pending' as const,
        progress: 0,
        deadline: '2024-02-28',
        client: 'Urban Eats',
        description: 'Multi-platform social media campaign to increase brand awareness and engagement.',
        team: [
          { id: 'user-2', name: 'Sarah Kim', avatar: '/placeholder-avatar.jpg' },
        ],
        phases: [
          { name: 'Planning', status: 'pending' as const, progress: 0 },
          { name: 'Content Creation', status: 'pending' as const, progress: 0 },
          { name: 'Scheduling', status: 'pending' as const, progress: 0 },
          { name: 'Reporting', status: 'pending' as const, progress: 0 },
        ],
        tasks: { total: 12, completed: 0 },
        priority: 'low',
      },
    ],
  };
  
  const currentProjects = projects[activeTab as keyof typeof projects] || [];
  
  const handleViewDetails = (id: string) => {
    navigate(`/plan-builder/${id}`);
  };
  
  const handleEdit = (id: string) => {
    navigate(`/plan-builder/${id}`);
  };
  
  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Projects</CardTitle>
        <Button 
          variant="default" 
          size="sm" 
          className="text-xs"
          onClick={() => navigate('/new-project')}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Project
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-siso-bg-alt mb-4">
            <TabsTrigger value="active" className="text-xs">
              Active
              {projects.active.length > 0 && (
                <span className="ml-1 text-xs bg-siso-primary/10 text-siso-primary px-1.5 py-0.5 rounded-full">
                  {projects.active.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Completed
              {projects.completed.length > 0 && (
                <span className="ml-1 text-xs bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-full">
                  {projects.completed.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="draft" className="text-xs">
              Draft
              {projects.draft.length > 0 && (
                <span className="ml-1 text-xs bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded-full">
                  {projects.draft.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="m-0">
            {projects.active.length === 0 ? (
              <EmptyProjectsState 
                title="No active projects"
                description="Start building your first project to get going." 
                buttonText="Create New Project"
                onClick={() => navigate('/new-project')}
              />
            ) : (
              <div className="space-y-4">
                {projects.active.map(project => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    status={project.status}
                    progress={project.progress}
                    deadline={project.deadline}
                    client={project.client}
                    description={project.description}
                    team={project.team}
                    phases={project.phases}
                    tasks={project.tasks}
                    priority={project.priority}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEdit}
                    isFullWidth={true}
                  />
                ))}
                
                {projects.active.length > 2 && (
                  <div className="text-center pt-2">
                    <Button 
                      variant="ghost" 
                      className="text-sm text-siso-text-muted hover:text-siso-text"
                      onClick={() => navigate('/projects')}
                    >
                      View All Projects
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="m-0">
            {projects.completed.length === 0 ? (
              <EmptyProjectsState 
                title="No completed projects"
                description="Your completed projects will appear here."
                buttonText="View Active Projects"
                onClick={() => setActiveTab('active')}
              />
            ) : (
              <div className="space-y-4">
                {projects.completed.map(project => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    status={project.status}
                    progress={project.progress}
                    deadline={project.deadline}
                    client={project.client}
                    description={project.description}
                    team={project.team}
                    phases={project.phases}
                    tasks={project.tasks}
                    priority={project.priority}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEdit}
                    isFullWidth={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="draft" className="m-0">
            {projects.draft.length === 0 ? (
              <EmptyProjectsState 
                title="No draft projects"
                description="Save a project as draft to work on it later."
                buttonText="Create New Project"
                onClick={() => navigate('/new-project')}
              />
            ) : (
              <div className="space-y-4">
                {projects.draft.map(project => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    status={project.status}
                    progress={project.progress}
                    deadline={project.deadline}
                    client={project.client}
                    description={project.description}
                    team={project.team}
                    phases={project.phases}
                    tasks={project.tasks}
                    priority={project.priority}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEdit}
                    isFullWidth={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Empty state component
const EmptyProjectsState = ({ 
  title, 
  description, 
  buttonText, 
  onClick 
}: { 
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-siso-text-muted mb-6 max-w-sm">{description}</p>
      <Button onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};
