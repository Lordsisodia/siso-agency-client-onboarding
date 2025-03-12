
import { useState, useEffect, useCallback } from 'react';
import { Notification } from '@/types/dashboard';
import { supabase } from '@/integrations/supabase/client';
import { useAuthSession } from '@/hooks/useAuthSession';
import { toast } from 'sonner';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthSession();
  
  const fetchNotifications = useCallback(async () => {
    if (!user) {
      // If user isn't authenticated, use demo data
      setNotifications([
        {
          id: '1',
          title: 'Project Update',
          message: 'Your project "E-Commerce App" has been updated.',
          time: '2 hours ago',
          type: 'info',
          read: false
        },
        {
          id: '2',
          title: 'Task Deadline',
          message: 'The "User Authentication" task is due tomorrow.',
          time: '5 hours ago',
          type: 'warning',
          read: false
        },
        {
          id: '3',
          title: 'New Comment',
          message: 'John added a comment to your task.',
          time: 'Yesterday',
          type: 'info',
          read: true
        }
      ]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Try to fetch real notifications from Supabase
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Transform the data to match the Notification interface
        const formattedNotifications: Notification[] = data.map(notification => {
          // Format time as relative time (e.g., "2 hours ago")
          const createdAt = new Date(notification.created_at);
          const now = new Date();
          const diffMs = now.getTime() - createdAt.getTime();
          const diffMins = Math.round(diffMs / 60000);
          const diffHours = Math.round(diffMs / 3600000);
          const diffDays = Math.round(diffMs / 86400000);
          
          let timeString: string;
          if (diffMins < 60) {
            timeString = `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
          } else if (diffHours < 24) {
            timeString = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
          } else if (diffDays === 1) {
            timeString = 'Yesterday';
          } else {
            timeString = `${diffDays} days ago`;
          }
          
          return {
            id: notification.id,
            title: notification.title,
            message: notification.message,
            time: timeString,
            type: notification.type || 'info',
            read: notification.read || false
          };
        });
        
        setNotifications(formattedNotifications);
      } else {
        // Fallback to demo data if no notifications found
        setNotifications([
          {
            id: '1',
            title: 'Project Update',
            message: 'Your project "E-Commerce App" has been updated.',
            time: '2 hours ago',
            type: 'info',
            read: false
          },
          {
            id: '2',
            title: 'Task Deadline',
            message: 'The "User Authentication" task is due tomorrow.',
            time: '5 hours ago',
            type: 'warning',
            read: false
          },
          {
            id: '3',
            title: 'New Comment',
            message: 'John added a comment to your task.',
            time: 'Yesterday',
            type: 'info',
            read: true
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      
      // Fallback to demo data on error
      setNotifications([
        {
          id: '1',
          title: 'Project Update',
          message: 'Your project "E-Commerce App" has been updated.',
          time: '2 hours ago',
          type: 'info',
          read: false
        },
        {
          id: '2',
          title: 'Task Deadline',
          message: 'The "User Authentication" task is due tomorrow.',
          time: '5 hours ago',
          type: 'warning',
          read: false
        },
        {
          id: '3',
          title: 'New Comment',
          message: 'John added a comment to your task.',
          time: 'Yesterday',
          type: 'info',
          read: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
    
    // Set up real-time subscription if user is authenticated
    if (user) {
      const notificationsChannel = supabase
        .channel('dashboard-notifications-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          () => fetchNotifications()
        )
        .subscribe();
        
      return () => {
        supabase.removeChannel(notificationsChannel);
      };
    }
  }, [user, fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );

    // Update in the database if user is authenticated
    if (user) {
      try {
        const { error } = await supabase
          .from('notifications')
          .update({ read: true })
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (err) {
        console.error('Error marking notification as read:', err);
        toast.error('Failed to mark notification as read');
      }
    }
  };

  const handleViewAll = () => {
    // Navigate to notifications page (not implemented yet)
    console.log('View all notifications');
  };

  return { 
    notifications, 
    handleMarkAsRead, 
    handleViewAll, 
    isLoading 
  };
}
