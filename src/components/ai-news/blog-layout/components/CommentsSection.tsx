
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { NewsComment } from '@/types/comment';

interface NewsCardCommentsProps {
  newsId: string;
  comments: NewsComment[];
  onCommentAdded?: (comment: NewsComment) => void;
}

export const CommentsSection: React.FC<NewsCardCommentsProps> = ({ 
  newsId, 
  comments = [],
  onCommentAdded
}) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulated API call for now
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newComment: NewsComment = {
        id: Date.now().toString(),
        content: comment,
        created_at: new Date().toISOString(),
        author: {
          name: 'Current User',
          avatar: '/placeholder.svg'
        }
      };
      
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }
      
      setComment('');
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder="Add your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={isSubmitting || !comment.trim()}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>
      
      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.author?.avatar} alt={comment.author?.name} />
                <AvatarFallback>{comment.author?.name?.[0] || '?'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{comment.author?.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-sm mt-2">{comment.content}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};
