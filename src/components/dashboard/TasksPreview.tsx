
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleDashed, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TasksPreviewProps {
  pendingTasks: number;
  onViewAll: () => void;
}

export const TasksPreview: React.FC<TasksPreviewProps> = ({ 
  pendingTasks,
  onViewAll
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
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
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
  
  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Pending Tasks</CardTitle>
        {pendingTasks > 0 && (
          <span className="text-xs bg-siso-primary/10 text-siso-primary px-2 py-1 rounded-full">
            {pendingTasks} Task{pendingTasks !== 1 ? 's' : ''}
          </span>
        )}
      </CardHeader>
      <CardContent>
        {sampleTasks.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-siso-text-muted">No pending tasks</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sampleTasks.map((task, index) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 transition-colors bg-siso-bg-card/50"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    {task.title}
                  </h4>
                  <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center text-xs text-siso-text-muted">
                  Due: {task.dueDate}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <Button 
          variant="ghost" 
          className="w-full mt-3 text-sm text-siso-text-muted hover:text-siso-text"
          onClick={onViewAll}
        >
          View All Tasks
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
