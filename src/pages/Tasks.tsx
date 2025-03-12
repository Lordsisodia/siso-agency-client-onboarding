
import React, { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Filter, 
  Plus, 
  Gavel, 
  Bell, 
  FileText, 
  ClipboardList,
  Calendar as CalendarIcon,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// Enhanced Task type definition with categories
type TaskStatus = 'pending' | 'in-progress' | 'completed';
type TaskCategory = 'court-action' | 'cta-action' | 'documentation' | 'general';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
  category: TaskCategory;
  completedDate?: string;
  dependsOn?: string[];
  assignedTo?: string;
  project?: string;
  tags?: string[];
};

// Sample data for tasks - now with chronological ordering and categories
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'File initial court documents',
    description: 'Submit the necessary paperwork to initiate legal proceedings',
    dueDate: '2023-12-15',
    priority: 'high',
    status: 'pending',
    category: 'court-action',
    project: 'Legal Case #4587',
    tags: ['legal', 'deadline']
  },
  {
    id: '2',
    title: 'Send client engagement email',
    description: 'Contact new client with welcome package and initial steps',
    dueDate: '2023-12-16',
    priority: 'medium',
    status: 'in-progress',
    category: 'cta-action',
    project: 'Client Onboarding',
    tags: ['communication', 'onboarding']
  },
  {
    id: '3',
    title: 'Prepare case documentation',
    description: 'Organize all relevant documents for the upcoming case',
    dueDate: '2023-12-18',
    priority: 'high',
    status: 'pending',
    category: 'documentation',
    project: 'Legal Case #4587',
    dependsOn: ['1'],
    tags: ['legal', 'preparation']
  },
  {
    id: '4',
    title: 'Schedule client meeting',
    description: 'Arrange follow-up discussion with client about case progress',
    dueDate: '2023-12-20',
    priority: 'medium',
    status: 'pending',
    category: 'general',
    project: 'Client Management',
    dependsOn: ['2'],
    tags: ['meeting', 'client']
  },
  {
    id: '5',
    title: 'Court appearance preparation',
    description: 'Review case materials and prepare arguments for court',
    dueDate: '2023-12-22',
    priority: 'high',
    status: 'pending',
    category: 'court-action',
    project: 'Legal Case #4587',
    dependsOn: ['3'],
    tags: ['legal', 'preparation']
  },
  {
    id: '6',
    title: 'Submit case evidence',
    description: 'File all supporting evidence with the court clerk',
    dueDate: '2023-12-19',
    priority: 'high',
    status: 'pending',
    category: 'documentation',
    project: 'Legal Case #4587',
    dependsOn: ['1', '3'],
    tags: ['legal', 'evidence']
  },
  {
    id: '7',
    title: 'Send follow-up emails',
    description: 'Contact all clients with status updates',
    dueDate: '2023-12-21',
    priority: 'low',
    status: 'pending',
    category: 'cta-action',
    project: 'Client Management',
    tags: ['communication', 'follow-up']
  },
  {
    id: '8',
    title: 'Review case law precedents',
    description: 'Research similar cases for legal arguments',
    dueDate: '2023-12-17',
    priority: 'medium',
    status: 'completed',
    completedDate: '2023-12-14',
    category: 'documentation',
    project: 'Legal Research',
    tags: ['research', 'legal']
  }
];

// Helper to sort tasks chronologically by due date
const sortTasksChronologically = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

// Helper to check if a task can be completed (all dependencies completed)
const canCompleteTask = (task: Task, allTasks: Task[]): boolean => {
  if (!task.dependsOn || task.dependsOn.length === 0) return true;
  
  return task.dependsOn.every(depId => {
    const dependentTask = allTasks.find(t => t.id === depId);
    return dependentTask?.status === 'completed';
  });
};

// Category Icons and Colors
const categoryIcons = {
  'court-action': <Gavel className="w-4 h-4" />,
  'cta-action': <Bell className="w-4 h-4" />,
  'documentation': <FileText className="w-4 h-4" />,
  'general': <ClipboardList className="w-4 h-4" />
};

