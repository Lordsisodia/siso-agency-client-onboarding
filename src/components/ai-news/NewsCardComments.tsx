
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuthSession } from '@/hooks/useAuthSession';
import { supabase } from '@/integrations/supabase/client';

interface NewsCardCommentsProps {
  newsId: string;
  comments: any[];
  onCommentAdded: () => void;
}

export const NewsCardComments: React.FC<NewsCardCommentsProps> = ({ 
  newsId, 
  comments = [],
  onCommentAdded
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthSession();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post comments",
        variant: "destructive"
      });
      return;
    }
    
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('news_comments')
        .insert({
          news_id: newsId,
          user_id: user.id,
          content: newComment.trim()
        });
        
      if (error) throw error;
      
      setNewComment('');
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully."
      });
      
      onCommentAdded();
    } catch (error: any) {
      toast({
        title: "Error posting comment",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Comments ({comments.length})</h3>
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div 
              key={comment.id} 
              className="p-3 bg-siso-bg/40 rounded-lg border border-siso-border/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{comment.user?.name || "Anonymous"}</div>
                <div className="text-xs text-siso-text/60">
                  {new Date(comment.created_at).toLocaleString()}
                </div>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-siso-text/60 text-sm">No comments yet. Be the first to comment!</p>
      )}
      
      <form onSubmit={handleSubmitComment} className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting || !newComment.trim()}
            size="sm"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>
    </div>
  );
};
