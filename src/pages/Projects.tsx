
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, MessageCircle, Calendar, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: string;
  details?: {
    business_context: any;
    goals: string;
    features: any;
  };
}

// Sample demo projects data
const demoProjects: Project[] = [
  {
    id: "demo-1",
    title: "E-Commerce Mobile App",
    description: "A feature-rich mobile shopping application with personalized recommendations and secure payment processing.",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: "active",
    details: {
      business_context: {
        industry: "Retail",
        companyName: "ShopSmart",
        scale: "Medium"
      },
      goals: "Create a seamless shopping experience for users with personalized product recommendations",
      features: {
        core: ["Product search", "Wishlist", "Secure checkout"],
        extras: ["AR product preview", "Voice search"]
      }
    }
  },
  {
    id: "demo-2",
    title: "Task Management Dashboard",
    description: "A comprehensive task management system with team collaboration features and progress analytics.",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: "active",
    details: {
      business_context: {
        industry: "Productivity",
        companyName: "TaskFlow",
        scale: "Small"
      },
      goals: "Increase team productivity and project transparency",
      features: {
        core: ["Task assignment", "Due dates", "Progress tracking"],
        extras: ["Time tracking", "Automated reminders", "Integration with calendar"]
      }
    }
  },
  {
    id: "demo-3",
    title: "Health & Fitness Tracker",
    description: "A mobile application for tracking fitness goals, nutrition, and overall wellness metrics.",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: "active",
    details: {
      business_context: {
        industry: "Health & Wellness",
        companyName: "FitLife",
        scale: "Startup"
      },
      goals: "Help users maintain healthy habits and achieve fitness goals",
      features: {
        core: ["Workout tracking", "Meal planning", "Progress visualization"],
        extras: ["Social sharing", "Coach connection", "Wearable integration"]
      }
    }
  }
];

export default function Projects() {
  const navigate = useNavigate();
  const { user, isDemo } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  const handleCreateNewProject = () => {
    if (isDemo) {
      toast({
        title: "Demo Mode",
        description: "Sign in to create new projects.",
        variant: "default"
      });
      navigate('/auth');
      return;
    }
    navigate('/plan-builder');
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      if (isDemo) {
        // If in demo mode, use the demo projects data
        setProjects(demoProjects);
        setLoading(false);
        return;
      }
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: projectsData, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const projectsWithDetails = await Promise.all(
        projectsData.map(async (project) => {
          const { data: detailsData, error: detailsError } = await supabase
            .from('project_details')
            .select('*')
            .eq('project_id', project.id)
            .single();

          if (detailsError && detailsError.code !== 'PGRST116') {
            console.error("Error fetching project details:", detailsError);
          }

          return {
            ...project,
            details: detailsData || undefined
          };
        })
      );

      setProjects(projectsWithDetails);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "There was a problem fetching your projects.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    if (isDemo) {
      toast({
        title: "Demo Mode",
        description: "Sign in to edit projects.",
        variant: "default"
      });
      return;
    }
    
    setEditProject(project);
    setFormTitle(project.title);
    setFormDescription(project.description || "");
  };

  const handleUpdateProject = async () => {
    if (!editProject) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('projects')
        .update({
          title: formTitle,
          description: formDescription
        })
        .eq('id', editProject.id);
        
      if (error) throw error;
      
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully."
      });
      
      setEditProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "There was a problem updating your project.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteProject = async () => {
    if (!deleteProjectId) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', deleteProjectId);
        
      if (error) throw error;
      
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully."
      });
      
      setDeleteProjectId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting your project.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const continuePlanning = (projectId: string) => {
    if (isDemo) {
      toast({
        title: "Demo Mode",
        description: "Sign in to continue planning.",
        variant: "default"
      });
      return;
    }
    navigate(`/new-project?projectId=${projectId}`);
  };

  const viewProjectDetails = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    fetchProjects();
  }, [user, isDemo]);

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
                  You're viewing sample projects in demo mode. 
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

          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
                My Projects
              </h1>
              <p className="mt-2 text-lg text-siso-text/80">
                Manage and track all your app development projects
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                onClick={handleCreateNewProject}
                className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </motion.div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-siso-orange" />
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center p-12 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
            >
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">No Projects Yet</h3>
                <p className="mb-6 text-siso-text/70">
                  Start your app development journey by creating your first project. We'll guide you through the process step by step.
                </p>
                <Button 
                  onClick={handleCreateNewProject}
                  className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="h-full flex flex-col border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle 
                            className="text-xl font-bold hover:text-siso-orange transition-colors cursor-pointer"
                            onClick={() => viewProjectDetails(project.id)}
                          >
                            {project.title}
                          </CardTitle>
                          <CardDescription className="mt-1 text-siso-text/70">
                            Created: {format(new Date(project.created_at), 'MMM d, yyyy')}
                          </CardDescription>
                        </div>
                        <Badge variant={project.status === 'active' ? 'default' : 'outline'}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-siso-text line-clamp-3">{project.description}</p>
                      
                      {project.details && (
                        <div className="mt-4 space-y-2">
                          {project.details.business_context?.industry && (
                            <Badge variant="outline" className="mr-2">
                              {project.details.business_context.industry}
                            </Badge>
                          )}
                          {project.details.business_context?.companyName && (
                            <Badge variant="outline" className="mr-2">
                              {project.details.business_context.companyName}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between pt-4 border-t border-siso-border/20">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditProject(project)}
                          className="text-xs h-8"
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => isDemo ? toast({
                            title: "Demo Mode",
                            description: "Sign in to delete projects.",
                            variant: "default"
                          }) : setDeleteProjectId(project.id)}
                          className="text-xs h-8 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewProjectDetails(project.id)}
                          className="text-xs h-8"
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => continuePlanning(project.id)}
                          className="text-xs h-8 bg-gradient-to-r from-siso-red to-siso-orange"
                        >
                          <MessageCircle className="mr-1 h-3 w-3" />
                          Continue
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Project Dialog */}
      <Dialog open={!!editProject} onOpenChange={(open) => !open && setEditProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update your project information.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Project Title</label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter project title"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Enter project description"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleUpdateProject}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-siso-red to-siso-orange"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Project Confirmation Dialog */}
      <Dialog open={!!deleteProjectId} onOpenChange={(open) => !open && setDeleteProjectId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this project?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive"
              onClick={handleDeleteProject}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
