
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { AlertCircle, Plus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

// Define the Task interface based on the database schema
interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  project_id?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// Mock data for demo mode
const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Planning',
    description: 'Define project scope, goals, and requirements',
    status: 'completed',
    priority: 'high',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    due_date: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  },
  {
    id: '2',
    title: 'Create Initial Wireframes',
    description: 'Design the basic layout and user flow',
    status: 'completed',
    priority: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    due_date: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  },
  {
    id: '3',
    title: 'Develop Frontend Components',
    description: 'Implement React components based on the design',
    status: 'in_progress',
    priority: 'high',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    due_date: format(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  },
  {
    id: '4',
    title: 'Set Up Backend API',
    description: 'Create the necessary API endpoints',
    status: 'pending',
    priority: 'high',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    due_date: format(new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  },
  {
    id: '5',
    title: 'Testing and Bug Fixes',
    description: 'Test the application and fix any bugs',
    status: 'pending',
    priority: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    due_date: format(new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  },
  {
    id: '6',
    title: 'Prepare for Deployment',
    description: 'Finalize documentation and prepare for production',
    status: 'pending',
    priority: 'low',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    due_date: format(new Date(Date.now() + 42 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  },
];

const TasksPage: React.FC = () => {
  const { toast } = useToast();
  const { user, isDemo } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending' as Task['status'],
    priority: 'medium' as Task['priority'],
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from Supabase
  useEffect(() => {
    if (isDemo) {
      setTasks(demoTasks);
      setIsLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Make sure to set default priority if it's missing from the database
        const tasksWithPriority: Task[] = (data || []).map(task => ({
          ...task,
          priority: task.priority || 'medium'
        })) as Task[];

        setTasks(tasksWithPriority);
      } catch (err: any) {
        console.error('Error fetching tasks:', err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [isDemo]);

  // Create a new task
  const createTask = async () => {
    if (!newTask.title) {
      toast({
        title: 'Error',
        description: 'Task title is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      const taskToCreate = {
        title: newTask.title,
        description: newTask.description,
        due_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined,
        status: newTask.status,
        priority: newTask.priority,
        user_id: user?.id,
      };

      if (isDemo) {
        const mockTask: Task = {
          ...taskToCreate,
          id: `demo-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Task;
        
        setTasks((prev) => [mockTask, ...prev]);
        toast({ title: 'Success', description: 'Task created successfully' });
        setIsCreateDialogOpen(false);
        resetNewTask();
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert([taskToCreate])
        .select();

      if (error) throw error;

      // Add the priority field explicitly to make TypeScript happy
      const newTasks = (data || []).map(task => ({
        ...task,
        priority: task.priority || newTask.priority
      })) as Task[];

      setTasks((prev) => [...newTasks, ...prev]);
      toast({ title: 'Success', description: 'Task created successfully' });
      setIsCreateDialogOpen(false);
      resetNewTask();
    } catch (err: any) {
      console.error('Error creating task:', err.message);
      toast({
        title: 'Error',
        description: `Failed to create task: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  // Update a task
  const updateTask = async () => {
    if (!selectedTask) return;

    try {
      const taskToUpdate = {
        title: selectedTask.title,
        description: selectedTask.description,
        due_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : selectedTask.due_date,
        status: selectedTask.status,
        priority: selectedTask.priority,
      };

      if (isDemo) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === selectedTask.id ? { ...task, ...taskToUpdate, updated_at: new Date().toISOString() } : task
          )
        );
        toast({ title: 'Success', description: 'Task updated successfully' });
        setIsEditDialogOpen(false);
        return;
      }

      const { error } = await supabase
        .from('tasks')
        .update(taskToUpdate)
        .eq('id', selectedTask.id);

      if (error) throw error;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id ? { ...task, ...taskToUpdate, updated_at: new Date().toISOString() } : task
        )
      );
      toast({ title: 'Success', description: 'Task updated successfully' });
      setIsEditDialogOpen(false);
    } catch (err: any) {
      console.error('Error updating task:', err.message);
      toast({
        title: 'Error',
        description: `Failed to update task: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      if (isDemo) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        toast({ title: 'Success', description: 'Task deleted successfully' });
        setIsEditDialogOpen(false);
        return;
      }

      const { error } = await supabase.from('tasks').delete().eq('id', id);

      if (error) throw error;

      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({ title: 'Success', description: 'Task deleted successfully' });
      setIsEditDialogOpen(false);
    } catch (err: any) {
      console.error('Error deleting task:', err.message);
      toast({
        title: 'Error',
        description: `Failed to delete task: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  // Reset the new task form
  const resetNewTask = () => {
    setNewTask({
      title: '',
      description: '',
      due_date: '',
      status: 'pending',
      priority: 'medium',
    });
    setSelectedDate(undefined);
  };

  // Open the edit dialog with the selected task
  const openEditDialog = (task: Task) => {
    setSelectedTask(task);
    setSelectedDate(task.due_date ? new Date(task.due_date) : undefined);
    setIsEditDialogOpen(true);
  };

  // Group tasks by status for kanban view
  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  // Convert database status to display name
  const getStatusDisplayName = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'To Do';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  // Get color based on priority
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* To Do Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold pb-2 border-b">{getStatusDisplayName('pending')} ({getTasksByStatus('pending').length})</h2>
          {getTasksByStatus('pending').map((task) => (
            <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openEditDialog(task)}>
              <h3 className="font-medium">{task.title}</h3>
              {task.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{task.description}</p>}
              <div className="flex justify-between mt-4">
                <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                {task.due_date && <span className="text-xs text-gray-500">{task.due_date}</span>}
              </div>
            </Card>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold pb-2 border-b">{getStatusDisplayName('in_progress')} ({getTasksByStatus('in_progress').length})</h2>
          {getTasksByStatus('in_progress').map((task) => (
            <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openEditDialog(task)}>
              <h3 className="font-medium">{task.title}</h3>
              {task.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{task.description}</p>}
              <div className="flex justify-between mt-4">
                <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                {task.due_date && <span className="text-xs text-gray-500">{task.due_date}</span>}
              </div>
            </Card>
          ))}
        </div>

        {/* Completed Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold pb-2 border-b">{getStatusDisplayName('completed')} ({getTasksByStatus('completed').length})</h2>
          {getTasksByStatus('completed').map((task) => (
            <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openEditDialog(task)}>
              <h3 className="font-medium">{task.title}</h3>
              {task.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{task.description}</p>}
              <div className="flex justify-between mt-4">
                <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                {task.due_date && <span className="text-xs text-gray-500">{task.due_date}</span>}
              </div>
            </Card>
          ))}
        </div>

        {/* Failed Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold pb-2 border-b">{getStatusDisplayName('failed')} ({getTasksByStatus('failed').length})</h2>
          {getTasksByStatus('failed').map((task) => (
            <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openEditDialog(task)}>
              <h3 className="font-medium">{task.title}</h3>
              {task.description && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{task.description}</p>}
              <div className="flex justify-between mt-4">
                <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                {task.due_date && <span className="text-xs text-gray-500">{task.due_date}</span>}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Task Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newTask.status}
                onValueChange={(value: Task['status']) => setNewTask({ ...newTask, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
              >
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedTask.description || ''}
                  onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedTask.status}
                  onValueChange={(value: Task['status']) => setSelectedTask({ ...selectedTask, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={selectedTask.priority}
                  onValueChange={(value: Task['priority']) => setSelectedTask({ ...selectedTask, priority: value })}
                >
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
          )}
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="destructive" onClick={() => selectedTask && deleteTask(selectedTask.id)}>
                Delete
              </Button>
              <div>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="mr-2">
                  Cancel
                </Button>
                <Button onClick={updateTask}>Save Changes</Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksPage;
