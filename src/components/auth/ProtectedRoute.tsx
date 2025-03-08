
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowUnauth?: boolean;
}

export const ProtectedRoute = ({ children, allowUnauth = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && !allowUnauth) {
      console.log('No user found, redirecting to auth page');
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate, allowUnauth]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  // Only render children if user is authenticated or allowUnauth is true
  if (!user && !allowUnauth) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
};
