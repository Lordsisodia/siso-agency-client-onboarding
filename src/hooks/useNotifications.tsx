
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationType, Notification } from '@/types/dashboard';

export function useNotifications() {
  const navigate = useNavigate();
  
  // Demo data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from Alex Smith',
      time: '5 min ago',
      type: 'info',
      read: false
    },
    {
      id: '2',
      title: 'Project Update',
      message: 'Your project "Website Redesign" has been updated',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: '3',
      title: 'Deadline Approaching',
      message: 'Project "Marketing Plan" deadline is tomorrow',
      time: '1 day ago',
      type: 'warning',
      read: true
    }
  ]);
  
  // Mock implementation of mark as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    console.log(`Marked notification ${id} as read`);
  };
  
  // Mock implementation of view all
  const handleViewAll = () => {
    navigate('/notifications');
  };

  return { notifications, handleMarkAsRead, handleViewAll };
}
