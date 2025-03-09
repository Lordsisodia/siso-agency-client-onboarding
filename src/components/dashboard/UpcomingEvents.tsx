
import { Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const getEventTypeConfig = (type: string) => {
    switch(type) {
      case 'meeting':
        return { 
          color: 'bg-blue-500',
          label: 'Meeting'
        };
      case 'deadline':
        return { 
          color: 'bg-red-500',
          label: 'Deadline'
        };
      case 'reminder':
        return { 
          color: 'bg-amber-500',
          label: 'Reminder'
        };
      default:
        return { 
          color: 'bg-gray-500',
          label: 'Event'
        };
    }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    hover: { 
      scale: 1.02,
      backgroundColor: 'rgba(255,255,255,0.03)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="h-full"
    >
      <Card className="border border-siso-border/50 hover:border-siso-border hover:shadow-md hover:shadow-siso-border/10 transition-all duration-300 overflow-hidden bg-gradient-to-b from-siso-bg/80 to-siso-bg/60 backdrop-blur-sm h-full">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gradient-to-r from-siso-bg/90 to-siso-bg/70">
          <CardTitle className="text-sm font-semibold flex items-center">
            <Calendar size={16} className="mr-2 text-siso-orange" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[200px]">
            {events.length === 0 ? (
              <div className="text-center py-4 text-siso-text/70 px-4">
                No upcoming events to display.
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {events.map((event, index) => {
                  const eventType = getEventTypeConfig(event.type);
                  const isToday = event.date === 'Today';
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap="tap"
                      variants={cardVariants}
                      transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                      className="flex items-center p-2 rounded-md cursor-pointer mx-2"
                    >
                      <div className="relative mr-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-siso-bg/90 to-siso-bg/60 border border-siso-border/50 rounded-md flex flex-col items-center justify-center shadow-sm">
                          <span className="text-xs font-medium text-siso-text/70">{event.date !== 'Today' && event.date !== 'Tomorrow' ? new Date(event.date).toLocaleDateString('en-US', { month: 'short' }) : ''}</span>
                          <span className="text-xs font-bold text-siso-text-bold">{event.date === 'Today' ? 'Today' : event.date === 'Tomorrow' ? 'Tmrw' : new Date(event.date).getDate()}</span>
                        </div>
                        <motion.div 
                          className={`absolute -top-1 -right-1 rounded-full ${eventType.color} px-1 py-0.5 text-[8px] text-white whitespace-nowrap shadow-sm`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {eventType.label}
                        </motion.div>
                        {isToday && (
                          <motion.div 
                            className="absolute -bottom-1 -right-1 rounded-full bg-green-500 w-2 h-2"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          ></motion.div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <motion.h3 
                          className="text-xs font-medium text-siso-text-bold line-clamp-1"
                          whileHover={{ color: '#FF5722' }}
                        >
                          {event.title}
                        </motion.h3>
                        <p className="text-xs text-siso-text/70">{event.time}</p>
                      </div>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={14} className="text-siso-text/40" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
          
          <motion.div 
            className="py-2 text-center border-t border-siso-border/30"
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onViewAll}
                className="text-siso-orange hover:text-siso-red hover:border-siso-orange/30 text-xs bg-transparent"
              >
                View calendar
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
