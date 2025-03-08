
import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { LoadingFallback } from '@/components/landing/sections/LoadingFallback';
import LandingPage from '@/components/landing/LandingPage';

export default function Index() {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index: auth state', { user: !!user, loading });
    
    if (user && !loading) {
      console.log('Index: user is authenticated, redirecting to home');
      navigate('/home', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <div className="relative">
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    </div>
  );
}