const categoryColors = {
  'court-action': 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  'cta-action': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  'documentation': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  'general': 'text-green-500 bg-green-500/10 border-green-500/20'
};

// Task Card Component
const TaskCard = ({ 
  task, 
  allTasks, 
  onUpdateStatus 
}: { 
  task: Task; 
  allTasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}) => {
  const priorityColors = {
    low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    high: 'bg-red-500/10 text-red-500 border-red-500/20'
  };

  const statusIcons = {
    'pending': <Clock className="w-4 h-4 text-amber-500" />,
    'in-progress': <AlertCircle className="w-4 h-4 text-blue-500" />,
    'completed': <CheckCircle className="w-4 h-4 text-green-500" />
  };

  const isCompletable = canCompleteTask(task, allTasks);
  const categoryColor = categoryColors[task.category];

  // Format the due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return format(date, 'MMM d, yyyy');
  };

  const handleStatusChange = () => {
    if (task.status === 'completed') return;
    
    if (task.status === 'pending' && isCompletable) {
      onUpdateStatus(task.id, 'in-progress');
    } else if (task.status === 'in-progress') {
      onUpdateStatus(task.id, 'completed');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-xl border ${task.status === 'completed' ? 'border-green-500/30 bg-green-500/5' : 'border-slate-800/60 bg-black/20'} backdrop-blur-sm shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${categoryColor}`}>
            {categoryIcons[task.category]}
          </span>
          <h3 className={`font-semibold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-100'}`}>{task.title}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className={`text-sm text-slate-300/80 mb-3 ml-10 ${task.status === 'completed' ? 'text-slate-500/80 line-through' : ''}`}>{task.description}</p>
      
      <div className="flex items-center gap-2 mb-3 ml-10">
        <div className="flex items-center text-xs bg-black/30 px-2 py-1 rounded-md text-slate-300/70">
          <CalendarIcon className="w-3 h-3 mr-1" />
          {formatDueDate(task.dueDate)}
        </div>
        {task.project && (
          <div className="text-xs bg-siso-orange/10 text-siso-orange px-2 py-1 rounded-md">
            {task.project}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center ml-10">
        <div className="flex gap-1">
          {task.tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300/60">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 ${!isCompletable && task.status !== 'completed' ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleStatusChange}
            disabled={!isCompletable && task.status !== 'completed'}
          >
            {statusIcons[task.status]}
            <span className="text-xs capitalize ml-1">{task.status.replace('-', ' ')}</span>
          </Button>
        </div>
      </div>
      
      {task.dependsOn && task.dependsOn.length > 0 && (
        <div className="mt-3 pt-2 border-t border-slate-800/50 text-xs text-slate-400 ml-10">
          <div className="flex items-center">
            <span>Dependencies: </span>
            <div className="flex gap-1 ml-1">
              {task.dependsOn.map((depId) => {
                const depTask = allTasks.find(t => t.id === depId);
                return (
                  <Badge 
                    key={depId} 
                    variant="outline" 
                    className={`text-xs ${depTask?.status === 'completed' ? 'line-through text-green-500' : 'text-amber-500'}`}
                  >
                    {depTask?.title.substring(0, 20)}
                    {depTask?.title.length > 20 ? '...' : ''}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Timeline Component for chronological display
const TaskTimeline = ({ 
  tasks, 
  onUpdateStatus 
}: { 
  tasks: Task[]; 
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void; 
}) => {
  const chronologicalTasks = sortTasksChronologically(tasks);
  
  // Calculate overall progress
  const totalTasks = chronologicalTasks.length;
  const completedTasks = chronologicalTasks.filter(task => task.status === 'completed').length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <div className="space-y-2">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Overall Progress</h3>
          <span className="text-sm">{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-slate-800/50" 
          indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange" 
        />
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800/70" />
        
        {chronologicalTasks.map((task, index) => (
          <div key={task.id} className="mb-4 relative">
            {/* Timeline node */}
            <div className={`absolute left-4 top-6 w-3 h-3 rounded-full transform -translate-x-1.5 z-10 
              ${task.status === 'completed' 
                ? 'bg-green-500' 
                : task.status === 'in-progress' 
                  ? 'bg-blue-500' 
                  : 'bg-slate-700'}`} 
            />
            
            {/* Timeline connector line to next task */}
            {index < chronologicalTasks.length - 1 && (
              <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-slate-800/70 transform -translate-x-1/2" />
            )}
            
            {/* Task content */}
            <div className="pl-10 pr-4">
              <div className="text-xs text-slate-400 mb-1">
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </div>
              <TaskCard task={task} allTasks={chronologicalTasks} onUpdateStatus={onUpdateStatus} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState(sampleTasks);
  
  // Filter tasks based on search query and active tab
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && task.status === 'pending';
    if (activeTab === 'in-progress') return matchesSearch && task.status === 'in-progress';
    if (activeTab === 'completed') return matchesSearch && task.status === 'completed';
    if (activeTab === 'court-action') return matchesSearch && task.category === 'court-action';
    if (activeTab === 'cta-action') return matchesSearch && task.category === 'cta-action';
    if (activeTab === 'documentation') return matchesSearch && task.category === 'documentation';
    if (activeTab === 'general') return matchesSearch && task.category === 'general';
    
    return matchesSearch;
  });

  // Handle task status updates
  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus,
              completedDate: newStatus === 'completed' ? new Date().toISOString() : task.completedDate
            } 
          : task
      )
    );
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="relative z-10 container px-4 py-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Tasks</h1>
            <p className="mt-2 text-muted-foreground">
              Track and manage your tasks across different projects. Stay organized and meet your deadlines.
            </p>
          </motion.div>
          
          {/* Search & Filter */}
          <Card className="mb-8 bg-black/20 backdrop-blur-sm border-slate-800/60">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="pl-10 bg-black/30 border-slate-700/50 w-full"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <Button className="bg-siso-orange hover:bg-siso-orange/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </CardContent>
          </Card>
          
          {/* Tabs for filtering tasks by status and category */}
          <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/30 border border-slate-800/50 p-1 flex flex-wrap">
              <TabsTrigger value="all" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                All Tasks
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500">
                Pending
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500">
                In Progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
                Completed
              </TabsTrigger>
              <TabsTrigger value="court-action" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500">
                <Gavel className="h-4 w-4 mr-1" /> Court
              </TabsTrigger>
              <TabsTrigger value="cta-action" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500">
                <Bell className="h-4 w-4 mr-1" /> CTA
              </TabsTrigger>
              <TabsTrigger value="documentation" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500">
                <FileText className="h-4 w-4 mr-1" /> Docs
              </TabsTrigger>
              <TabsTrigger value="general" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
                <ClipboardList className="h-4 w-4 mr-1" /> General
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {filteredTasks.length > 0 ? (
                <TaskTimeline tasks={filteredTasks} onUpdateStatus={handleUpdateTaskStatus} />
              ) : (
                <div className="py-16 text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria or create a new task.</p>
                  </motion.div>
                </div>
              )}
            </TabsContent>
            
            {/* The following TabsContent elements all use the same TaskTimeline component */}
            {['pending', 'in-progress', 'completed', 'court-action', 'cta-action', 'documentation', 'general'].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-6">
                {filteredTasks.length > 0 ? (
                  <TaskTimeline tasks={filteredTasks} onUpdateStatus={handleUpdateTaskStatus} />
                ) : (
                  <div className="py-16 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-semibold mb-2">No {tabValue.replace('-', ' ')} tasks</h3>
                      <p className="text-muted-foreground">
                        {tabValue === 'completed' 
                          ? 'You haven\'t completed any tasks yet.' 
                          : `You don't have any ${tabValue.replace('-', ' ')} tasks. Create one to get started.`}
                      </p>
                    </motion.div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
