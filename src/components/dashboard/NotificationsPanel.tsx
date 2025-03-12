
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Notification } from '@/types/dashboard';
import { motion } from 'framer-motion';

interface NotificationsPanelProps {
  notifications: Notification[];
  onViewAll?: () => void;
  onMarkAsRead?: (id: string) => void;
  loading?: boolean;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
  notifications, 
  onViewAll,
  onMarkAsRead,
  loading = false
}) => {
  const handleMarkAsRead = (id: string) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30 text-green-500';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
      case 'alert':
        return 'bg-red-500/10 border-red-500/30 text-red-500';
      case 'info':
      default:
        return 'bg-blue-500/10 border-blue-500/30 text-blue-500';
    }
  };

  return (
    <Card className="border border-slate-800/60 bg-gradient-to-br from-slate-900/50 to-slate-800/30 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
        <CardTitle className="text-lg font-medium">Notifications</CardTitle>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-siso-orange" />
            <span className="text-sm text-siso-text-muted">Loading...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-siso-orange" />
            <span className="text-sm text-siso-text-muted">
              {notifications.filter(n => !n.read).length} unread
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {loading ? (
            // Loading skeleton state
            <>
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="flex flex-col p-3 rounded-md border border-slate-800/50 bg-slate-800/20 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-32 bg-gray-700/50 rounded"></div>
                    <div className="h-3 w-20 bg-gray-700/50 rounded"></div>
                  </div>
                  <div className="h-3 w-full bg-gray-700/50 rounded mb-2"></div>
                  <div className="h-3 w-3/4 bg-gray-700/50 rounded"></div>
                </motion.div>
              ))}
            </>
          ) : (
            // Actual notification items
            <>
              {notifications.map((notification) => (
                <motion.div 
                  key={notification.id} 
                  variants={itemVariants}
                  className={`flex flex-col p-3 rounded-md border ${notification.read ? 'border-slate-800/30 bg-slate-800/10' : 'border-slate-700/40 bg-slate-800/20'} hover:bg-slate-800/30 transition-colors cursor-pointer`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-medium ${notification.read ? 'text-slate-400' : 'text-white'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-slate-500">{notification.time}</span>
                  </div>
                  <p className={`text-xs ${notification.read ? 'text-slate-500' : 'text-slate-300'}`}>
                    {notification.message}
                  </p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeStyles(notification.type)}`}>
                      {notification.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </>
          )}
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-siso-text-muted hover:text-white"
              onClick={onViewAll}
              disabled={loading}
            >
              View all notifications
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
