
export interface VideoCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  thumbnailUrl: string;
  date: string | null;
  education_creators?: any[];
  viewCount?: number;
}

export interface Educator {
  id: string;
  name: string;
  description?: string;
  channel_id: string;
  slug: string;
  specialization?: string[];
  channel_avatar_url?: string;
  number_of_subscribers?: number;
}
