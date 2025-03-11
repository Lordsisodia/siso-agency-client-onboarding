
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, ArrowRight, Check, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export interface NotificationsPanelProps {
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
  // Get appropriate background color based on notification type
  const getNotificationTypeBg = (type: string) => {
    switch (type) {
      case 'alert': 
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'update': 
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'message': 
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: 
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  if (loading) {
    return (
      <Card className="border border-siso-border/40 bg-black/20 backdrop-blur-sm">
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BellRing className="h-4 w-4" />
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
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="outline" className="bg-siso-primary/10 text-siso-primary border-siso-primary/20">
            {notifications.length} New
          </Badge>
        </motion.div>
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
                  className="group p-3 rounded-lg border border-siso-border/20 hover:border-siso-border/40 
                             transition-all duration-300 bg-siso-bg-card/50 hover:bg-siso-bg-card/70"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm group-hover:text-white transition-colors">{notification.title}</h4>
                    <Badge className={`text-xs ${getNotificationTypeBg(notification.type)}`}>
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-siso-text-muted mb-2 group-hover:text-siso-text transition-colors">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-siso-text-muted">{notification.time}</span>
                    {onMarkAsRead && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Mark read
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
        
        {onViewAll && (
          <Button 
            variant="ghost" 
            className="w-full mt-3 text-sm text-siso-text-muted hover:text-siso-text hover:bg-white/5 transition-colors"
            onClick={onViewAll}
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
