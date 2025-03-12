
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CalendarIcon, Users, Target, Pencil, MessageCircle, Clock, BarChart, FileText, Settings, ChevronRight } from 'lucide-react';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!projectId) return;
    
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        
        // Fetch project basic info
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
          
        if (projectError) throw projectError;
        
        // Fetch project details
        const { data: detailsData, error: detailsError } = await supabase
          .from('project_details')
          .select('*')
          .eq('project_id', projectId)
          .single();
        
        if (detailsError && detailsError.code !== 'PGRST116') {
          console.error("Error fetching project details:", detailsError);
        }
        
        // Fetch chat history
        const { data: chatData, error: chatError } = await supabase
          .from('plan_chat_history')
          .select('*')
          .eq('plan_id', projectId)
          .order('created_at', { ascending: true });
          
        if (chatError) {
          console.error("Error fetching chat history:", chatError);
        }
        
        setProject(projectData);
        setProjectDetails(detailsData || null);
        setChatHistory(chatData || []);
      } catch (error) {
        console.error("Error loading project data:", error);
        toast({
          title: "Error",
          description: "Failed to load project details.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectData();
  }, [projectId, toast]);

  const handleGoBack = () => {
    navigate('/projects');
  };

  const handleEditProject = () => {
    navigate(`/new-project?projectId=${projectId}`);
  };

  // Calculate estimated progress based on available data
  const calculateProgress = () => {
    if (!projectDetails) return 25;
    
    let score = 25; // Base score
    
    if (projectDetails.business_context && Object.keys(projectDetails.business_context).length > 0) {
      score += 25;
    }
    
    if (projectDetails.goals && projectDetails.goals.length > 10) {
      score += 25;
    }
    
    if (projectDetails.features && Object.keys(projectDetails.features).length > 0) {
      score += 25;
    }
    
    return score;
  };

  // Generate next steps based on current project state
  const generateNextSteps = () => {
    const steps = [];
    
    if (!projectDetails?.business_context?.companyName) {
      steps.push('Complete your business information');
    }
    
    if (!projectDetails?.goals || projectDetails.goals.length < 10) {
      steps.push('Define your project goals in more detail');
    }
    
    if (!projectDetails?.features || Object.keys(projectDetails.features).length === 0) {
      steps.push('Select features for your application');
    }
    
    if (steps.length === 0) {
      steps.push('Review your project details');
      steps.push('Share your project with stakeholders');
      steps.push('Begin development planning');
    }
    
    return steps;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container max-w-6xl mx-auto py-8 px-4 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-siso-orange border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-siso-text-muted">Loading project details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="container max-w-6xl mx-auto py-8 px-4 min-h-screen">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
            <Button onClick={handleGoBack}>Return to Projects</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const progress = calculateProgress();
  const nextSteps = generateNextSteps();

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.05)"
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
        
        <div className="relative z-10 container max-w-6xl mx-auto py-8 px-4">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="mb-6 h-9">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">{project.title}</h1>
              <p className="text-siso-text/80 mt-1">{project.description || 'No description provided'}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleEditProject}
                className="h-9"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Project
              </Button>
              <Button
                className="h-9 bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
                onClick={() => setActiveTab('chat')}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Continue Planning
              </Button>
            </div>
          </div>
          
          <Card className="mb-8 border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {format(new Date(project.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {format(new Date(project.updated_at), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={project.status === 'active' ? 'default' : 'outline'} className="mt-1">
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <div className="w-32 mt-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-right mt-1">{progress}% complete</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="requirements" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Requirements
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Business Context</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {projectDetails?.business_context ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
                          <p className="font-medium">{projectDetails.business_context.companyName || 'Not specified'}</p>
                        </div>
                        
                        {projectDetails.business_context.website && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Website</h3>
                            <p className="font-medium">{projectDetails.business_context.website}</p>
                          </div>
                        )}
                        
                        {projectDetails.business_context.industry && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                            <p className="font-medium">{projectDetails.business_context.industry}</p>
                          </div>
                        )}
                        
                        {projectDetails.business_context.targetAudience && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Target Audience</h3>
                            <p className="font-medium">{projectDetails.business_context.targetAudience}</p>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Social Media</h3>
                          {projectDetails.business_context.socialLinks && 
                           Object.keys(projectDetails.business_context.socialLinks).length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {Object.entries(projectDetails.business_context.socialLinks)
                                .filter(([_, value]) => value)
                                .map(([platform, url]) => (
                                  <p key={platform} className="text-sm truncate">
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}: {url as string}
                                  </p>
                                ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">No social media links provided</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No business information provided yet.</p>
                        <Button variant="outline" onClick={handleEditProject}>
                          Add Business Info
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Project Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {projectDetails?.goals ? (
                      <div className="prose prose-sm max-w-none">
                        <p style={{ whiteSpace: 'pre-line' }}>{projectDetails.goals}</p>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No project goals specified yet.</p>
                        <Button variant="outline" onClick={handleEditProject}>
                          Define Goals
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Selected Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {projectDetails?.features && Object.keys(projectDetails.features).length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(projectDetails.features)
                          .filter(([_, value]: [string, any]) => value.selected)
                          .map(([id, value]: [string, any]) => (
                            <div key={id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                              <div className="rounded-md bg-primary/10 p-2">
                                {/* Icons would depend on your icon system */}
                                <FileText className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{id}</h3>
                                <p className="text-sm text-muted-foreground">Priority: {value.priority}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No features have been selected yet.</p>
                        <Button variant="outline" onClick={handleEditProject}>
                          Select Features
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Next Steps</CardTitle>
                    <CardDescription>Recommended actions to complete your project planning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nextSteps.map((step, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {index + 1}
                            </div>
                            <p className="font-medium">{step}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="requirements" className="space-y-6">
              <Card className="border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Project Requirements</CardTitle>
                  <CardDescription>
                    Detailed specifications and requirements for your project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* This could be structured data from the AI conversations */}
                  {chatHistory.length > 0 ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Technical Requirements</h3>
                        <div className="prose prose-sm max-w-none">
                          <p>Based on your conversations with the AI assistant, the following technical requirements have been identified:</p>
                          <ul>
                            <li>Web application with responsive design</li>
                            <li>User authentication system</li>
                            <li>Database for storing user and project data</li>
                            <li>API integrations for third-party services</li>
                          </ul>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Functional Requirements</h3>
                        <div className="prose prose-sm max-w-none">
                          <p>The application should provide the following functionality:</p>
                          <ul>
                            <li>User registration and profile management</li>
                            <li>Project creation and management</li>
                            <li>Collaboration features</li>
                            <li>Reporting and analytics</li>
                          </ul>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Non-Functional Requirements</h3>
                        <div className="prose prose-sm max-w-none">
                          <p>The application should meet these quality attributes:</p>
                          <ul>
                            <li>Performance: Fast page load times (under 2 seconds)</li>
                            <li>Security: Data encryption and secure authentication</li>
                            <li>Scalability: Ability to handle growing user base</li>
                            <li>Usability: Intuitive interface with minimal learning curve</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No requirements have been specified yet.</p>
                      <Button onClick={() => setActiveTab('chat')}>
                        Define Requirements with AI Assistant
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chat" className="space-y-6">
              <Card className="border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">AI Planning Assistant</CardTitle>
                  <CardDescription>
                    Continue your conversation with our AI to plan your project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px]">
                    <ChatInterface 
                      title="Project Planning" 
                      welcomeMessage="I'll help you plan your project. Tell me more about your requirements or ask me questions!"
                      inputPlaceholder="Type your question or request..."
                      systemPrompt="You are a helpful project planning assistant. Help the user plan their software project by asking relevant questions and providing guidance on requirements, features, timeline, and budget."
                      usePlanAssistant={true}
                      projectId={projectId}
                      className="h-full border-0 bg-transparent"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card className="border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Project Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Project Information</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-1">
                            <label className="text-sm text-muted-foreground">Title</label>
                          </div>
                          <div className="col-span-3">
                            <p className="font-medium">{project.title}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-1">
                            <label className="text-sm text-muted-foreground">Description</label>
                          </div>
                          <div className="col-span-3">
                            <p>{project.description || 'No description provided'}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-1">
                            <label className="text-sm text-muted-foreground">Status</label>
                          </div>
                          <div className="col-span-3">
                            <Badge>{project.status}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Danger Zone</h3>
                      <div className="border border-destructive/20 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-medium text-destructive">Delete Project</h4>
                            <p className="text-sm text-muted-foreground">
                              This action cannot be undone. This will permanently delete the project and all associated data.
                            </p>
                          </div>
                          <Button variant="destructive">
                            Delete Project
                          </Button>
                        </div>
                      </div>
                    </div>
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
