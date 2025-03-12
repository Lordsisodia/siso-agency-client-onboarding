
import { Task } from "@/types/task";

export const sortTasksChronologically = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

export const sortTasksByPhase = (tasks: Task[]): Task[] => {
  const phaseOrder = { 'setup': 1, 'review': 2, 'initiation': 3, 'development': 4, 'completion': 5 };
  return [...tasks].sort((a, b) => {
    if (!a.phase || !b.phase) return 0;
    
    const phaseDiff = phaseOrder[a.phase] - phaseOrder[b.phase];
    if (phaseDiff !== 0) return phaseDiff;
    
    if (a.phaseOrder !== undefined && b.phaseOrder !== undefined) {
      return a.phaseOrder - b.phaseOrder;
    }
    
    return 0;
  });
};
