
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Event } from '@/types/dashboard';

export interface UpcomingEventsProps {
  events: Event[];
  onViewCalendar?: () => void;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  events = [],
  onViewCalendar
}) => {
  // Get appropriate icon based on event type
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': 
        return <CalendarClock className="h-3 w-3 mr-1" />;
      case 'meeting': 
        return <Calendar className="h-3 w-3 mr-1" />;
      default: 
        return <Calendar className="h-3 w-3 mr-1" />;
    }
  };
  
  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Upcoming Events
        </CardTitle>
        {events.length > 0 && (
          <span className="text-xs bg-siso-primary/10 text-siso-primary px-2 py-1 rounded-full">
            {events.length} Event{events.length !== 1 ? 's' : ''}
          </span>
        )}
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-siso-text-muted">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 transition-colors bg-siso-bg-card/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <span className="text-xs bg-siso-bg-alt/50 text-siso-text-muted px-2 py-0.5 rounded-full">
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-xs text-siso-text-muted">
                    {getEventTypeIcon(event.type)}
                    {event.date}
                  </div>
                  {event.time && (
                    <div className="flex items-center text-xs text-siso-text-muted">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {onViewCalendar && (
          <Button 
            variant="ghost" 
            className="w-full mt-3 text-sm text-siso-text-muted hover:text-siso-text"
            onClick={onViewCalendar}
          >
            View Calendar
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
