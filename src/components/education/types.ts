
// Basic types for education components
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  viewCount?: number;
  date?: string;
  description?: string;
  url?: string;
}

export interface Educator {
  id: string;
  name: string;
  description?: string;
  channel_avatar_url: string;
  number_of_subscribers: number;
  specialization?: string[];
  slug?: string;
  videos?: Video[];
}

export interface VideoCategory {
  id: string;
  name: string;
  count: number;
}
