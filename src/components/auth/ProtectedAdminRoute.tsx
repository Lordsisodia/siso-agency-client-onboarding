
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAdmin, loading } = useAdmin();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // First check if user is authenticated
    if (!authLoading && !user) {
      console.log('Not authenticated, redirecting to /');
      navigate('/', { replace: true });
      return;
    }
    
    // Then check if user is an admin
    if (!loading && !isAdmin) {
      console.log('Not authorized as admin, redirecting to /');
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have admin privileges to view this page",
      });
      navigate('/', { replace: true });
    }
  }, [loading, isAdmin, authLoading, user, navigate, toast]);

  // Show loading state
  if (loading || authLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <ProfileSkeleton />
      </div>
    );
  }
  
  // Render children only if user is an admin
  return isAdmin ? <>{children}</> : null;
};
