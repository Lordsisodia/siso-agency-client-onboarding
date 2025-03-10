
import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { complexityColors } from './constants';

interface EventCardProps {
  title: string;
  date: string;
  location?: string;
  attendees?: number;
  duration?: string;
  complexity?: 'low' | 'medium' | 'high';
  description?: string;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  attendees,
  duration,
  complexity = 'medium',
  description,
  onClick
}) => {
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      y: -5, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 } 
    }
  };

  // Get the complexity color or default to medium
  const getComplexityColor = (level: 'low' | 'medium' | 'high'): string => {
    const colorObj = complexityColors[level];
    return colorObj ? colorObj.bg : 'bg-yellow-100';
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <motion.div
      className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-200"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium line-clamp-2">{title}</h3>
          {complexity && (
            <span 
              className={`text-xs rounded-full px-2 py-1 font-medium ${
                typeof complexityColors[complexity] === 'object' ? 
                  `${complexityColors[complexity].bg} ${complexityColors[complexity].text}` : 
                  'bg-gray-100 text-gray-800'
              }`}
            >
              {complexity.charAt(0).toUpperCase() + complexity.slice(1)} Complexity
            </span>
          )}
        </div>
        
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
          
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          
          {attendees !== undefined && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{attendees} {attendees === 1 ? 'Attendee' : 'Attendees'}</span>
            </div>
          )}
          
          {duration && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          )}
        </div>
        
        {description && (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 bg-muted/50 flex justify-end">
        <button className="text-sm font-medium text-primary hover:underline">
          View Details
        </button>
      </div>
    </motion.div>
  );
};
