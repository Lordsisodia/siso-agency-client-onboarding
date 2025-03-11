
import { ReactNode } from 'react';

export interface DocQuestion {
  id: string;
  slug: string;
  question: string;
  answer: string;
}

export interface DocSection {
  id: string;
  title: string;
  questions: DocQuestion[];
}

export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  lastUpdated: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  sections: DocSection[];
}

export interface DocCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
  articleCount: number;
  articles: DocArticle[];
}
