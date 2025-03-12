
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { supabase } from '@/integrations/supabase/client';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import NewProject from '@/pages/NewProject';
import PlanBuilder from '@/pages/PlanBuilder';
import Projects from '@/pages/Projects';
import ProjectDetails from '@/pages/ProjectDetails';
import Calendar from '@/pages/Calendar';
import Tasks from '@/pages/Tasks';
import Support from '@/pages/Support';
import Profile from '@/pages/Profile';
import Portfolio from '@/pages/Portfolio';
import { AuthProvider } from '@/hooks/useAuth';
import DocumentationCategoryPage from '@/pages/support/DocumentationCategoryPage';
import DocumentationArticlePage from '@/pages/support/DocumentationArticlePage';
import DocumentationQuestionPage from '@/pages/support/DocumentationQuestionPage';

function App() {
  useEffect(() => {
    // Log the current base URL
    console.log("Base URL:", import.meta.env.BASE_URL);
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL || "/"}>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/plan-builder" element={<PlanBuilder />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support/:categorySlug" element={<DocumentationCategoryPage />} />
          <Route path="/support/:categorySlug/:articleSlug" element={<DocumentationArticlePage />} />
          <Route path="/support/:categorySlug/:articleSlug/:questionSlug" element={<DocumentationQuestionPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
