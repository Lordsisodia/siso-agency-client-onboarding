
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import AINews from '@/pages/AINews';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import BlogPost from '@/pages/BlogPost';
import ChatGPTAssistants from '@/pages/ChatGPTAssistants';
import SisoEducation from '@/pages/SisoEducation';
import Tools from '@/pages/Tools';
import Economy from '@/pages/Economy';
import VideoDetail from '@/pages/VideoDetail';
import ToolPage from '@/pages/ToolPage';
import EducatorDetail from '@/pages/EducatorDetail';
import Community from '@/pages/Community';
import Networking from '@/pages/Networking';
import SisoAI from '@/pages/SisoAI';
import LearnNetwork from '@/pages/LearnNetwork';
import HowToEarn from '@/pages/HowToEarn';
import Leaderboards from '@/pages/Leaderboards';
import SocialOnboarding from '@/pages/onboarding/social';
import OnboardingCongratulations from '@/pages/onboarding/congratulations';
import ThankYou from '@/pages/ThankYou';
import Automations from '@/pages/Automations';
import Crypto from '@/pages/Crypto';
import CryptoExchange from '@/pages/CryptoExchange';
import DailyNews from '@/pages/DailyNews';
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
    
    // Test specific route patterns
    const economyRoutes = ['/economy', '/economy/earn', '/economy/leaderboards', '/economy/crypto-exchange'];
    economyRoutes.forEach(route => {
      console.info(`Testing route ${route}:`, location.pathname === route || location.pathname.startsWith(route + '/'));
    });
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
        <Route path="/ai-news" element={<AINews />} />
        {/* [Analysis] Modified route to use 'postId' consistent with the BlogPost component */}
        <Route path="/ai-news/:postId" element={<BlogPost />} />
        <Route path="/daily-news" element={<DailyNews />} />
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
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/competitive-analysis" element={<CompetitiveAnalysis />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assistants" element={<ChatGPTAssistants />} />
        <Route path="/education" element={<SisoEducation />} />
        <Route path="/education/video/:videoId" element={<VideoDetail />} />
        <Route path="/education/educator/:slug" element={<EducatorDetail />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:toolId" element={<ToolPage />} />
        
        {/* Economy section routes - grouped together for clarity */}
        <Route path="/economy" element={<Economy />} />
        <Route path="/economy/earn" element={<HowToEarn />} />
        <Route path="/economy/leaderboards" element={<Leaderboards />} />
        <Route path="/economy/crypto-exchange" element={<CryptoExchange />} />
        
        <Route path="/community" element={<Community />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/siso" element={<SisoAI />} />
        <Route path="/learn-network" element={<LearnNetwork />} />
        <Route path="/onboarding/social" element={<SocialOnboarding />} />
        <Route path="/onboarding/congratulations" element={<OnboardingCongratulations />} />
        <Route path="/automations" element={<Automations />} />
        <Route path="/crypto" element={<Crypto />} />

        {/* Modified fallback route with more specific handling */}
        <Route path="/economy/*" element={<Navigate to="/economy" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
