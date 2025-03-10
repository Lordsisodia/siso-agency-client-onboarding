
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: string;
}

export interface UpcomingEventsProps {
  events: Event[];
  onViewCalendar?: () => void;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  events = [],
  onViewCalendar
}) => {
  // Format date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Format time from ISO string
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };
  
  return (
    <Card className="border border-siso-border/40 bg-siso-bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Upcoming Events</span>
          {events.length > 0 && (
            <span className="text-xs bg-siso-primary/10 text-siso-primary px-2 py-1 rounded-full">
              {events.length} Event{events.length !== 1 ? 's' : ''}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-siso-text-muted">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div 
                key={event.id}
                className="p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 transition-colors bg-siso-bg-card/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <span className="text-xs bg-siso-bg-alt/50 text-siso-text-muted px-2 py-0.5 rounded-full">
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-xs text-siso-text-muted">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(event.date)}
                  </div>
                  {event.time && (
                    <div className="flex items-center text-xs text-siso-text-muted">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(event.time)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {events.length > 0 && onViewCalendar && (
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
