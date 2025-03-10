
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { NewsComment } from '@/types/news-comment';

interface CommentsSectionProps {
  newsId: string;
  comments: NewsComment[];
  onCommentAdded?: (comment: NewsComment) => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ 
  newsId, 
  comments = [], 
  onCommentAdded 
}) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create placeholder comment object for immediate UI feedback
      const tempComment: NewsComment = {
        id: `temp-${Date.now()}`,
        text: newComment,
        author: "You", // or get from auth context
        timestamp: new Date().toISOString(),
      };
      
      // If you have an onCommentAdded handler, call it
      if (onCommentAdded) {
        onCommentAdded(tempComment);
      }
      
      // Reset comment input
      setNewComment('');
      
      toast({
        description: "Comment added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error adding comment",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="mt-8 bg-card/30 p-6 rounded-xl border border-border shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      
      {comments.length > 0 ? (
        <div className="space-y-6 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-10 w-10">
                {comment.user?.avatar && (
                  <AvatarImage src={comment.user.avatar} alt={comment.user?.name || comment.author || 'Anonymous'} />
                )}
                <AvatarFallback>
                  {getInitials(comment.user?.name || comment.author || 'AN')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{comment.user?.name || comment.author || 'Anonymous'}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(comment.timestamp || comment.created_at || '').toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-1 text-sm">{comment.text || comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-muted-foreground">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
      
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="resize-none mb-3"
          rows={3}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>
    </div>
  );
};
