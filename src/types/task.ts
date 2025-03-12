
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

export interface TaskProject {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
  phases: {
    name: string;
    status: 'completed' | 'in-progress' | 'pending';
    progress: number;
  }[];
  tags: string[];
  financials?: {
    marketValue: number;
    costSavings: number;
    developmentCost: number;
    roi: number;
  };
}
