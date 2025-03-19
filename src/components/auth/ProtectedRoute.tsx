
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Only redirect if loading is complete and user is null
    if (!loading && !user) {
      console.log('ProtectedRoute: Not authenticated, redirecting to /');
      navigate('/', { replace: true });
    }
  }, [loading, user, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <ProfileSkeleton />
      </div>
    );
  }
  
  // Render children only if authenticated
  return user ? <>{children}</> : null;
};
