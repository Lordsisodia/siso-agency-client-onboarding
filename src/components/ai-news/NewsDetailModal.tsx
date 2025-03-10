
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { NewsContent } from './NewsContent';
import { Button } from '@/components/ui/button';
import { NewsCardComments } from './NewsCardComments';
import { ShareButtons } from './ShareButtons';
import { Eye, MessageSquare, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { categoryColors } from '@/types/complexity';

interface NewsDetailModalProps {
  article: {
    id: string;
    title: string;
    content: string;
    date: string;
    source: string;
    category: string;
    image_url?: string;
    views: number;
    comments_count: number;
    comments?: Array<{ id: string; text: string; author: string; timestamp: string }>;
  };
  isOpen: boolean;
  onClose: () => void;
  onReadFull?: (id: string) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ 
  article, 
  isOpen, 
  onClose,
  onReadFull 
}) => {
  const getColorForCategory = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory in categoryColors) {
      return categoryColors[lowerCategory as keyof typeof categoryColors];
    }
    return categoryColors.other;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0 bg-background/95 backdrop-blur-md">
        <div className="relative p-6 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Badge className={cn("px-3 py-1 font-medium", getColorForCategory(article.category))}>
              {article.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{article.date}</span>
            <span className="text-xs text-muted-foreground">Source: {article.source}</span>
          </div>
          
          <h2 className="text-xl font-bold pr-8">{article.title}</h2>
          
          <div className="flex items-center mt-3 gap-4">
            <div className="flex items-center text-muted-foreground">
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-sm">{String(article.views)}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-sm">{article.comments_count}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          {article.image_url && (
            <div 
              className="w-full h-48 md:h-64 rounded-lg mb-6 bg-cover bg-center"
              style={{ backgroundImage: `url(${article.image_url})` }}
            />
          )}
          
          <NewsContent content={article.content} />
          
          {onReadFull && (
            <div className="mt-6 text-center">
              <Button onClick={() => onReadFull(article.id)} variant="default">
                Read Full Article
              </Button>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Share</h3>
            <ShareButtons title={article.title} />
          </div>
          
          {article.comments && article.comments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Comments</h3>
              <NewsCardComments comments={article.comments} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
