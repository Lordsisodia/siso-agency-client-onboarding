
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { NewsComment } from '@/types/comment';

interface CommentsSectionProps {
  comments: NewsComment[];
  newsId: string;
  onCommentAdded: (comment: NewsComment) => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ 
  comments, 
  newsId,
  onCommentAdded 
}) => {
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Simulate adding a comment
      const comment: NewsComment = {
        id: Date.now().toString(),
        content: newComment,
        author: 'Current User',
        timestamp: new Date().toISOString(),
        userId: 'current-user-id'
      };
      
      // In a real app, you would call an API here
      // Example: await addComment(newsId, newComment);
      
      onCommentAdded(comment);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div 
        className="flex items-center gap-2 mb-4 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-lg font-semibold">
          Comments ({comments.length})
        </h3>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4 mb-6">
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className="p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{comment.author || comment.user?.name || 'Anonymous'}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp || comment.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content || comment.text}</p>
                  </div>
                ))
              )}
            </div>
            
            <form onSubmit={handleSubmitComment} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  disabled={!newComment.trim() || isSubmitting}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
