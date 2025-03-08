
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

// New page imports
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

function App() {
  const location = useLocation();
  const { user } = useAuthSession();

  // [Analysis] Enhanced logging to debug route matching issues
  useEffect(() => {
    console.info('Current pathname:', location.pathname);
  }, [location]);

  // Wrap protected content with MainLayout
  const protectedContent = (component: React.ReactNode) => (
    <ProtectedRoute>
      <MainLayout>
        {component}
      </MainLayout>
    </ProtectedRoute>
  );

  return (
    <>
      <Helmet>
        <title>SISO - Your one-stop AI Knowledge source</title>
        <meta name="description" content="SISO is the premier platform for AI learning, resources, and community." />
      </Helmet>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Protected routes - all using protectedContent wrapper */}
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
