
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, ArrowRight, CheckCircle2, AlertCircle, InfoIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface NotificationsPanelProps {
  notifications: Notification[];
  onViewAll?: () => void;
  onMarkAsRead?: (id: string) => void;
  loading?: boolean;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
  notifications = [],
  onViewAll,
  onMarkAsRead,
  loading = false
}) => {
  // Function to get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'alert': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'info': 
      default: return <InfoIcon className="h-4 w-4 text-blue-500" />;
    }
  };
  
  // Format time to be more readable
  const formatTime = (timeString: string) => {
    return timeString; // In a real app, you would format this based on the time string format
  };

  if (loading) {
    return (
      <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </CardTitle>
          <Skeleton className="h-6 w-12 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-9 w-full mt-3" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors duration-300">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </CardTitle>
        <Badge variant="outline" className="bg-siso-primary/10 text-siso-primary border-siso-primary/20">
          {notifications.filter(n => !n.read).length} New
        </Badge>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-siso-text-muted">No new notifications</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <motion.div 
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group p-3 rounded-lg border transition-all duration-300 bg-siso-bg-card/50 
                             ${notification.read 
                               ? 'border-siso-border/20 hover:border-siso-border/30' 
                               : 'border-siso-primary/30 hover:border-siso-primary/50 bg-siso-primary/5'}`}
                  onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-siso-text-muted mt-0.5">{notification.message}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-siso-text-muted">{formatTime(notification.time)}</span>
                        {!notification.read ? (
                          <span className="text-xs text-siso-primary font-medium px-1.5 py-0.5 rounded-full bg-siso-primary/5">New</span>
                        ) : (
                          <span className="text-xs text-green-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Check className="h-3 w-3" /> Read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
        
        <Button 
          variant="ghost" 
          className="w-full mt-3 text-sm text-siso-text-muted hover:text-siso-text hover:bg-white/5 transition-colors"
          onClick={onViewAll}
        >
          View All Notifications
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
