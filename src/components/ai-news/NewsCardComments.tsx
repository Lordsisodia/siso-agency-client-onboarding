
import React, { useState } from 'react';

export interface NewsCardCommentsProps {
  comments: {
    id: string;
    text: string;
    author: string;
    timestamp: string;
    user?: string; // Optional user property to fix TS error
  }[];
  newsId: string; // Required prop
  onCommentAdded: (newsId: string, comment: string) => void; // Required prop
}

export const NewsCardComments: React.FC<NewsCardCommentsProps> = ({ 
  comments,
  newsId,
  onCommentAdded
}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentAdded(newsId, comment);
      setComment('');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      
      {comments.length > 0 ? (
        <div className="space-y-3 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{comment.author}</span>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No comments yet. Be the first to comment!</p>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="border border-gray-300 rounded p-2 text-sm"
          rows={3}
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          className="bg-blue-500 text-white py-1 px-3 rounded self-end text-sm disabled:bg-gray-300"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};
