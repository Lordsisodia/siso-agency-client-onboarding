
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClipboardList, ThumbsUp, Clock, AlertCircle, CheckCircle, Star, StarOff } from 'lucide-react';
import { Task, TaskStatus } from '@/types/task';

interface TaskCardProps {
  task: Task;
  allTasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onToggleFavorite?: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  allTasks, 
  onUpdateStatus,
  onToggleFavorite 
}) => {
  const phaseInfo = task.phase ? {
    icon: <ClipboardList className="w-4 h-4" />,
    color: 'text-slate-400 bg-slate-400/10 border-slate-400/20'
  } : {
    icon: <ClipboardList className="w-4 h-4" />,
    color: 'text-slate-400 bg-slate-400/10 border-slate-400/20'
  };

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

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(task.id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-xl border ${task.status === 'completed' ? 'border-green-500/30 bg-green-500/5' : 'border-slate-800/60 bg-black/20'} ${task.favorite ? 'ring-2 ring-amber-500/50' : ''} backdrop-blur-sm shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${phaseInfo.color}`}>
            {phaseInfo.icon}
          </span>
          <h3 className={`font-semibold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-100'}`}>{task.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 p-0 text-amber-500 hover:text-amber-400 hover:bg-amber-900/20"
            onClick={handleToggleFavorite}
          >
            {task.favorite ? <Star className="w-4 h-4 fill-amber-500" /> : <StarOff className="w-4 h-4" />}
          </Button>
        </div>
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
        {task.requiresApproval && (
          <div className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded-md flex items-center">
            <ThumbsUp className="w-3 h-3 mr-1" />
            Approval Required
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
                const dependentTask = allTasks.find(t => t.id === depId);
                return (
                  <Badge 
                    key={depId} 
                    variant="outline" 
                    className={`text-xs ${dependentTask?.status === 'completed' ? 'line-through text-green-500' : 'text-amber-500'}`}
                  >
                    {dependentTask?.title.substring(0, 20)}
                    {dependentTask?.title.length > 20 ? '...' : ''}
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

// Helper function to check if a task can be completed
const canCompleteTask = (task: Task, allTasks: Task[]): boolean => {
  if (!task.dependsOn || task.dependsOn.length === 0) return true;
  
  return task.dependsOn.every(depId => {
    const dependentTask = allTasks.find(t => t.id === depId);
    return dependentTask?.status === 'completed';
  });
};
