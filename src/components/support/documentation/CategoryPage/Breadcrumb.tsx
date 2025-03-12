
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  categoryTitle: string;
}

export const Breadcrumb = ({ categoryTitle }: BreadcrumbProps) => {
  return (
    <div className="mb-6">
      <nav className="flex items-center text-sm">
        <Link to="/support" className="text-siso-text/70 hover:text-siso-text transition-colors">
          Help Center
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-siso-text/50" />
        <span className="text-siso-text-bold">{categoryTitle}</span>
      </nav>
    </div>
  );
};
