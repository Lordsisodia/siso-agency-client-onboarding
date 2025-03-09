
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/types/dashboard';

export function useEvents() {
  const navigate = useNavigate();
  
  // Demo data for events
  const [events, setEvents] = useState<Event[]>([
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
  
  // Mock implementation of view calendar
  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  return { events, handleViewCalendar };
}
