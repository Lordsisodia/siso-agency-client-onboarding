
import React from 'react';
import { DocArticle } from '@/types/documentation';
import { ArticleCard } from './ArticleCard';

interface ArticlesListProps {
  articles: DocArticle[];
  categoryId: string;
}

export const ArticlesList = ({ articles, categoryId }: ArticlesListProps) => {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          categoryId={categoryId} 
        />
      ))}
    </div>
  );
};
