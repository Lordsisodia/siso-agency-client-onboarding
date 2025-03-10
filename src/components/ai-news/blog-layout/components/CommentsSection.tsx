
import React from 'react';
import { NewsComment } from '@/types/blog';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface CommentsSectionProps {
  comments: NewsComment[];
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 p-4 bg-card rounded-lg">
          <Avatar
            src={comment.author.avatar}
            fallback={comment.author.name[0]}
            className="h-10 w-10"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="mt-1 text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
