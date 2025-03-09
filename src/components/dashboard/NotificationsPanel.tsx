
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Notification, NotificationType } from '@/types/dashboard';

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Project deadline approaching',
    message: 'The deadline for the marketing website is tomorrow.',
    time: '2 hours ago',
    type: 'alert',
    read: false
  },
  {
    id: '2',
    title: 'New team member added',
    message: 'Sarah has been added to the design team.',
    time: '5 hours ago',
    type: 'info',
    read: false
  },
  {
    id: '3',
    title: 'Task completed',
    message: 'Homepage redesign task has been completed.',
    time: '1 day ago',
    type: 'success',
    read: true
  },
  {
    id: '4',
    title: 'System update',
    message: 'The system will be updated on Friday at 11pm.',
    time: '2 days ago',
    type: 'warning',
    read: true
  }
];

export const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'alert':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-siso-text-bold" />
          <h3 className="text-base font-medium text-siso-text-bold">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-siso-orange text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead} 
            className="text-xs"
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <p className="text-sm text-siso-text/70 text-center py-4">
            No notifications to display
          </p>
        ) : (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-lg border ${
                notification.read 
                  ? 'bg-siso-bg/20 border-siso-border/30' 
                  : 'bg-siso-bg/40 border-siso-border'
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    notification.read ? 'text-siso-text/90' : 'text-siso-text-bold'
                  }`}>
                    {notification.title}
                  </p>
                  <p className="mt-1 text-xs text-siso-text/70">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-siso-text/60">
                    {notification.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" className="text-xs">
            View all notifications
          </Button>
        </div>
      )}
    </div>
  );
};
