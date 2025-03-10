import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { complexityColors } from './constants';

interface EventCardProps {
  title: string;
  date: string;
  time?: string;
  description: string;
  type: string;
  importance: 'low' | 'medium' | 'high';
  link?: string;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  description,
  type,
  importance = 'medium',
  link,
  onClick
}) => {
  // Get the complexity class or default to gray
  const getTypeClass = () => {
    // Handle both string and object types for complexityColors
    const colorInfo = typeof complexityColors[importance] === 'string' 
      ? complexityColors[importance]
      : complexityColors["default"];
      
    return colorInfo;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                // Any additional logic if needed
              }}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Calendar size={14} className="mr-1" />
          <span className="mr-3">{date}</span>
          {time && (
            <>
              <Clock size={14} className="mr-1" />
              <span>{time}</span>
            </>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-1 rounded ${getTypeClass()}`}>
            {type}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
