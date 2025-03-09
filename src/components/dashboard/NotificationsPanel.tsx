
import { Bell, XCircle, AlertTriangle, CheckCircle2, InfoIcon, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

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
        return <CheckCircle2 size={14} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={14} className="text-amber-500" />;
      case 'alert':
        return <XCircle size={14} className="text-red-500" />;
      case 'info':
      default:
        return <InfoIcon size={14} className="text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="h-full"
    >
      <Card className="border border-siso-border/50 hover:border-siso-border hover:shadow-md hover:shadow-siso-border/10 transition-all duration-300 overflow-hidden bg-gradient-to-b from-siso-bg/80 to-siso-bg/60 backdrop-blur-sm h-full">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gradient-to-r from-siso-bg/90 to-siso-bg/70">
          <CardTitle className="text-sm font-semibold flex items-center">
            <motion.div
              animate={unreadCount > 0 ? {
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0, -5, 0]
              } : {}}
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
              <Badge 
                variant="gradient" 
                glow 
                animated
                className="ml-2 text-xs px-1.5 py-0"
              >
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[200px]">
            {notifications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6 text-siso-text/70"
              >
                No notifications to display.
              </motion.div>
            ) : (
              <div className="divide-y divide-siso-border/30">
                <AnimatePresence initial={false}>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                      className={`py-2.5 px-4 flex items-start transition-colors ${!notification.read ? 'bg-gradient-to-r from-siso-orange/5 to-transparent' : ''}`}
                    >
                      <div className="mt-0.5 mr-2">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-xs text-siso-text-bold">{notification.title}</p>
                          <span className="text-xs text-siso-text/60 ml-2 whitespace-nowrap">{notification.time}</span>
                        </div>
                        <p className="text-xs text-siso-text/80 mt-0.5 line-clamp-2">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(notification.id)}
                            className="ml-1 text-xs h-auto p-1 hover:bg-siso-orange/10 hover:text-siso-orange"
                          >
                            <X size={12} />
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
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
                View all notifications
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
