import { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  project?: string;
  tags?: string[];
};

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
      className="p-4 rounded-xl border border-siso-border bg-black/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-siso-text-bold">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-sm text-siso-text/80 mb-3">{task.description}</p>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="text-xs bg-black/30 px-2 py-1 rounded-md text-siso-text/70">
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
            <span key={index} className="text-xs bg-siso-bg px-2 py-0.5 rounded-full text-siso-text/60">
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

export default function PendingTasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
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
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.05)"
            backgroundColor="transparent"
            waveSpeedX={0.01}
            waveSpeedY={0.005}
            waveAmpX={18}
            waveAmpY={10}
            friction={0.975}
            tension={0.006}
            maxCursorMove={80}
            xGap={50}
            yGap={80}
          />
        </div>
        
        <div className="relative z-10 container px-4 py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Pending Tasks
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl">
              Track and manage your tasks across different projects. Stay organized and meet your deadlines.
            </p>
          </motion.div>
          
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-siso-orange/20">
            <div className="relative flex-1 max-w-md w-full">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="pl-10 bg-black/30 border-siso-orange/20 w-full"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-siso-text/50" />
            </div>
            
            <Button variant="outline" className="text-siso-orange border-siso-orange/30 bg-black/30">
              New Task
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/30 border border-siso-border p-1">
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
          </Tabs>
          
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
                  className="p-8 rounded-xl border border-siso-orange/20 bg-black/20 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-siso-text-bold mb-2">No tasks found</h3>
                  <p className="text-siso-text/80">Try adjusting your search criteria or create a new task.</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
