
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

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  duration: string;
  channel_id: string;
  url: string;
  viewcount?: number;
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
  category: string;
  assistant_type: string;
  prompt_template: string;
  use_cases: string[];
  input_variables: string[];
  created_at: string;
  updated_at: string;
}
