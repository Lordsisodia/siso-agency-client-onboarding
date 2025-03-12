
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event, EventType } from '@/types/dashboard';
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
      // Fetch real events from Supabase
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .limit(5);

      if (error) throw error;

      if (data && data.length > 0) {
        // Transform the data to match the Event interface
        const formattedEvents: Event[] = data.map(event => ({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          type: event.type as EventType // Cast the string to EventType
        }));
        
        setEvents(formattedEvents);
      } else {
        // If no events found, insert demo events
        await createDemoEvents(user.id);
        // Then fetch again
        await fetchEvents();
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

  // Helper function to create demo events for new users
  const createDemoEvents = async (userId: string) => {
    try {
      const demoEvents = [
        {
          user_id: userId,
          title: 'Client Meeting',
          description: 'Discuss project requirements with client',
          date: 'Today',
          time: '2:00 PM',
          type: 'meeting'
        },
        {
          user_id: userId,
          title: 'Project Deadline',
          description: 'Submit project proposal',
          date: 'Tomorrow',
          time: '11:59 PM',
          type: 'deadline'
        },
        {
          user_id: userId,
          title: 'Team Standup',
          description: 'Weekly team sync meeting',
          date: 'Wed, Sep 28',
          time: '10:00 AM',
          type: 'meeting'
        }
      ];

      await supabase.from('events').insert(demoEvents);
    } catch (error) {
      console.error('Error creating demo events:', error);
    }
  };

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
  
  // Navigate to calendar page
  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  return { events, handleViewCalendar, isLoading, error };
}
