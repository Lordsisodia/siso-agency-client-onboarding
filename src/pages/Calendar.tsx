
import React, { useState } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calendar() {
  const { events, isLoading } = useEvents();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined): Event[] => {
    if (!date || !events) return [];
    
    // Format the date to match the event date format
    const formattedDate = format(date, 'MMM d, yyyy');
    
    // Filter events for the selected date
    return events.filter(event => {
      // Handle "Today" and "Tomorrow" special cases
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (event.date === 'Today' && isSameDay(date, today)) return true;
      if (event.date === 'Tomorrow' && isSameDay(date, tomorrow)) return true;
      
      // For other dates, try to match the format
      return event.date === formattedDate;
    });
  };
  
  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  // Get the events for the selected date
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  // Event type badge colors
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'meeting':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-500';
      case 'deadline':
        return 'bg-red-500/10 border-red-500/30 text-red-500';
      case 'reminder':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-500';
      default:
        return 'bg-green-500/10 border-green-500/30 text-green-500';
    }
  };

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your upcoming events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border border-slate-800/60 bg-gradient-to-br from-slate-900/50 to-slate-800/30 shadow-md">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-slate-700/50"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border border-slate-800/60 bg-gradient-to-br from-slate-900/50 to-slate-800/30 shadow-md h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Events'}
                </CardTitle>
                <Badge variant="outline" className="px-2 py-1 bg-black/20">
                  {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'event' : 'events'}
                </Badge>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-siso-orange"></div>
                  </div>
                ) : selectedDateEvents.length > 0 ? (
                  <motion.div 
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedDateEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        variants={itemVariants}
                        className="p-4 rounded-lg border border-slate-700/50 bg-black/20 hover:bg-black/30 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center">
                                <Tag className="mr-1 h-4 w-4" />
                                <span className="capitalize">{event.type}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={`${getEventTypeColor(event.type)} capitalize`}>
                            {event.type}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground">No events scheduled for this date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
