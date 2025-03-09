
import React from 'react';

interface SummaryContentProps {
  summary: string;
}

export const SummaryContent: React.FC<SummaryContentProps> = ({ summary }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
  );
};
