
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  categoryTitle: string;
  categorySlug?: string;
  articleTitle?: string;
  articleSlug?: string;
  questionTitle?: string;
}

export const Breadcrumb = ({ 
  categoryTitle,
  categorySlug,
  articleTitle,
  articleSlug,
  questionTitle
}: BreadcrumbProps) => {
  return (
    <div className="mb-8">
      <nav className="flex items-center flex-wrap text-sm justify-center">
        <Link 
          to="/support" 
          className="text-siso-text/70 hover:text-siso-text transition-colors whitespace-nowrap"
        >
          Help Center
        </Link>
        
        <ChevronRight className="h-3 w-3 mx-2 text-siso-text/50 flex-shrink-0" />
        
        {questionTitle && categorySlug ? (
          <Link 
            to={`/support/${categorySlug}`} 
            className="text-siso-text/70 hover:text-siso-text transition-colors max-w-[150px] md:max-w-xs truncate"
          >
            {categoryTitle}
          </Link>
        ) : (
          <span className="text-siso-text-bold max-w-[200px] md:max-w-xs truncate">{categoryTitle}</span>
        )}
        
        {questionTitle && (
          <>
            <ChevronRight className="h-3 w-3 mx-2 text-siso-text/50 flex-shrink-0" />
            <span className="text-siso-text-bold max-w-[200px] md:max-w-xs truncate">{questionTitle}</span>
          </>
        )}
        
        {articleTitle && articleSlug && !questionTitle && (
          <>
            <ChevronRight className="h-3 w-3 mx-2 text-siso-text/50 flex-shrink-0" />
            <span className="text-siso-text-bold max-w-[200px] md:max-w-xs truncate">{articleTitle}</span>
          </>
        )}
      </nav>
    </div>
  );
};
