
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, Info, AlertTriangle, MoreVertical, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Notification, NotificationType } from '@/pages/Dashboard';

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onViewAll: () => void;
}

export const NotificationsPanel = ({ 
  notifications, 
  onMarkAsRead, 
  onViewAll 
}: NotificationsPanelProps) => {
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
  
  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-400" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };
  
  const toggleExpanded = (id: string) => {
    if (expandedNotification === id) {
      setExpandedNotification(null);
    } else {
      setExpandedNotification(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-siso-border/50 hover:border-siso-border hover:shadow-md hover:shadow-siso-border/10 transition-all duration-300 overflow-hidden bg-gradient-to-b from-siso-bg/80 to-siso-bg/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-gradient-to-r from-siso-bg/90 to-siso-bg/70">
          <CardTitle className="text-sm font-semibold flex items-center tracking-tight">
            <Bell size={16} className="mr-2 text-siso-orange" />
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge variant="outline" className="ml-2 bg-siso-orange/10 text-siso-orange border-siso-orange/30 text-xs px-1.5 py-0">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewAll}
            className="h-7 px-2 text-xs text-siso-text/70 hover:text-siso-text-bold hover:bg-siso-bg/50"
          >
            <Eye size={14} className="mr-1" />
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[175px]">
            <div className="px-3 py-2 space-y-2">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Bell size={20} className="text-siso-text/30 mb-2" />
                  <p className="text-sm text-siso-text/50">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div 
                    key={notification.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      p-2.5 rounded-md border transition-all duration-200
                      ${!notification.read 
                        ? 'bg-siso-bg/70 border-siso-orange/20 shadow-sm' 
                        : 'bg-siso-bg/40 border-siso-border/10'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        p-1.5 rounded-full bg-siso-bg/70 flex-shrink-0 border
                        ${notification.type === 'info' && 'border-blue-500/20'} 
                        ${notification.type === 'success' && 'border-green-500/20'}
                        ${notification.type === 'warning' && 'border-amber-500/20'}
                        ${notification.type === 'alert' && 'border-red-500/20'}
                      `}>
                        {getIconForType(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`text-xs font-semibold truncate ${!notification.read ? 'text-siso-text-bold' : 'text-siso-text/80'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-[10px] text-siso-text/50 flex-shrink-0 ml-2">{notification.time}</span>
                        </div>
                        <p className={`text-xs ${expandedNotification === notification.id ? '' : 'line-clamp-1'} ${!notification.read ? 'text-siso-text/80' : 'text-siso-text/60'}`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-1.5 gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification.id)}
                          className="h-6 px-2 text-[10px] text-siso-text/60 hover:text-siso-text-bold hover:bg-siso-bg/50"
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(notification.id)}
                        className="h-6 w-6 p-0 text-siso-text/60 hover:text-siso-text-bold hover:bg-siso-bg/50"
                      >
                        <MoreVertical size={12} />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};
