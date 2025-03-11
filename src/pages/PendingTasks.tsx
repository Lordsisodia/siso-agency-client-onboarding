
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardCheck, Clock, Calendar, AlertCircle, Filter, Plus, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

// Types for our task management
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  projectId: string;
  projectName: string;
}

const PendingTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const { toast } = useToast();

  // Simulated fetch of tasks (replace with actual API call)
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Mock data for demonstration
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Complete project wireframes',
          description: 'Finalize all wireframes for client approval',
          dueDate: '2023-12-15',
          priority: 'high',
          status: 'todo',
          projectId: 'proj-1',
          projectName: 'E-commerce Redesign'
        },
        {
          id: '2',
          title: 'Review API documentation',
          description: 'Go through the latest API docs to understand endpoints',
          dueDate: '2023-12-10',
          priority: 'medium',
          status: 'in-progress',
          projectId: 'proj-2',
          projectName: 'Mobile App Integration'
        },
        {
          id: '3',
          title: 'Set up CI/CD pipeline',
          description: 'Configure Jenkins for automated testing and deployment',
          dueDate: '2023-12-20',
          priority: 'high',
          status: 'todo',
          projectId: 'proj-3',
          projectName: 'DevOps Upgrade'
        },
        {
          id: '4',
          title: 'Write user documentation',
          description: 'Create end-user documentation for the new features',
          dueDate: '2023-12-18',
          priority: 'low',
          status: 'todo',
          projectId: 'proj-1',
          projectName: 'E-commerce Redesign'
        },
        {
          id: '5',
          title: 'Perform usability testing',
          description: 'Conduct user testing with the prototype',
          dueDate: '2023-12-12',
          priority: 'medium',
          status: 'in-progress',
          projectId: 'proj-2',
          projectName: 'Mobile App Integration'
        },
      ];
      
      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply filters when search query or filters change
  useEffect(() => {
    let result = tasks;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    setFilteredTasks(result);
  }, [searchQuery, statusFilter, priorityFilter, tasks]);

  // Handle task status change
  const handleStatusChange = (taskId: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: completed ? 'completed' : 'todo' } 
          : task
      )
    );
    
    toast({
      title: completed ? "Task completed" : "Task marked as pending",
      description: `The task has been ${completed ? 'completed' : 'marked as pending'}.`,
      variant: completed ? "default" : "destructive",
    });
  };

  // Get the priority badge color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-500 hover:bg-red-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate if a task is overdue
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-siso-bg to-siso-bg/95">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <Helmet>
          <title>Pending Tasks - SISO</title>
          <meta name="description" content="Manage your pending tasks and project to-dos" />
        </Helmet>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <GradientHeading size="lg" variant="sunset" className="mb-2">
                Pending Tasks
              </GradientHeading>
              <p className="text-siso-text/80">
                Track and manage all your pending tasks across different projects
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add New Task</span>
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="p-4 border-siso-border bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-siso-text/50" size={18} />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-siso-text/70" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Tasks List */}
          <div className="space-y-4">
            {isLoading ? (
              // Loading state
              Array(5).fill(0).map((_, index) => (
                <Card key={index} className="p-4 border-siso-border bg-black/20 backdrop-blur-sm">
                  <div className="animate-pulse flex flex-col gap-2">
                    <div className="h-6 bg-siso-bg-alt/50 rounded w-1/4"></div>
                    <div className="h-4 bg-siso-bg-alt/30 rounded w-3/4"></div>
                    <div className="flex gap-2 mt-2">
                      <div className="h-6 bg-siso-bg-alt/30 rounded w-20"></div>
                      <div className="h-6 bg-siso-bg-alt/30 rounded w-24"></div>
                    </div>
                  </div>
                </Card>
              ))
            ) : filteredTasks.length === 0 ? (
              // Empty state
              <Card className="p-8 border-siso-border bg-black/20 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <ClipboardCheck size={48} className="text-siso-text/30" />
                  <h3 className="text-xl font-semibold text-siso-text">No tasks found</h3>
                  <p className="text-siso-text/70 max-w-md">
                    {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                      ? "No tasks match your current filters. Try adjusting them or create a new task."
                      : "You don't have any pending tasks. Start by creating a new task."}
                  </p>
                  <Button className="mt-2">
                    <Plus size={16} className="mr-2" />
                    Add New Task
                  </Button>
                </div>
              </Card>
            ) : (
              // Tasks list
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`p-4 border-l-4 ${task.status === 'completed' ? 'border-l-green-500 bg-green-500/5' : isOverdue(task.dueDate) ? 'border-l-red-500 bg-red-500/5' : 'border-l-siso-orange bg-siso-orange/5'} border-t-siso-border border-r-siso-border border-b-siso-border backdrop-blur-sm`}>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.status === 'completed'}
                        onCheckedChange={(checked) => handleStatusChange(task.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                          <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-siso-text/50' : 'text-siso-text-bold'}`}>
                            {task.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-white`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            {task.status === 'in-progress' && (
                              <Badge variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
                                In Progress
                              </Badge>
                            )}
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(task.dueDate)}
                              {isOverdue(task.dueDate) && task.status !== 'completed' && (
                                <span className="ml-1 text-red-500">Overdue</span>
                              )}
                            </Badge>
                          </div>
                        </div>
                        <p className={`mt-1 text-sm ${task.status === 'completed' ? 'text-siso-text/50' : 'text-siso-text/70'}`}>
                          {task.description}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <span className="text-xs text-siso-text/60 flex items-center gap-1">
                            <FolderKanban size={14} />
                            {task.projectName}
                          </span>
                          {task.status === 'in-progress' && (
                            <span className="text-xs text-siso-text/60 flex items-center gap-1">
                              <Clock size={14} />
                              In progress
                            </span>
                          )}
                          {isOverdue(task.dueDate) && task.status !== 'completed' && (
                            <span className="text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle size={14} />
                              Overdue by {Math.floor((new Date().getTime() - new Date(task.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Task Summary */}
          {!isLoading && filteredTasks.length > 0 && (
            <Card className="p-4 border-siso-border bg-black/20 backdrop-blur-sm">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <p className="text-sm text-siso-text/70">
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-siso-text/70">
                      {tasks.filter(task => task.priority === 'high').length} High Priority
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-siso-text/70">
                      {tasks.filter(task => task.status === 'completed').length} Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-siso-text/70">
                      {tasks.filter(task => isOverdue(task.dueDate) && task.status !== 'completed').length} Overdue
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
