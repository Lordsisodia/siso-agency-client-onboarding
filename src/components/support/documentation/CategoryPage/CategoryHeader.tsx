
import React from 'react';
import { DocCategory } from '@/types/documentation';

interface CategoryHeaderProps {
  category: DocCategory;
}

export const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-siso-orange/10 p-3 rounded-lg">
          {React.createElement(category.icon as React.ElementType, { 
            className: "h-6 w-6 text-siso-orange" 
          })}
        </div>
        <h1 className="text-3xl font-bold text-siso-text-bold">{category.title}</h1>
      </div>
      
      <p className="text-lg text-siso-text/80 mb-6">{category.description}</p>
    </div>
  );
};
