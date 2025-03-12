
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { PhaseGroup } from '@/components/tasks/PhaseGroup';
import { Task, TaskStatus } from '@/types/task';
import { sortTasksByPhase } from '@/utils/taskUtils';

interface TaskLifecycleProps {
  tasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export const TaskLifecycle: React.FC<TaskLifecycleProps> = ({ 
  tasks, 
  onUpdateStatus 
}) => {
  const phaseSortedTasks = sortTasksByPhase(tasks);
  
  const totalTasks = phaseSortedTasks.length;
  const completedTasks = phaseSortedTasks.filter(task => task.status === 'completed').length;
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
      
      <PhaseGroup phase="setup" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="review" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="initiation" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="development" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
      <PhaseGroup phase="completion" tasks={phaseSortedTasks} allTasks={tasks} onUpdateStatus={onUpdateStatus} />
    </div>
  );
};
