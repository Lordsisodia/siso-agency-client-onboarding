
import React from 'react';
import { DocCategory } from '@/types/documentation';
import { GradientText } from '@/components/ui/gradient-text';

interface CategoryHeaderProps {
  category: DocCategory;
}

export const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  return (
    <div className="mb-12 text-center">
      <div className="bg-siso-orange/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        {React.createElement(category.icon as React.ElementType, { 
          className: "h-8 w-8 text-siso-orange" 
        })}
      </div>
      
      <GradientText 
        colors={["#F97316", "#ea384c", "#F97316"]} 
        className="text-3xl sm:text-4xl font-bold mb-4"
      >
        {category.title}
      </GradientText>
      
      <p className="text-lg text-siso-text/80 max-w-xl mx-auto">{category.description}</p>
    </div>
  );
};
