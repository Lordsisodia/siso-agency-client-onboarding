
import React from 'react';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Task, TaskStatus } from '@/types/task';
import { sortTasksChronologically } from '@/utils/taskUtils';

interface TaskTimelineProps {
  tasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onToggleFavorite?: (taskId: string) => void;
}

export const TaskTimeline: React.FC<TaskTimelineProps> = ({ 
  tasks, 
  onUpdateStatus,
  onToggleFavorite
}) => {
  const chronologicalTasks = sortTasksChronologically(tasks);
  
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
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800/70" />
        
        {chronologicalTasks.map((task, index) => (
          <div key={task.id} className="mb-4 relative">
            <div className={`absolute left-4 top-6 w-3 h-3 rounded-full transform -translate-x-1.5 z-10 
              ${task.status === 'completed' 
                ? 'bg-green-500' 
                : task.status === 'in-progress' 
                  ? 'bg-blue-500' 
                  : 'bg-slate-700'}`} 
            />
            
            {index < chronologicalTasks.length - 1 && (
              <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-slate-800/70 transform -translate-x-1/2" />
            )}
            
            <div className="pl-10 pr-4">
              <div className="text-xs text-slate-400 mb-1">
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </div>
              <TaskCard 
                task={task} 
                allTasks={chronologicalTasks} 
                onUpdateStatus={onUpdateStatus} 
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
