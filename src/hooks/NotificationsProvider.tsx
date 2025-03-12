
import React, { createContext, useContext } from 'react';
import { useNotifications } from './useNotifications';
import { Notification } from '@/types/dashboard';

type NotificationsContextType = {
  notifications: Notification[];
  handleMarkAsRead: (id: string) => void;
  handleViewAll: () => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notificationsData = useNotifications();

  return (
    <NotificationsContext.Provider value={notificationsData}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotificationsContext must be used within a NotificationsProvider');
  }
  return context;
};
