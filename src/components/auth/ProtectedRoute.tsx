
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowUnauth?: boolean;
  publicRoutes?: string[];
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loading } = useAuthSession();
  
  if (loading) {
    return <ProfileSkeleton />;
  }

  // Simply return children without any authentication checks
  return <>{children}</>;
};
