
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewsContent } from './NewsContent';
import { NewsCardComments } from './NewsCardComments';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    id: string;
    title: string;
    content: string;
    author?: string;
    date?: string;
    source?: string;
    category?: string;
    readingTime?: number;
    comments?: {
      id: string;
      text: string;
      author: string;
      timestamp: string;
    }[];
  };
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  isOpen,
  onClose,
  article
}) => {
  // Mock function for handling comment addition (replace with actual implementation)
  const handleCommentAdded = (newsId: string, commentText: string) => {
    console.log(`New comment for ${newsId}: ${commentText}`);
    // Implement actual comment handling logic
  };

  // Convert reading time from number to string (if needed)
  const readingTimeStr = article.readingTime ? String(article.readingTime) : "5";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{article.title}</DialogTitle>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
            {article.author && (
              <div className="flex items-center">
                <span className="font-medium">By: {article.author}</span>
              </div>
            )}
            
            {article.date && (
              <div className="flex items-center">
                <span>{article.date}</span>
              </div>
            )}
            
            {article.category && (
              <div className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                {article.category}
              </div>
            )}
            
            {article.readingTime && (
              <div className="flex items-center">
                <span>{readingTimeStr} min read</span>
              </div>
            )}
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <NewsContent content={article.content} />
        </div>
        
        {article.source && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Source: {article.source}
            </span>
          </div>
        )}
        
        {article.comments && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <NewsCardComments 
              comments={article.comments} 
              newsId={article.id}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
