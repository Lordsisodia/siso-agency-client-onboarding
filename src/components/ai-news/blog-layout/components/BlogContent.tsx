
import React from 'react';
import { EnhancedNewsItem } from '@/types/news-item';
import { NewsComment } from '@/types/comment';

interface BlogContentProps {
  article: EnhancedNewsItem & { comments?: NewsComment[] };
  handleExternalLink?: () => void;
}

export const BlogContent: React.FC<BlogContentProps> = ({ 
  article,
  handleExternalLink
}) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      
      {article.source && (
        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Source: {' '}
            <a 
              href={article.source} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 hover:underline"
              onClick={handleExternalLink}
            >
              {article.source}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
