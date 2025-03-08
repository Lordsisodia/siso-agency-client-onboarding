
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import ThankYou from '@/pages/ThankYou';
import Index from '@/pages/Index';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

// Core app pages
import Dashboard from '@/pages/Dashboard';
import Projects from '@/pages/Projects';
import PlanBuilder from '@/pages/PlanBuilder';
import CompanyProfile from '@/pages/CompanyProfile';
import ResourceHub from '@/pages/ResourceHub';
import Portfolio from '@/pages/Portfolio';
import Notifications from '@/pages/Notifications';

import { Toaster } from '@/components/ui/toaster';
import { useAuthSession } from '@/hooks/useAuthSession';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const location = useLocation();
  const { user, loading } = useAuthSession();

  // [Analysis] Enhanced logging to debug route matching issues
  useEffect(() => {
    console.info('Current pathname:', location.pathname);
    console.info('Auth state:', { user: !!user, loading });
  }, [location, user, loading]);

  // Fallback component for error boundary
  const ErrorFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-siso-bg">
      <div className="max-w-md p-8 space-y-4 bg-siso-bg-alt rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-siso-text">Something went wrong</h2>
        <p className="text-siso-text">
          An unexpected error occurred. Please refresh the page or try again later.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-siso-red text-white rounded hover:bg-siso-red/90"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );

  // Wrap protected content with MainLayout
  const protectedContent = (component: React.ReactNode) => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProtectedRoute>
        <MainLayout>
          {component}
        </MainLayout>
      </ProtectedRoute>
    </ErrorBoundary>
  );

  // Public routes that don't require authentication
  const publicRoutes = (
    <>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </>
  );

  // Protected routes that require authentication
  const authenticatedRoutes = (
    <>
      <Route path="/home" element={protectedContent(<Home />)} />
      
      {/* Primary routes */}
      <Route path="/dashboard" element={protectedContent(<Dashboard />)} />
      <Route path="/projects" element={protectedContent(<Projects />)} />
      <Route path="/plan-builder" element={protectedContent(<PlanBuilder />)} />
      <Route path="/company-profile" element={protectedContent(<CompanyProfile />)} />
      <Route path="/resource-hub" element={protectedContent(<ResourceHub />)} />
      <Route path="/portfolio" element={protectedContent(<Portfolio />)} />
      <Route path="/notifications" element={protectedContent(<Notifications />)} />
      
      {/* Profile route */}
      <Route path="/profile" element={protectedContent(<Profile />)} />
    </>
  );

  // Fallback route - direct users based on authentication
  const fallbackRoute = (
    <Route 
      path="*" 
      element={
        loading ? (
          <ProfileSkeleton />
        ) : (
          <Navigate to={user ? "/dashboard" : "/auth"} replace />
        )
      } 
    />
  );

  return (
    <>
      <Helmet>
        <title>SISO - Your one-stop AI Knowledge source</title>
        <meta name="description" content="SISO is the premier platform for AI learning, resources, and community." />
      </Helmet>

      <Routes>
        {publicRoutes}
        {authenticatedRoutes}
        {fallbackRoute}
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
