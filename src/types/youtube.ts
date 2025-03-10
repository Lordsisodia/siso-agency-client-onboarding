
export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  thumbnailUrl: string;
  date: string;
  viewCount: number;
  education_creators?: {
    name: string;
    channel_id: string;
    avatar_url: string;
  };
}
