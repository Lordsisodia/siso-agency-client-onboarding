
import { Bell, XCircle, AlertTriangle, CheckCircle2, InfoIcon, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      <Card className="border border-siso-border/50 hover:border-siso-border hover:shadow-md hover:shadow-siso-border/10 transition-all duration-300 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6 bg-gradient-to-r from-siso-bg/90 to-siso-bg/70">
          <CardTitle className="text-md font-semibold flex items-center">
            <motion.div
              animate={{
                scale: unreadCount > 0 ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 0.5,
                repeat: unreadCount > 0 ? Infinity : 0,
                repeatDelay: 2
              }}
              className="text-siso-orange mr-2"
            >
              <Bell size={16} />
            </motion.div>
            Notifications
            {unreadCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 text-xs bg-siso-red text-white rounded-full px-2 py-0.5"
              >
                {unreadCount} new
              </motion.span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px]">
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-siso-text/70">
                No notifications to display.
              </div>
            ) : (
              <div className="divide-y divide-siso-border/30">
                <AnimatePresence initial={false}>
                  {notifications.slice(0, 5).map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`py-3 px-6 flex items-start ${!notification.read ? 'bg-gradient-to-r from-siso-orange/5 to-transparent' : ''}`}
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
                          className="ml-2 text-xs h-auto py-1 hover:bg-siso-orange/10 hover:text-siso-orange"
                        >
                          <X size={14} className="mr-1" />
                          Dismiss
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>
          
          <motion.div 
            className="py-4 text-center border-t border-siso-border/30"
            whileHover={{ scale: 1.02 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onViewAll}
              className="text-siso-orange hover:text-siso-red hover:border-siso-orange/30 text-xs bg-transparent"
            >
              View all notifications
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
