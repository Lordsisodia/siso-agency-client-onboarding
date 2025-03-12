
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPhase = 'setup' | 'review' | 'initiation' | 'development' | 'completion';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
  phase?: TaskPhase;
  phaseOrder?: number;
  completedDate?: string;
  dependsOn?: string[];
  assignedTo?: string;
  project?: string;
  tags?: string[];
  requiresApproval?: boolean;
  approvedBy?: string;
  approvedAt?: string;
  category?: string;
  favorite?: boolean;
}

export interface PhaseInfo {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
}
