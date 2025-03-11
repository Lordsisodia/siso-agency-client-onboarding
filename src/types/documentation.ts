
export interface DocArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  lastUpdated?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articleCount: number;
  articles: DocArticle[];
}
