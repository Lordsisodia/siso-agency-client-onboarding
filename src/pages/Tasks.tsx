
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ArrowRight, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  project_id?: string;
  created_at: string;
}

export default function Tasks() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isDemo } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  
  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDueDate, setFormDueDate] = useState('');
  const [formStatus, setFormStatus] = useState<Task['status']>('planning');
  const [formPriority, setFormPriority] = useState<Task['priority']>('medium');
  const [formProjectId, setFormProjectId] = useState('');
  const [projects, setProjects] = useState<{id: string, title: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo tasks data
  const demoTasks: Task[] = [
    {
      id: "demo-1",
      title: "Create Project Plan",
      description: "Use the Plan Builder to create a detailed plan for your app, including features, timeline, and budget.",
      status: "planning",
      priority: "high",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-2",
      title: "Chat with AI Assistant",
      description: "Refine your project plan by chatting with our AI assistant to get recommendations and clarify requirements.",
      status: "planning",
      priority: "high",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-3",
      title: "Submit Project for Review",
      description: "Once your plan is complete, submit it for review by our development team.",
      status: "in_progress",
      priority: "medium",
      created_at: new Date().toISOString(),
    },
    {
      id: "demo-4",
      title: "Review Feedback",
      description: "Go through the feedback provided by our team and make necessary adjustments.",
      status: "in_progress",
      priority: "medium",
      created_at: new Date().toISOString(),
    },
    {
      id: "demo-5",
      title: "Finalize and Publish",
      description: "Once the AI confirms your project is ready, approve it for development.",
      status: "review",
      priority: "medium",
      created_at: new Date().toISOString(),
    },
    {
      id: "demo-6",
      title: "Make Initial Payment",
      description: "Pay the initial deposit via Stripe to begin development.",
      status: "review",
      priority: "high",
      created_at: new Date().toISOString(),
    },
    {
      id: "demo-7",
      title: "Schedule Onboarding Call",
      description: "Set up an onboarding call to discuss implementation details and timeline.",
      status: "completed",
      priority: "low",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, [user, isDemo]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      
      if (isDemo) {
        // Use demo data if in demo mode
        setTasks(demoTasks);
        setLoading(false);
        return;
      }
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description: "Failed to load tasks. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    if (isDemo || !user) return;
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title')
        .eq('user_id', user.id);

      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateTask = async () => {
    if (isDemo) {
      toast({
        title: "Demo Mode",
        description: "Sign in to create tasks.",
        variant: "default"
      });
      navigate('/auth');
      return;
    }

    if (!formTitle.trim()) {
      toast({
        title: "Error",
        description: "Task title is required.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const newTask = {
        title: formTitle,
        description: formDescription,
        due_date: formDueDate || null,
        status: formStatus,
        priority: formPriority,
        project_id: formProjectId || null,
        user_id: user?.id
      };
      
      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select();
        
      if (error) throw error;
      
      setTasks(prev => [data[0], ...prev]);
      
      toast({
        title: "Success",
        description: "Task created successfully.",
        variant: "default"
      });
      
      // Reset form
      setFormTitle('');
      setFormDescription('');
      setFormDueDate('');
      setFormStatus('planning');
      setFormPriority('medium');
      setFormProjectId('');
      setNewTaskOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async () => {
    if (isDemo) {
      toast({
        title: "Demo Mode",
        description: "Sign in to edit tasks.",
        variant: "default"
      });
      return;
    }

    if (!currentTask) return;

    try {
      setIsSubmitting(true);
      
      const updatedTask = {
        title: formTitle,
        description: formDescription,
        due_date: formDueDate || null,
        status: formStatus,
        priority: formPriority,
        project_id: formProjectId || null
      };
      
      const { error } = await supabase
        .from('tasks')
        .update(updatedTask)
        .eq('id', currentTask.id);
        
      if (error) throw error;
      
      // Update tasks state
      setTasks(prev => prev.map(task => 
        task.id === currentTask.id ? {...task, ...updatedTask} : task
      ));
      
      toast({
        title: "Success",
        description: "Task updated successfully.",
        variant: "default"
      });
      
      setEditTaskOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (isDemo) {
      toast({
        title: "Demo Mode",
        description: "Sign in to delete tasks.",
        variant: "default"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
        
      if (error) throw error;
      
      // Update tasks state
      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      toast({
        title: "Success",
        description: "Task deleted successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateStatus = async (taskId: string, newStatus: Task['status']) => {
    if (isDemo) {
      // For demo, just update the UI
      setTasks(prev => prev.map(task => 
        task.id === taskId ? {...task, status: newStatus} : task
      ));
      return;
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);
        
      if (error) throw error;
      
      // Update tasks state
      setTasks(prev => prev.map(task => 
        task.id === taskId ? {...task, status: newStatus} : task
      ));
      
      toast({
        title: "Success",
        description: "Task status updated.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive"
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setFormTitle(task.title);
    setFormDescription(task.description || '');
    setFormDueDate(task.due_date || '');
    setFormStatus(task.status);
    setFormPriority(task.priority);
    setFormProjectId(task.project_id || '');
    setEditTaskOpen(true);
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'planning': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'in_progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'review': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'planning': return <Clock className="h-4 w-4 text-blue-400" />;
      case 'in_progress': return <Loader2 className="h-4 w-4 text-amber-400" />;
      case 'review': return <AlertCircle className="h-4 w-4 text-purple-400" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return null;
    }
  };

  const getStatusDisplay = (status: Task['status']) => {
    switch (status) {
      case 'planning': return 'Planning';
      case 'in_progress': return 'In Progress';
      case 'review': return 'Review';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const renderTaskCard = (task: Task) => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <Card className="border border-siso-border/30 bg-siso-bg-card/50 hover:bg-siso-bg-card/70 transition-colors cursor-pointer"
        onClick={() => handleEditTask(task)}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-sm flex items-center gap-2 group-hover:text-white">
              {task.title}
            </h3>
            <div className="flex gap-2">
              <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                {getStatusIcon(task.status)}
                <span className="ml-1">{getStatusDisplay(task.status)}</span>
              </Badge>
              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
            </div>
          </div>
          
          {task.description && (
            <p className="text-xs text-siso-text-muted mt-1 line-clamp-2">{task.description}</p>
          )}
          
          {task.due_date && (
            <div className="text-xs text-siso-text-muted mt-2 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Due: {new Date(task.due_date).toLocaleDateString()}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.1)"
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
        
        <div className="relative z-10 container px-4 py-8 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
                Tasks
              </h1>
              <p className="mt-2 text-lg text-siso-text/80">
                Manage your project tasks and track progress
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                onClick={() => setNewTaskOpen(true)}
                className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </motion.div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-siso-orange" />
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="planning">Planning</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Planning Column */}
                  <div>
                    <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-blue-400" />
                          Planning
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {tasks.filter(task => task.status === 'planning').length === 0 ? (
                          <p className="text-sm text-siso-text-muted text-center py-4">No tasks in planning</p>
                        ) : (
                          tasks.filter(task => task.status === 'planning').map(renderTaskCard)
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* In Progress Column */}
                  <div>
                    <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 text-amber-400" />
                          In Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {tasks.filter(task => task.status === 'in_progress').length === 0 ? (
                          <p className="text-sm text-siso-text-muted text-center py-4">No tasks in progress</p>
                        ) : (
                          tasks.filter(task => task.status === 'in_progress').map(renderTaskCard)
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Review Column */}
                  <div>
                    <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <AlertCircle className="mr-2 h-4 w-4 text-purple-400" />
                          Review
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {tasks.filter(task => task.status === 'review').length === 0 ? (
                          <p className="text-sm text-siso-text-muted text-center py-4">No tasks in review</p>
                        ) : (
                          tasks.filter(task => task.status === 'review').map(renderTaskCard)
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Completed Column */}
                  <div>
                    <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                          Completed
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {tasks.filter(task => task.status === 'completed').length === 0 ? (
                          <p className="text-sm text-siso-text-muted text-center py-4">No completed tasks</p>
                        ) : (
                          tasks.filter(task => task.status === 'completed').map(renderTaskCard)
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="planning">
                <div className="max-w-2xl mx-auto">
                  <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-blue-400" />
                        Planning
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {tasks.filter(task => task.status === 'planning').length === 0 ? (
                        <p className="text-sm text-siso-text-muted text-center py-4">No tasks in planning</p>
                      ) : (
                        tasks.filter(task => task.status === 'planning').map(renderTaskCard)
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="in_progress">
                <div className="max-w-2xl mx-auto">
                  <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 text-amber-400" />
                        In Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {tasks.filter(task => task.status === 'in_progress').length === 0 ? (
                        <p className="text-sm text-siso-text-muted text-center py-4">No tasks in progress</p>
                      ) : (
                        tasks.filter(task => task.status === 'in_progress').map(renderTaskCard)
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="review">
                <div className="max-w-2xl mx-auto">
                  <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-purple-400" />
                        Review
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {tasks.filter(task => task.status === 'review').length === 0 ? (
                        <p className="text-sm text-siso-text-muted text-center py-4">No tasks in review</p>
                      ) : (
                        tasks.filter(task => task.status === 'review').map(renderTaskCard)
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
      
      {/* New Task Dialog */}
      <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Task Title *</label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select value={formStatus} onValueChange={(value: any) => setFormStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                <Select value={formPriority} onValueChange={(value: any) => setFormPriority(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
              <Input
                id="dueDate"
                type="date"
                value={formDueDate}
                onChange={(e) => setFormDueDate(e.target.value)}
              />
            </div>
            
            {projects.length > 0 && (
              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium">Project</label>
                <Select value={formProjectId} onValueChange={setFormProjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleCreateTask}
              disabled={isSubmitting || !formTitle.trim()}
              className="bg-gradient-to-r from-siso-red to-siso-orange"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Task Dialog */}
      <Dialog open={editTaskOpen} onOpenChange={setEditTaskOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium">Task Title *</label>
              <Input
                id="edit-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
              <Textarea
                id="edit-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                <Select value={formStatus} onValueChange={(value: any) => setFormStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-priority" className="text-sm font-medium">Priority</label>
                <Select value={formPriority} onValueChange={(value: any) => setFormPriority(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-dueDate" className="text-sm font-medium">Due Date</label>
              <Input
                id="edit-dueDate"
                type="date"
                value={formDueDate}
                onChange={(e) => setFormDueDate(e.target.value)}
              />
            </div>
            
            {projects.length > 0 && (
              <div className="space-y-2">
                <label htmlFor="edit-project" className="text-sm font-medium">Project</label>
                <Select value={formProjectId} onValueChange={setFormProjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="destructive" 
              onClick={() => {
                if (currentTask) handleDeleteTask(currentTask.id);
                setEditTaskOpen(false);
              }}
              className="hover:bg-red-600"
            >
              Delete
            </Button>
            
            <div className="flex space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleUpdateTask}
                disabled={isSubmitting || !formTitle.trim()}
                className="bg-gradient-to-r from-siso-red to-siso-orange"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
