
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

export interface DashboardStats {
  activeProjects: number;
  pendingTasks: number;
  upcomingEvents: number;
}

export interface Phase {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
}

export interface ProjectDoc {
  id: string;
  section: string;
  content: string;
  related_components: string[];
  implementation_status: string;
  priority: string;
}
