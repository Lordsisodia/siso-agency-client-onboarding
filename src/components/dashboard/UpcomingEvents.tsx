
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Video, Users, TargetIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event, EventType } from '@/pages/Dashboard';

interface UpcomingEventsProps {
  events: Event[];
  onViewAll: () => void;
}

export const UpcomingEvents = ({ 
  events, 
  onViewAll 
}: UpcomingEventsProps) => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  
  const getIconForType = (type: EventType) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4 text-blue-400" />;
      case 'deadline':
        return <TargetIcon className="h-4 w-4 text-red-400" />;
      case 'reminder':
        return <Clock className="h-4 w-4 text-amber-400" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-400" />;
    }
  };
  
  const getColorForType = (type: EventType) => {
    switch (type) {
      case 'meeting':
        return 'border-blue-500/20';
      case 'deadline':
        return 'border-red-500/20';
      case 'reminder':
        return 'border-amber-500/20';
      default:
        return 'border-blue-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-siso-border/50 hover:border-siso-border hover:shadow-md hover:shadow-siso-border/10 transition-all duration-300 overflow-hidden bg-gradient-to-b from-siso-bg/80 to-siso-bg/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gradient-to-r from-siso-bg/90 to-siso-bg/70">
          <CardTitle className="text-sm font-semibold flex items-center tracking-tight">
            <Calendar size={16} className="mr-2 text-siso-orange" />
            Upcoming Events
            {events.length > 0 && (
              <Badge variant="outline" className="ml-2 bg-siso-orange/10 text-siso-orange border-siso-orange/30 text-xs px-1.5 py-0">
                {events.length}
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewAll}
            className="h-7 px-2 text-xs text-siso-text/70 hover:text-siso-text-bold hover:bg-siso-bg/50"
          >
            <Eye size={14} className="mr-1" />
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[165px]">
            <div className="px-3 py-2 space-y-2">
              {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Calendar size={20} className="text-siso-text/30 mb-2" />
                  <p className="text-sm text-siso-text/50">No upcoming events</p>
                </div>
              ) : (
                events.map((event) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2.5 rounded-md border border-siso-border/20 bg-siso-bg/50 hover:bg-siso-bg/70 hover:border-siso-orange/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-full bg-siso-bg/70 flex-shrink-0 border ${getColorForType(event.type)}`}>
                        {getIconForType(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold text-siso-text-bold truncate">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center text-[10px] text-siso-text/60">
                            <Calendar size={10} className="mr-1" />
                            {event.date}
                          </span>
                          <span className="flex items-center text-[10px] text-siso-text/60">
                            <Clock size={10} className="mr-1" />
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    {event.type === 'meeting' && (
                      <div className="flex justify-end mt-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-[10px] text-siso-text/60 hover:text-siso-text-bold hover:bg-siso-bg/50 flex items-center"
                        >
                          <Video size={10} className="mr-1" />
                          Join Meeting
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};
