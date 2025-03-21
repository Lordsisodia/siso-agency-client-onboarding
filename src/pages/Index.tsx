
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { LoadingFallback } from '@/components/landing/sections/LoadingFallback';
import { lazy } from 'react';

// Lazy load the LandingPage component
const LandingPage = lazy(() => 
  import('@/components/landing/LandingPage').then(module => ({
    default: module.default
  }))
);

export default function Index() {
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();
  const [isPageMounted, setIsPageMounted] = useState(false);

  // Start preloading the landing page as soon as the component mounts
  useEffect(() => {
    setIsPageMounted(true);
    
    // Preload the landing page component
    const preloadLandingPage = async () => {
      try {
        await import('@/components/landing/LandingPage');
      } catch (error) {
        console.error('Error preloading landing page:', error);
      }
    };
    
    preloadLandingPage();
  }, []);

  useEffect(() => {
    if (user && !loading) {
      // If user is logged in, redirect to dashboard
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show a more efficient loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-siso-orange/30 border-t-siso-orange animate-spin" />
          <p className="text-siso-text-muted animate-pulse">Loading your experience...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show the enhanced landing page with optimized loading
  return (
    <div className="relative w-full">
      <Suspense fallback={
        <div className="w-full h-screen bg-black flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-siso-orange/30 border-t-siso-orange animate-spin" />
            <p className="text-siso-text-muted animate-pulse">Loading SISO experience...</p>
          </div>
        </div>
      }>
        {isPageMounted && <LandingPage />}
      </Suspense>
    </div>
  );
}
