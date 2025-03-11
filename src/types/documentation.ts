
import { LucideIcon } from 'lucide-react';

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
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  last_updated: string;
  sections: DocSection[];
}

export interface DocCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  articles: DocArticle[];
}
