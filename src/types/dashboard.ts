
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
  loginStreak?: number;
}

export interface Phase {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  phases: Phase[];
  tags: string[];
  financials?: {
    marketValue: number;
    costSavings: number;
    developmentCost: number;
    roi: number;
  };
}

export interface ProjectDoc {
  id: string;
  section: string;
  content: string;
  related_components: string[];
  implementation_status: string;
  priority: string;
}

export interface CategoryStats {
  category: string;
  community_count: number;
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
}

// Simplified LeaderboardUser interface to match database schema
export interface LeaderboardUser {
  id: string;
  user_id: string;
  full_name: string;
  points: number;
  rank: string;
  siso_tokens: number;
  avatar_url: string | null;
  updated_at: string;
  contribution_count: number;
  referral_count: number;
  achievements: any[];
  discord_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
}

// Simplified leaderboard hook result
export interface UseLeaderboardResult {
  loading: boolean;
  error: Error | null;
  leaderboardData: LeaderboardUser[];
}
