
import React, { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, Filter, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

// Task type definition
type TaskStatus = 'pending' | 'in-progress' | 'completed';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
  assignedTo?: string;
  project?: string;
  tags?: string[];
};

// Sample data for tasks
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project wireframes',
    description: 'Finish the initial wireframes for client approval',
    dueDate: '2023-12-15',
    priority: 'high',
    status: 'pending',
    project: 'Website Redesign',
    tags: ['design', 'client']
  },
  {
    id: '2',
    title: 'Review content strategy',
    description: 'Go through the content plan and provide feedback',
    dueDate: '2023-12-18',
    priority: 'medium',
    status: 'in-progress',
    project: 'Marketing Campaign',
    tags: ['content', 'strategy']
  },
  {
    id: '3',
    title: 'Update user documentation',
    description: 'Update the user guide with new features',
    dueDate: '2023-12-20',
    priority: 'low',
    status: 'completed',
    project: 'Product Update',
    tags: ['documentation']
  },
  {
    id: '4',
    title: 'Prepare presentation for stakeholders',
    description: 'Create slides for the quarterly review',
    dueDate: '2023-12-22',
    priority: 'high',
    status: 'pending',
    project: 'Quarterly Review',
    tags: ['presentation', 'management']
  },
  {
    id: '5',
    title: 'Fix navigation bug',
    description: 'Address the issue with mobile navigation menu',
    dueDate: '2023-12-14',
    priority: 'high',
    status: 'in-progress',
    project: 'Bug Fixes',
    tags: ['bug', 'mobile']
  }
];

// Task Card Component
const TaskCard = ({ task }: { task: Task }) => {
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-100">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-sm text-slate-300/80 mb-3">{task.description}</p>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="text-xs bg-black/30 px-2 py-1 rounded-md text-slate-300/70">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
        {task.project && (
          <div className="text-xs bg-siso-orange/10 text-siso-orange px-2 py-1 rounded-md">
            {task.project}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {task.tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300/60">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          {statusIcons[task.status]}
          <span className="text-xs capitalize">{task.status.replace('-', ' ')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter tasks based on search query and active tab
  const filteredTasks = sampleTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && task.status === 'pending';
    if (activeTab === 'in-progress') return matchesSearch && task.status === 'in-progress';
    if (activeTab === 'completed') return matchesSearch && task.status === 'completed';
    
    return matchesSearch;
  });

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
          
          {/* Tabs for filtering tasks by status */}
          <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/30 border border-slate-800/50 p-1">
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
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center">
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
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-semibold mb-2">No pending tasks</h3>
                      <p className="text-muted-foreground">All caught up! Create new tasks if needed.</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-semibold mb-2">No in-progress tasks</h3>
                      <p className="text-muted-foreground">Start working on some tasks to see them here.</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="col-span-3 py-16 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 rounded-xl border border-slate-800/60 bg-black/20 backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-semibold mb-2">No completed tasks</h3>
                      <p className="text-muted-foreground">Complete some tasks to see them here.</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
