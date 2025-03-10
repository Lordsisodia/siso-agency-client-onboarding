
import React, { useState } from 'react';
import { NewsComment } from '@/types/comment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthSession } from '@/hooks/useAuthSession';

// Updated to make onCommentAdded optional
export interface NewsCardCommentsProps {
  newsId: string;
  comments: NewsComment[];
  onCommentAdded?: () => void;
}

export const CommentsSection: React.FC<NewsCardCommentsProps> = ({
  newsId,
  comments,
  onCommentAdded
}) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthSession();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !user) return;
    
    setIsSubmitting(true);
    
    try {
      // Add your comment submission logic here
      // Example:
      // await addComment(newsId, user.id, commentText);
      
      setCommentText('');
      // Call the callback if it exists
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      
      {user ? (
        <form onSubmit={handleSubmitComment} className="space-y-2">
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            className="resize-none"
            rows={3}
          />
          <Button 
            type="submit" 
            disabled={!commentText.trim() || isSubmitting}
            size="sm"
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">Please sign in to leave a comment.</p>
      )}
      
      <div className="space-y-4 mt-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-3">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium">{comment.user?.name || 'Anonymous'}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm whitespace-pre-line">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};
