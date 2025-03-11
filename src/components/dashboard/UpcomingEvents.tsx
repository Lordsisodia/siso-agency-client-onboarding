
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, CalendarClock, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export interface UpcomingEventsProps {
  events: Event[];
  onViewCalendar?: () => void;
  loading?: boolean;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  events = [],
  onViewCalendar,
  loading = false
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

  // Get appropriate background color based on event type
  const getEventTypeBg = (type: string) => {
    switch (type) {
      case 'deadline': 
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'meeting': 
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: 
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  if (loading) {
    return (
      <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Upcoming Events
          </CardTitle>
          <Skeleton className="h-6 w-12 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-9 w-full mt-3" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors duration-300">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Upcoming Events
        </CardTitle>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="outline" className="bg-siso-primary/10 text-siso-primary border-siso-primary/20">
            {events.length} Event{events.length !== 1 ? 's' : ''}
          </Badge>
        </motion.div>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-siso-text-muted">No upcoming events</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 
                             transition-all duration-300 bg-siso-bg-card/50 hover:bg-siso-bg-card/70"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm group-hover:text-white transition-colors">{event.title}</h4>
                    <Badge className={`text-xs ${getEventTypeBg(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-xs text-siso-text-muted group-hover:text-siso-text transition-colors">
                      {getEventTypeIcon(event.type)}
                      {event.date}
                    </div>
                    {event.time && (
                      <div className="flex items-center text-xs text-siso-text-muted group-hover:text-siso-text transition-colors">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
        
        {onViewCalendar && (
          <Button 
            variant="ghost" 
            className="w-full mt-3 text-sm text-siso-text-muted hover:text-siso-text hover:bg-white/5 transition-colors"
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
