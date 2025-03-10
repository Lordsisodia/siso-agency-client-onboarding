
import { BaseEntity } from './base';

export interface NewsComment extends BaseEntity {
  id: string;
  content: string;
  user_id: string;
  news_id: string;
  author: {
    name: string;
    avatar: string;
  };
  created_at: string;
}

export type ArticleImpact = 'high' | 'medium' | 'low';
export type TechnicalComplexity = 'basic' | 'intermediate' | 'advanced';

export const complexityColors = {
  basic: 'text-green-500',
  intermediate: 'text-yellow-500',
  advanced: 'text-red-500'
};

export const importanceColors = {
  high: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
  medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20' },
  low: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' }
};
