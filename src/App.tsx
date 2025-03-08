
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import SisoEducation from '@/pages/SisoEducation';
import VideoDetail from '@/pages/VideoDetail';
import EducatorDetail from '@/pages/EducatorDetail';
import SocialOnboarding from '@/pages/onboarding/social';
import OnboardingCongratulations from '@/pages/onboarding/congratulations';
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
import CompetitiveAnalysis from '@/pages/CompetitiveAnalysis';
import Notifications from '@/pages/Notifications';

import { Toaster } from '@/components/ui/toaster';
import { useAuthSession } from '@/hooks/useAuthSession';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function App() {
  const location = useLocation();
  const { user } = useAuthSession();

  // [Analysis] Enhanced logging to debug route matching issues
  useEffect(() => {
    console.info('Current pathname:', location.pathname);
  }, [location]);

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

        {/* Protected routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        {/* Primary routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        } />
        <Route path="/plan-builder" element={
          <ProtectedRoute>
            <PlanBuilder />
          </ProtectedRoute>
        } />
        <Route path="/company-profile" element={
          <ProtectedRoute>
            <CompanyProfile />
          </ProtectedRoute>
        } />
        <Route path="/resource-hub" element={
          <ProtectedRoute>
            <ResourceHub />
          </ProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        } />
        <Route path="/competitive-analysis" element={
          <ProtectedRoute>
            <CompetitiveAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        
        {/* Profile route */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Education routes (simplified) */}
        <Route path="/education" element={
          <ProtectedRoute>
            <SisoEducation />
          </ProtectedRoute>
        } />
        <Route path="/education/video/:videoId" element={
          <ProtectedRoute>
            <VideoDetail />
          </ProtectedRoute>
        } />
        <Route path="/education/educator/:slug" element={
          <ProtectedRoute>
            <EducatorDetail />
          </ProtectedRoute>
        } />
        
        {/* Onboarding routes */}
        <Route path="/onboarding/social" element={
          <ProtectedRoute>
            <SocialOnboarding />
          </ProtectedRoute>
        } />
        <Route path="/onboarding/congratulations" element={
          <ProtectedRoute>
            <OnboardingCongratulations />
          </ProtectedRoute>
        } />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
