
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  date: string;
  viewCount: number;
  channel_id?: string;
  url?: string;
}

export interface Educator {
  id: string;
  name: string;
  channel_id: string;
  description?: string;
  channel_avatar_url?: string;
  profile_image_url?: string;
  number_of_subscribers?: number;
  specialization?: string[];
  slug?: string;
}

export interface VideoProgress {
  id: string;
  video_id: string;
  user_id: string;
  progress: number;
  watched: boolean;
  completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface VideoSummary {
  id: string;
  video_id: string;
  summary: string;
  key_points: any;
}

export interface UseVideosResult {
  videos: Video[];
  loading: boolean;
  error: Error | null;
}
