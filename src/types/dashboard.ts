
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

export interface NetworkingResource {
  id: string;
  name: string;
  description?: string;
  category: string;
  platform?: string;
  profile_image_url?: string;
  member_count?: number;
  join_url?: string;
  created_at: string;
  updated_at: string;
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

// Leaderboard related interfaces
export interface LeaderboardUser {
  id: string;
  user_id: string;
  fullName: string;
  points: number;
  rank: string;
  sisoTokens: number;
  avatarUrl: string;
  bio: string;
  updated: string;
  contributionCount: number;
  referralCount: number;
  achievements: any[];
  discord_url: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
}

export interface UseLeaderboardResult {
  loading: boolean;
  error: Error | null;
  users: LeaderboardUser[];
  leaderboardData: LeaderboardUser[];
  filteredData: LeaderboardUser[];
  setFilteredData: React.Dispatch<React.SetStateAction<LeaderboardUser[]>>;
  totalUsersWithPoints: number;
  totalPoints: number;
  totalSisoTokens: number;
  selectedUser: LeaderboardUser | null;
  setSelectedUser: (user: LeaderboardUser | null) => void;
}

export interface UseNetworkingResourcesResult {
  resources: NetworkingResource[];
  categories: CategoryStats[];
  loading: boolean;
  error: Error | null;
}
