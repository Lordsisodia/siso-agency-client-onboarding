
import { ReactNode } from 'react';
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
  lastUpdated: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  sections: DocSection[];
}

export interface DocCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon; // Changed from ReactNode to LucideIcon
  articleCount: number;
  questionCount: number; // Added questionCount property
  articles: DocArticle[];
}
