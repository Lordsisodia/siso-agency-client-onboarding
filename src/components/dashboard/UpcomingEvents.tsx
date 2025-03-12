
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/dashboard';
import { motion } from 'framer-motion';

interface UpcomingEventsProps {
  events: Event[];
  onViewCalendar?: () => void;
  loading?: boolean;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  events, 
  onViewCalendar,
  loading = false
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-500';
      case 'deadline':
        return 'bg-red-500/10 border-red-500/30 text-red-500';
      case 'reminder':
      default:
        return 'bg-blue-500/10 border-blue-500/30 text-blue-500';
    }
  };

  return (
    <Card className="border border-slate-800/60 bg-gradient-to-br from-slate-900/50 to-slate-800/30 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
        <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-siso-orange" />
            <span className="text-sm text-siso-text-muted">Loading...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-siso-orange" />
            <span className="text-sm text-siso-text-muted">{events.length} events</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {loading ? (
            // Loading skeleton state
            <>
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-center justify-between p-3 rounded-md border border-slate-800/50 bg-slate-800/20 animate-pulse"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="h-4 w-32 bg-gray-700/50 rounded"></div>
                    <div className="h-3 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="h-3 w-16 bg-gray-700/50 rounded"></div>
                    <div className="h-4 w-10 bg-gray-700/50 rounded"></div>
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            // Actual event items
            <>
              {events.map((event) => (
                <motion.div 
                  key={event.id} 
                  variants={itemVariants}
                  className="flex items-center justify-between p-3 rounded-md border border-slate-700/40 bg-slate-800/20 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{event.title}</span>
                    <span className="text-xs text-slate-400">
                      {event.date} at {event.time}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getEventTypeStyles(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </>
          )}
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-siso-text-muted hover:text-white"
              onClick={onViewCalendar}
              disabled={loading}
            >
              View calendar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
