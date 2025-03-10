
import React from 'react';
import { EnhancedNewsItem } from '@/types/news-item';
import { NewsComment } from '@/types/comment';

interface EnhancedBlogLayoutProps {
  article: EnhancedNewsItem & { comments?: NewsComment[] };
  handleExternalLink: () => void;
}

export const EnhancedBlogLayout: React.FC<EnhancedBlogLayoutProps> = ({ 
  article, 
  handleExternalLink 
}) => {
  return (
    <div className="container max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      {article.source && (
        <div className="mt-4 text-sm text-gray-500">
          Source: {article.source}
          {' '}
          <button 
            onClick={handleExternalLink}
            className="text-blue-500 hover:underline"
          >
            View original
          </button>
        </div>
      )}
      {article.comments && article.comments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="space-y-4">
            {article.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="font-medium">{comment.author}</span>
                  <span className="ml-2 text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
