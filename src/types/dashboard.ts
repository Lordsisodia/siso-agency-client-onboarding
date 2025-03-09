
export type NotificationType = 'alert' | 'success' | 'warning' | 'info';
export type EventType = 'deadline' | 'meeting' | 'reminder';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: EventType;
}

export interface Transaction {
  id: string;
  points_exchanged: number;
  tokens_received: number;
  status: string;
  transaction_type: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface DashboardStats {
  activeProjects: number;
  pendingTasks: number;
  upcomingEvents: number;
}
