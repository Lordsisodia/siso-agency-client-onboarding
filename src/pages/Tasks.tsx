
import React, { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Filter, Plus, Package, CheckSquare, Rocket, Code, Flag, Star } from 'lucide-react';
import { TaskLifecycle } from '@/components/tasks/TaskLifecycle';
import { TaskTimeline } from '@/components/tasks/TaskTimeline';
import { Task, TaskStatus } from '@/types/task';
import { sortTasksByFavorites } from '@/utils/taskUtils';
import { projectLifecycleTasks, sampleTasks } from '@/data/taskData';

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([...projectLifecycleTasks, ...sampleTasks]);
  const [sortByFavorites, setSortByFavorites] = useState(false);
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'favorites') return matchesSearch && task.favorite === true;
    if (activeTab === 'pending') return matchesSearch && task.status === 'pending';
    if (activeTab === 'in-progress') return matchesSearch && task.status === 'in-progress';
    if (activeTab === 'completed') return matchesSearch && task.status === 'completed';
    if (activeTab === 'setup') return matchesSearch && task.phase === 'setup';
    if (activeTab === 'review') return matchesSearch && task.phase === 'review';
    if (activeTab === 'initiation') return matchesSearch && task.phase === 'initiation';
    if (activeTab === 'development') return matchesSearch && task.phase === 'development';
    if (activeTab === 'completion') return matchesSearch && task.phase === 'completion';
    
    return matchesSearch;
  });

  const sortedTasks = sortByFavorites 
    ? sortTasksByFavorites(filteredTasks) 
    : filteredTasks;

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

  const handleToggleFavorite = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              favorite: !task.favorite
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
            <h1 className="text-3xl md:text-4xl font-bold">Project Lifecycle Tasks</h1>
            <p className="mt-2 text-muted-foreground">
              Track your project progress through each phase of the lifecycle. Complete tasks sequentially to move your project forward.
            </p>
          </motion.div>
          
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
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  className={`${sortByFavorites ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' : 'bg-black/30'}`}
                  onClick={() => setSortByFavorites(!sortByFavorites)}
                >
                  <Star className={`h-4 w-4 mr-2 ${sortByFavorites ? 'fill-amber-500' : ''}`} />
                  {sortByFavorites ? 'Favorites First' : 'Sort by Date'}
                </Button>
                
                <Button className="bg-siso-orange hover:bg-siso-orange/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/30 border border-slate-800/50 p-1 flex flex-wrap">
              <TabsTrigger value="all" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                All Tasks
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500">
                <Star className="h-4 w-4 mr-1 fill-amber-500" /> Favorites
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
              
              <TabsTrigger value="setup" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500">
                <Package className="h-4 w-4 mr-1" /> Setup
              </TabsTrigger>
              <TabsTrigger value="review" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500">
                <CheckSquare className="h-4 w-4 mr-1" /> Review
              </TabsTrigger>
              <TabsTrigger value="initiation" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-500">
                <Rocket className="h-4 w-4 mr-1" /> Initiation
              </TabsTrigger>
              <TabsTrigger value="development" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500">
                <Code className="h-4 w-4 mr-1" /> Development
              </TabsTrigger>
              <TabsTrigger value="completion" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500">
                <Flag className="h-4 w-4 mr-1" /> Completion
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {sortedTasks.length > 0 ? (
                <TaskLifecycle 
                  tasks={sortedTasks} 
                  onUpdateStatus={handleUpdateTaskStatus} 
                  onToggleFavorite={handleToggleFavorite}
                />
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
            
            {['favorites', 'pending', 'in-progress', 'completed', 'setup', 'review', 'initiation', 'development', 'completion'].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="mt-6">
                {sortedTasks.length > 0 ? (
                  <TaskLifecycle 
                    tasks={sortedTasks} 
                    onUpdateStatus={handleUpdateTaskStatus} 
                    onToggleFavorite={handleToggleFavorite}
                  />
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
                          : tabValue === 'favorites'
                          ? 'You haven\'t marked any tasks as favorites yet.'
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
