
export interface NewsComment {
  id: string;
  content: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  author?: string;
  timestamp?: string;
  text?: string;
  createdAt?: string;
  userId?: string;
}
