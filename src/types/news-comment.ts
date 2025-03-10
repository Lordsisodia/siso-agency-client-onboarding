
export interface NewsComment {
  id: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  author?: string;
  content?: string;
  text?: string;
  timestamp?: string;
  created_at?: string;
}
