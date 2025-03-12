
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Code, Edit, MessageCircle, Sparkles, Target, User } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { demoProjects } from '@/data/demoData';
import { Json } from '@/integrations/supabase/types';
import { safeJsonObject, safeJsonArray, safeJsonProperty } from '@/utils/json-helpers';

interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: string;
  details?: {
    business_context?: {
      industry?: string;
      companyName?: string;
      scale?: string;
      target_audience?: string[];
    };
    goals?: string;
    features?: {
      core?: string[];
      extras?: string[];
    };
    timeline?: {
      estimated_weeks?: number;
      phases?: {
        name: string;
        duration: string;
        tasks: string[];
      }[];
    };
  };
}

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user, isDemo } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        
        // Handle demo mode with mock data
        if (isDemo || (projectId && projectId.startsWith('demo-'))) {
          const demoProject = demoProjects.find(p => p.id === projectId);
          if (demoProject) {
            setProject(demoProject);
            setLoading(false);
            return;
          }
        }
        
        if (!projectId) {
          setLoading(false);
          return;
        }

        // Fetch real project data from Supabase
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (projectError) throw projectError;

        const { data: detailsData, error: detailsError } = await supabase
          .from('project_details')
          .select('*')
          .eq('project_id', projectId)
          .single();

        if (detailsError && detailsError.code !== 'PGRST116') {
          console.error("Error fetching project details:", detailsError);
        }

        // Parse JSON data from Supabase
        let parsedDetails = undefined;
        
        if (detailsData) {
          // Parse business_context
          const businessContext = safeJsonObject(detailsData.business_context);
          
          // Parse features
          const featuresJson = safeJsonObject(detailsData.features);
          const features = {
            core: safeJsonArray<string>(featuresJson.core),
            extras: safeJsonArray<string>(featuresJson.extras)
          };
          
          // Parse timeline
          const timelineJson = safeJsonObject(detailsData.timeline);
          const timeline = timelineJson ? {
            estimated_weeks: safeJsonProperty<number>(timelineJson, 'estimated_weeks', 0),
            phases: safeJsonArray<{name: string; duration: string; tasks: string[]}>(timelineJson.phases)
          } : undefined;

          parsedDetails = {
            business_context: {
              industry: safeJsonProperty<string>(businessContext, 'industry', ''),
              companyName: safeJsonProperty<string>(businessContext, 'companyName', ''),
              scale: safeJsonProperty<string>(businessContext, 'scale', ''),
              target_audience: safeJsonArray<string>(businessContext.target_audience)
            },
            goals: detailsData.goals,
            features,
            timeline
          };
        }

        setProject({
          ...projectData,
          details: parsedDetails
        });
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

    fetchProjectDetails();
  }, [projectId, user, isDemo]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-t-siso-orange border-solid rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => navigate('/projects')} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
                <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
                <Button onClick={() => navigate('/projects')}>
                  Go to Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

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
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate('/projects')} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
          
          {isDemo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Alert variant="warning" className="bg-amber-500/10 border-amber-500/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Demo Mode</AlertTitle>
                <AlertDescription>
                  You're viewing a sample project in demo mode. 
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-semibold text-amber-500 hover:text-amber-600"
                    onClick={() => navigate('/auth')}
                  >
                    Sign in
                  </Button> to create and manage your own projects.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
                  {project.title}
                </h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Created {format(new Date(project.created_at), 'MMMM d, yyyy')}</span>
                  <span className="mx-2">•</span>
                  <Badge variant={project.status === 'active' ? 'default' : 'outline'}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  if (isDemo) {
                    toast({
                      title: "Demo Mode",
                      description: "Sign in to edit projects.",
                      variant: "default"
                    });
                    return;
                  }
                  // Handle edit functionality
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
                <Button 
                  className="bg-gradient-to-r from-siso-red to-siso-orange"
                  onClick={() => {
                    if (isDemo) {
                      toast({
                        title: "Demo Mode",
                        description: "Sign in to continue planning.",
                        variant: "default"
                      });
                      return;
                    }
                    navigate(`/new-project?projectId=${project.id}`)
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Continue Planning
                </Button>
              </div>
            </div>
            
            {project.description && (
              <p className="mt-4 text-muted-foreground max-w-prose">
                {project.description}
              </p>
            )}
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-siso-orange" />
                      Project Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project.details?.goals ? (
                      <p>{project.details.goals}</p>
                    ) : (
                      <p className="text-muted-foreground">No project goals defined yet.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-siso-orange" />
                      Business Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project.details?.business_context ? (
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="w-32 font-medium">Industry:</span>
                          <span>{project.details.business_context.industry || "Not specified"}</span>
                        </div>
                        <div className="flex">
                          <span className="w-32 font-medium">Company:</span>
                          <span>{project.details.business_context.companyName || "Not specified"}</span>
                        </div>
                        <div className="flex">
                          <span className="w-32 font-medium">Scale:</span>
                          <span>{project.details.business_context.scale || "Not specified"}</span>
                        </div>
                        {project.details.business_context.target_audience && (
                          <div className="flex">
                            <span className="w-32 font-medium">Audience:</span>
                            <span>{project.details.business_context.target_audience.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No business context defined yet.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-siso-orange" />
                    Project Summary
                  </CardTitle>
                  <CardDescription>
                    Overall project information and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>
                      This project was created on {format(new Date(project.created_at), 'MMMM d, yyyy')} and 
                      last updated on {format(new Date(project.updated_at), 'MMMM d, yyyy')}.
                    </p>
                    {project.details?.features && (
                      <p>
                        The project includes {project.details.features.core?.length || 0} core features
                        {project.details.features.extras?.length ? ` and ${project.details.features.extras.length} additional features` : ''}.
                      </p>
                    )}
                    {project.details?.timeline?.estimated_weeks && (
                      <p>
                        The estimated development time is {project.details.timeline.estimated_weeks} weeks.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-siso-orange" />
                    Core Features
                  </CardTitle>
                  <CardDescription>
                    Essential functionality for the minimum viable product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {project.details?.features?.core && project.details.features.core.length > 0 ? (
                    <ul className="space-y-2">
                      {project.details.features.core.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No core features defined yet.</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-siso-orange" />
                    Additional Features
                  </CardTitle>
                  <CardDescription>
                    Nice-to-have features for enhanced functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {project.details?.features?.extras && project.details.features.extras.length > 0 ? (
                    <ul className="space-y-2">
                      {project.details.features.extras.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Sparkles className="mr-2 h-4 w-4 text-blue-500 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No additional features defined yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-siso-orange" />
                    Development Timeline
                  </CardTitle>
                  <CardDescription>
                    Estimated project phases and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {project.details?.timeline?.phases && project.details.timeline.phases.length > 0 ? (
                    <div className="space-y-6">
                      {project.details.timeline.phases.map((phase, index) => (
                        <div key={index} className="border-l-2 border-siso-orange/50 pl-4 pb-2">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold">{phase.name}</h3>
                            <Badge variant="outline" className="ml-2">{phase.duration}</Badge>
                          </div>
                          <ul className="space-y-1">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-sm text-muted-foreground">
                                • {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                      <p className="text-muted-foreground mb-4">No timeline has been created yet.</p>
                      <Button onClick={() => {
                        if (isDemo) {
                          toast({
                            title: "Demo Mode",
                            description: "Sign in to continue planning.",
                            variant: "default"
                          });
                          return;
                        }
                        navigate(`/new-project?projectId=${project.id}`)
                      }}>
                        Plan Timeline
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-siso-orange" />
                    Technical Resources
                  </CardTitle>
                  <CardDescription>
                    Code, repositories, and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Code className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                    <p className="text-muted-foreground mb-4">No technical resources have been added yet.</p>
                    <Button onClick={() => {
                      if (isDemo) {
                        toast({
                          title: "Demo Mode",
                          description: "Sign in to add resources.",
                          variant: "default"
                        });
                        return;
                      }
                      // Handle adding resources
                    }}>
                      Add Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
