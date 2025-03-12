
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/types/dashboard';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSession } from '@/hooks/useAuthSession';

export function useEvents() {
  const navigate = useNavigate();
  const { user } = useAuthSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!user) {
      // If user isn't authenticated, use demo data
      setEvents([
        {
          id: '1',
          title: 'Client Meeting',
          date: 'Today',
          time: '2:00 PM',
          type: 'meeting'
        },
        {
          id: '2',
          title: 'Project Deadline',
          date: 'Tomorrow',
          time: '11:59 PM',
          type: 'deadline'
        },
        {
          id: '3',
          title: 'Team Standup',
          date: 'Wed, Sep 28',
          time: '10:00 AM',
          type: 'meeting'
        }
      ]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Try to fetch real events from Supabase
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .limit(5);

      if (error) throw error;

      if (data && data.length > 0) {
        // Transform the data to match the Event interface
        const formattedEvents: Event[] = data.map(event => {
          const eventDate = new Date(event.date);
          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          
          // Format date as "Today", "Tomorrow", or full date
          let formattedDate: string;
          if (eventDate.toDateString() === today.toDateString()) {
            formattedDate = 'Today';
          } else if (eventDate.toDateString() === tomorrow.toDateString()) {
            formattedDate = 'Tomorrow';
          } else {
            formattedDate = eventDate.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            });
          }
          
          // Extract time portion if available
          const time = event.time || new Date(event.date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          });

          return {
            id: event.id,
            title: event.title,
            date: formattedDate,
            time,
            type: event.type || 'reminder'
          };
        });
        
        setEvents(formattedEvents);
      } else {
        // Fallback to demo data if no events found
        setEvents([
          {
            id: '1',
            title: 'Client Meeting',
            date: 'Today',
            time: '2:00 PM',
            type: 'meeting'
          },
          {
            id: '2',
            title: 'Project Deadline',
            date: 'Tomorrow',
            time: '11:59 PM',
            type: 'deadline'
          },
          {
            id: '3',
            title: 'Team Standup',
            date: 'Wed, Sep 28',
            time: '10:00 AM',
            type: 'meeting'
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events');
      
      // Fallback to demo data on error
      setEvents([
        {
          id: '1',
          title: 'Client Meeting',
          date: 'Today',
          time: '2:00 PM',
          type: 'meeting'
        },
        {
          id: '2',
          title: 'Project Deadline',
          date: 'Tomorrow',
          time: '11:59 PM',
          type: 'deadline'
        },
        {
          id: '3',
          title: 'Team Standup',
          date: 'Wed, Sep 28',
          time: '10:00 AM',
          type: 'meeting'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
    
    // Set up real-time subscription if user is authenticated
    if (user) {
      const eventsChannel = supabase
        .channel('dashboard-events-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'events',
            filter: `user_id=eq.${user.id}`
          },
          () => fetchEvents()
        )
        .subscribe();
        
      return () => {
        supabase.removeChannel(eventsChannel);
      };
    }
  }, [user, fetchEvents]);
  
  // Mock implementation of view calendar
  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  return { events, handleViewCalendar, isLoading, error };
}
