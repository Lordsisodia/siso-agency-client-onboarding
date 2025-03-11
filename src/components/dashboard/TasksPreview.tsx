
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleDashed, AlertCircle, ArrowRight, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface TasksPreviewProps {
  pendingTasks: number;
  onViewAll: () => void;
  loading?: boolean;
}

export const TasksPreview: React.FC<TasksPreviewProps> = ({ 
  pendingTasks,
  onViewAll,
  loading = false
}) => {
  // Sample tasks data - in a real app, these would come from an API or data store
  const sampleTasks = [
    {
      id: "1",
      title: "Review project proposal",
      priority: "high",
      dueDate: "Today",
      status: "pending"
    },
    {
      id: "2",
      title: "Finalize marketing plan",
      priority: "medium",
      dueDate: "Tomorrow",
      status: "in-progress"
    },
    {
      id: "3",
      title: "Schedule client meeting",
      priority: "low",
      dueDate: "Next week",
      status: "pending"
    }
  ];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'low': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <CircleDashed className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default: return <CircleDashed className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            Pending Tasks
          </CardTitle>
          <Skeleton className="h-6 w-12 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-9 w-full mt-3" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors duration-300">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg flex items-center gap-2">
          <ListTodo className="h-4 w-4" />
          Pending Tasks
        </CardTitle>
        <Badge variant="outline" className="bg-siso-primary/10 text-siso-primary border-siso-primary/20">
          {pendingTasks} Task{pendingTasks !== 1 ? 's' : ''}
        </Badge>
      </CardHeader>
      <CardContent>
        {sampleTasks.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-siso-text-muted">No pending tasks</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {sampleTasks.map((task, index) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 
                            transition-all duration-300 bg-siso-bg-card/50 hover:bg-siso-bg-card/70"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {getStatusIcon(task.status)}
                      </span>
                      {task.title}
                    </h4>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-siso-text-muted group-hover:text-siso-text pl-6 transition-colors">
                    Due: {task.dueDate}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
        
        <Button 
          variant="ghost" 
          className="w-full mt-3 text-sm text-siso-text-muted hover:text-siso-text hover:bg-white/5 transition-colors"
          onClick={onViewAll}
        >
          View All Tasks
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
