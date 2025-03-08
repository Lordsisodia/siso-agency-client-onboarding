
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowUnauth?: boolean;
  publicRoutes?: string[];
}

export const ProtectedRoute = ({ children, allowUnauth = false, publicRoutes = ['/company-profile'] }: ProtectedRouteProps) => {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    if (!loading && !user && !allowUnauth && !isPublicRoute) {
      navigate('/auth');
    }
  }, [user, loading, navigate, allowUnauth, isPublicRoute]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return <>{children}</>;
};
