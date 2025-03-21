
import React from 'react';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

// Simplified admin route that doesn't require authentication or admin privileges
export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  // For now, we're removing the authentication and admin check requirements
  // This will allow direct access to the admin panel without login
  
  return <>{children}</>;
};
