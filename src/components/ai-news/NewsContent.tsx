
import React from 'react';

export interface NewsContentProps {
  content: string;
}

export const NewsContent: React.FC<NewsContentProps> = ({ content }) => {
  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
