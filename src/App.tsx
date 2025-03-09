
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Tools from '@/pages/Tools';
import SocialOnboarding from '@/pages/onboarding/social';
import OnboardingCongratulations from '@/pages/onboarding/congratulations';
import ThankYou from '@/pages/ThankYou';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

// New page imports
import Dashboard from '@/pages/Dashboard';
import Projects from '@/pages/Projects';
import PlanBuilder from '@/pages/PlanBuilder';
import NewProject from '@/pages/NewProject';
import CompanyProfile from '@/pages/CompanyProfile';
import ResourceHub from '@/pages/ResourceHub';
import Portfolio from '@/pages/Portfolio';
import Support from '@/pages/Support';
import Notifications from '@/pages/Notifications';

import { Toaster } from '@/components/ui/toaster';
import { useAuthSession } from '@/hooks/useAuthSession';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/thank-you" element={<ThankYou />} />
        
        {/* Company Profile route - accessible to all users */}
        <Route path="/company-profile" element={<CompanyProfile />} />

        {/* Home route - redirect to plan-builder */}
        <Route path="/home" element={<Navigate to="/plan-builder" replace />} />
        
        {/* All routes now accessible without authentication */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/plan-builder" element={<PlanBuilder />} />
        <Route path="/plan-builder/:projectId" element={<PlanBuilder />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/support" element={<Support />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tools" element={<Tools />} />
        
        <Route path="/onboarding/social" element={<SocialOnboarding />} />
        <Route path="/onboarding/congratulations" element={<OnboardingCongratulations />} />

        {/* Modified fallback route with more specific handling */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
