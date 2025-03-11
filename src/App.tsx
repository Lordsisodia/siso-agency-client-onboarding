
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import SocialOnboarding from '@/pages/onboarding/social';
import OnboardingCongratulations from '@/pages/onboarding/congratulations';
import ThankYou from '@/pages/ThankYou';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

// Core pages
import Dashboard from '@/pages/Dashboard';
import Projects from '@/pages/Projects';
import PlanBuilder from '@/pages/PlanBuilder';
import NewProject from '@/pages/NewProject';
import Support from '@/pages/Support';
import Notifications from '@/pages/Notifications';
import PendingTasks from '@/pages/PendingTasks';
import Portfolio from '@/pages/Portfolio';

import { Toaster } from '@/components/ui/toaster';
import { useAuthSession } from '@/hooks/core';

function App() {
  const location = useLocation();
  const { user } = useAuthSession();

  // Simple route logging
  useEffect(() => {
    console.info('Current pathname:', location.pathname);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>SISO - Your business planning platform</title>
        <meta name="description" content="SISO is the premier platform for business planning and resource management." />
      </Helmet>

      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/thank-you" element={<ThankYou />} />
        
        {/* Default route - show dashboard for both logged in and not logged in users */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Core routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/plan-builder" element={<PlanBuilder />} />
        <Route path="/plan-builder/:projectId" element={<PlanBuilder />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/support" element={<Support />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/pending-tasks" element={<PendingTasks />} />
        <Route path="/portfolio" element={<Portfolio />} />
        
        {/* Onboarding routes */}
        <Route path="/onboarding/social" element={<SocialOnboarding />} />
        <Route path="/onboarding/congratulations" element={<OnboardingCongratulations />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
