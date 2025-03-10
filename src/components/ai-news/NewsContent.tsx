
import React from 'react';
import { NewsItem } from '@/types/blog';

export interface NewsContentProps {
  content: string;
  article?: NewsItem;
}

export const NewsContent: React.FC<NewsContentProps> = ({ content, article }) => {
  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
