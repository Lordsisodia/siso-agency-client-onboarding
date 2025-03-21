
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuthSession } from '@/hooks/useAuthSession';
import { SidebarRoot, SidebarProvider } from '@/components/ui/sidebar';

// Pages
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Preferences from '@/pages/Preferences';
import Calendar from '@/pages/Calendar';
import Organization from '@/pages/Organization';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Profile from '@/pages/Profile';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Tasks from '@/pages/Tasks';
import ThankYou from '@/pages/ThankYou';
import Assistants from '@/pages/Assistants';
import Assistant from '@/pages/Assistant';
import PlanBuilder from '@/pages/PlanBuilder';
import SisoAI from '@/pages/SisoAI';
import CompanyProfile from '@/pages/CompanyProfile';
import ProjectDetails from '@/pages/ProjectDetails';
import NewProject from '@/pages/NewProject';
import Portfolio from '@/pages/Portfolio';
import CryptoExchange from '@/pages/CryptoExchange';
import Notifications from '@/pages/Notifications';
import CompetitiveAnalysis from '@/pages/CompetitiveAnalysis';
import LeaderboardPage from '@/pages/LeaderboardPage';
import Support from '@/pages/Support';
import PendingTasks from '@/pages/PendingTasks';
import DocumentationCategoryPage from '@/pages/support/DocumentationCategoryPage';
import DocumentationArticlePage from '@/pages/support/DocumentationArticlePage';
import DocumentationQuestionPage from '@/pages/support/DocumentationQuestionPage';
import ImportDocumentationPage from '@/pages/support/ImportDocumentationPage';
import Admin from '@/pages/Admin';

// Onboarding pages
import SocialOnboarding from '@/pages/onboarding/social';
import OnboardingCongratulations from '@/pages/onboarding/congratulations';

import './App.css';

// Create a child component that uses router hooks after Router is initialized
const AppContent = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthSession();
  
  // Handle navigation based on auth state
  useEffect(() => {
    if (!loading) {
      if (user && window.location.pathname === '/') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-siso-orange border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/thank-you" element={<ThankYou />} />
        
        {/* Onboarding Routes */}
        <Route path="/onboarding/social" element={<SocialOnboarding />} />
        <Route path="/onboarding/congratulations" element={<OnboardingCongratulations />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
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
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/preferences" element={
          <ProtectedRoute>
            <Preferences />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } />
        <Route path="/organization" element={
          <ProtectedRoute>
            <Organization />
          </ProtectedRoute>
        } />
        <Route path="/assistants" element={
          <ProtectedRoute>
            <Assistants />
          </ProtectedRoute>
        } />
        <Route path="/assistants/:id" element={
          <ProtectedRoute>
            <Assistant />
          </ProtectedRoute>
        } />
        <Route path="/plan-builder" element={
          <ProtectedRoute>
            <PlanBuilder />
          </ProtectedRoute>
        } />
        <Route path="/siso-ai" element={
          <ProtectedRoute>
            <SisoAI />
          </ProtectedRoute>
        } />
        <Route path="/company-profile" element={
          <ProtectedRoute>
            <CompanyProfile />
          </ProtectedRoute>
        } />
        <Route path="/projects/:id" element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        } />
        <Route path="/new-project" element={
          <ProtectedRoute>
            <NewProject />
          </ProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        } />
        <Route path="/crypto-exchange" element={
          <ProtectedRoute>
            <CryptoExchange />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/competitive-analysis" element={
          <ProtectedRoute>
            <CompetitiveAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        } />
        <Route path="/pending-tasks" element={
          <ProtectedRoute>
            <PendingTasks />
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        } />
        <Route path="/support/documentation/:categorySlug" element={
          <ProtectedRoute>
            <DocumentationCategoryPage />
          </ProtectedRoute>
        } />
        <Route path="/support/documentation/:categorySlug/:articleSlug" element={
          <ProtectedRoute>
            <DocumentationArticlePage />
          </ProtectedRoute>
        } />
        <Route path="/support/documentation/:categorySlug/question/:questionSlug" element={
          <ProtectedRoute>
            <DocumentationQuestionPage />
          </ProtectedRoute>
        } />
        <Route path="/support/import-documentation" element={
          <ProtectedRoute>
            <ImportDocumentationPage />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster />
      <Sonner />
    </SidebarProvider>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
