
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, MessageCircle, Calendar, Loader2 } from 'lucide-react';
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

export default function Projects() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  const handleCreateNewProject = () => {
    navigate('/plan-builder');
  };

  const fetchProjects = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: projectsData, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Fetch project details for each project
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
    navigate(`/new-project?projectId=${projectId}`);
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

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
          ) : !user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center p-12 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
            >
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold">Sign In to View Projects</h3>
                <p className="mb-6 text-siso-text/70">
                  Please sign in to view and manage your projects. Creating an account allows you to save your work and access it from anywhere.
                </p>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
                  Sign In
                </Button>
              </div>
            </motion.div>
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
                          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
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
                          onClick={() => setDeleteProjectId(project.id)}
                          className="text-xs h-8 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => continuePlanning(project.id)}
                        className="text-xs h-8 bg-gradient-to-r from-siso-red to-siso-orange"
                      >
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Continue
                      </Button>
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
