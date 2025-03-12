
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface TasksPreviewProps {
  pendingTasks: number;
  onViewAll?: () => void;
  loading?: boolean;
}

export const TasksPreview: React.FC<TasksPreviewProps> = ({ 
  pendingTasks, 
  onViewAll,
  loading = false
}) => {
  // Demo tasks - in a real application, these would come from the database
  const demoTasks = [
    {
      id: '1',
      title: 'Complete project wireframes',
      status: 'pending',
      dueDate: '2023-09-30'
    },
    {
      id: '2',
      title: 'Review client feedback',
      status: 'completed',
      dueDate: '2023-09-25'
    },
    {
      id: '3',
      title: 'Meeting with design team',
      status: 'pending',
      dueDate: '2023-10-02'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Card className="border border-slate-800/60 bg-gradient-to-br from-slate-900/50 to-slate-800/30 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
        <CardTitle className="text-lg font-medium">Tasks Preview</CardTitle>
        <div className="flex items-center space-x-2">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-siso-orange" />
              <span className="text-sm text-siso-text-muted">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-siso-orange" />
              <span className="text-sm text-siso-text-muted">{pendingTasks} pending</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {loading ? (
            // Loading skeleton state
            <>
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-center justify-between p-2 rounded-md bg-gray-800/20 animate-pulse"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 rounded-full bg-gray-700/50"></div>
                    <div className="h-4 w-48 bg-gray-700/50 rounded"></div>
                  </div>
                  <div className="h-3 w-20 bg-gray-700/50 rounded"></div>
                </motion.div>
              ))}
            </>
          ) : (
            // Actual task items
            <>
              {demoTasks.map((task) => (
                <motion.div 
                  key={task.id} 
                  variants={itemVariants}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={`${task.status === 'completed' ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </motion.div>
              ))}
            </>
          )}
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-siso-text-muted hover:text-white"
              onClick={onViewAll}
            >
              View all tasks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
