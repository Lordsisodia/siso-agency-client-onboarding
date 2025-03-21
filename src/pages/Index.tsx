
import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { LoadingFallback } from '@/components/landing/sections/LoadingFallback';
import LandingPage from '@/components/landing/LandingPage';

export default function Index() {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      // If user is logged in, redirect to dashboard
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingFallback />;
  }

  // If not logged in, show the landing page
  return (
    <div className="relative w-full">
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    </div>
  );
}
