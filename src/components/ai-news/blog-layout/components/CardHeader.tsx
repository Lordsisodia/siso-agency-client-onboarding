
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { importanceColors } from '../constants';

interface CardHeaderProps {
  title: string;
  date: string;
  readingTime?: number;
  category?: string;
  importance?: 'low' | 'medium' | 'high';
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  date, 
  readingTime, 
  category,
  importance = 'medium'
}) => {
  const getImportanceStyle = () => {
    const colorObj = importanceColors[importance] || importanceColors.default;
    return `${colorObj.bg} ${colorObj.text} ${colorObj.border}`;
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1.5" />
          <span>{date}</span>
        </div>
        
        {readingTime && (
          <div className="flex items-center">
            <Clock size={14} className="mr-1.5" />
            <span>{readingTime} min read</span>
          </div>
        )}
        
        {category && (
          <Badge variant="outline" className="ml-1">
            {category}
          </Badge>
        )}
        
        {importance && (
          <Badge className={`${getImportanceStyle()} border`}>
            {importance.charAt(0).toUpperCase() + importance.slice(1)} Impact
          </Badge>
        )}
      </div>
    </div>
  );
};
