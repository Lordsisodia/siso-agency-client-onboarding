
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, Calendar as CalendarIcon, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event, EventType } from '@/types/dashboard';
import { useEvents } from '@/hooks/useEvents';

export const UpcomingEvents = () => {
  const { events, handleViewCalendar } = useEvents();

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'deadline':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'reminder':
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-siso-text-bold" />
          <h3 className="text-base font-medium text-siso-text-bold">Upcoming Events</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleViewCalendar}
          className="text-xs"
        >
          <span>View Calendar</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-sm text-siso-text/70 text-center py-4">
            No upcoming events
          </p>
        ) : (
          events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 rounded-lg bg-siso-bg/30 border border-siso-border/30 hover:border-siso-border transition-colors"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getEventIcon(event.type)}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-siso-text-bold">
                    {event.title}
                  </p>
                  <div className="mt-1 flex items-center text-xs text-siso-text/70">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <span>{event.date}</span>
                    <span className="mx-1">•</span>
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {events.length > 0 && (
        <div className="text-center pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs w-full"
            onClick={handleViewCalendar}
          >
            See all events
          </Button>
        </div>
      )}
    </div>
  );
};
