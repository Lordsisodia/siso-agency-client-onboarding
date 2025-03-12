
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Waves } from '@/components/ui/waves-background';
import { ProjectDetailsHeader } from '@/components/project-details/ProjectDetailsHeader';
import { ProjectOverview } from '@/components/project-details/ProjectOverview';
import { ProjectFeatures } from '@/components/project-details/ProjectFeatures';
import { ProjectNotFound } from '@/components/project-details/ProjectNotFound';
import { ProjectLoader } from '@/components/project-details/ProjectLoader';
import { DemoModeAlert } from '@/components/project-details/DemoModeAlert';
import { fetchProjectData } from '@/components/project-details/utils';
import { Project } from '@/components/project-details/types';
import { ProjectDetailsDashboard } from '@/components/projects/ProjectDetailsDashboard';
import { ProjectTimelineView } from '@/components/projects/ProjectTimelineView';
import { ProjectResources } from '@/components/project-details/ProjectResources';
import { convertToTaskProject } from '@/utils/projectUtils';

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, isDemo } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        setLoading(true);
        
        if (!projectId) {
          setLoading(false);
          return;
        }

        const projectData = await fetchProjectData(projectId, isDemo);
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({
          title: "Error",
          description: "There was a problem fetching project details.",
          variant: "destructive"
        });
        // Navigate back to projects page if there's an error
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjectDetails();
  }, [projectId, user, isDemo, toast, navigate]);

  if (loading) {
    return (
      <MainLayout>
        <ProjectLoader />
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <ProjectNotFound />
      </MainLayout>
    );
  }

  // Convert the project data to the format needed by our dashboard components
  const taskProject = convertToTaskProject(project);

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.1)"
            waveSpeedX={0.01}
            waveSpeedY={0.005}
            waveAmpX={20}
            waveAmpY={10}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          {isDemo && <DemoModeAlert />}
          
          <ProjectDetailsHeader project={project} isDemo={isDemo} />
          
          {/* Add the new dashboard overview at the top */}
          <ProjectDetailsDashboard project={taskProject} />
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <ProjectOverview project={project} />
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <ProjectFeatures project={project} />
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-6">
              <ProjectTimelineView project={taskProject} />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <ProjectResources project={project} isDemo={isDemo} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
