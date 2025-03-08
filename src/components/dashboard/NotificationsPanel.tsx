
import { Bell, XCircle, AlertTriangle, CheckCircle2, InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onViewAll: () => void;
}

export const NotificationsPanel = ({ 
  notifications = [], 
  onMarkAsRead,
  onViewAll
}: NotificationsPanelProps) => {
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'alert':
        return <XCircle size={16} className="text-red-500" />;
      case 'info':
      default:
        return <InfoIcon size={16} className="text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card className="border border-siso-border">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
          <CardTitle className="text-md font-semibold flex items-center">
            <Bell size={16} className="mr-2 text-siso-orange" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 text-xs bg-siso-red text-white rounded-full px-2 py-0.5">
                {unreadCount} new
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-0">
          {notifications.length === 0 ? (
            <div className="text-center py-6 text-siso-text/70">
              No notifications to display.
            </div>
          ) : (
            <div className="divide-y divide-siso-border/30">
              {notifications.slice(0, 5).map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`py-3 flex items-start ${!notification.read ? 'bg-siso-orange/5' : ''}`}
                >
                  <div className="mt-0.5 mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm text-siso-text-bold">{notification.title}</p>
                      <span className="text-xs text-siso-text/60 ml-2 whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-xs text-siso-text/80 mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                      className="ml-2 text-xs h-auto py-1"
                    >
                      Mark read
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="py-4 text-center">
            <Button 
              variant="link" 
              size="sm" 
              onClick={onViewAll}
              className="text-siso-orange hover:text-siso-red text-xs"
            >
              View all notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
