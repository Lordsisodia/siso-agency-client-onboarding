
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Task, TaskStatus, TaskPhase } from '@/types/task';
import { phaseConfig } from '@/config/taskConfig';

interface PhaseGroupProps {
  phase: TaskPhase;
  tasks: Task[];
  allTasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onToggleFavorite?: (taskId: string) => void;
}

export const PhaseGroup: React.FC<PhaseGroupProps> = ({
  phase,
  tasks,
  allTasks,
  onUpdateStatus,
  onToggleFavorite
}) => {
  const phaseInfo = phaseConfig[phase];
  const tasksInPhase = tasks.filter(task => task.phase === phase);
  const totalTasks = tasksInPhase.length;
  const completedTasks = tasksInPhase.filter(task => task.status === 'completed').length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  if (tasksInPhase.length === 0) return null;
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${phaseInfo.color}`}>
          {phaseInfo.icon}
        </div>
        <div>
          <h3 className="font-bold text-lg">{phaseInfo.title}</h3>
          <p className="text-sm text-slate-400">{phaseInfo.description}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Phase Progress</span>
          <span className="text-sm">{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-slate-800/50" 
          indicatorClassName={`bg-gradient-to-r ${
            phase === 'setup' ? 'from-blue-500 to-blue-400' :
            phase === 'review' ? 'from-purple-500 to-purple-400' :
            phase === 'initiation' ? 'from-pink-500 to-pink-400' :
            phase === 'development' ? 'from-amber-500 to-amber-400' :
            'from-green-500 to-green-400'
          }`} 
        />
      </div>
      
      <div className="space-y-4 pl-4 border-l-2 border-slate-800/50">
        {tasksInPhase.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            allTasks={allTasks} 
            onUpdateStatus={onUpdateStatus} 
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
