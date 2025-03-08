
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatters';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'reminder';
}

interface UpcomingEventsProps {
  events: Event[];
  onViewAll: () => void;
}

export const UpcomingEvents = ({ events = [], onViewAll }: UpcomingEventsProps) => {
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'meeting':
        return 'bg-blue-500';
      case 'deadline':
        return 'bg-red-500';
      case 'reminder':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <Card className="border border-siso-border mt-4">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
          <CardTitle className="text-md font-semibold flex items-center">
            <Calendar size={16} className="mr-2 text-siso-orange" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-2">
          {events.length === 0 ? (
            <div className="text-center py-4 text-siso-text/70">
              No upcoming events to display.
            </div>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center p-2 rounded-md hover:bg-siso-border/10 cursor-pointer"
                >
                  <div className="relative mr-3">
                    <div className="w-10 h-10 bg-siso-bg/80 border border-siso-border rounded-md flex flex-col items-center justify-center">
                      <span className="text-xs font-medium">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-sm font-bold">{new Date(event.date).getDate()}</span>
                    </div>
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-siso-text-bold">{event.title}</h3>
                    <p className="text-xs text-siso-text/70">{event.time}</p>
                  </div>
                  <ArrowRight size={16} className="text-siso-text/40" />
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="py-2 text-center mt-2">
            <Button 
              variant="link" 
              size="sm" 
              onClick={onViewAll}
              className="text-siso-orange hover:text-siso-red text-xs"
            >
              View calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
