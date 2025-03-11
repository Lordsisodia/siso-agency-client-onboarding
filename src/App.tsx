import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from 'next-themes';
import { Toaster } from "@/components/ui/toaster"
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import OnboardingSocial from './pages/OnboardingSocial';
import OnboardingInterests from './pages/OnboardingInterests';
import Support from './pages/Support';
import DocumentationCategory from './pages/DocumentationCategory';
import DocumentationArticle from './pages/DocumentationArticle';
import DocumentationQuestion from './pages/DocumentationQuestion';
import Project from './pages/Project';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';
import Plan from './pages/Plan';
import NewPlan from './pages/NewPlan';
import EditPlan from './pages/EditPlan';
import Task from './pages/Task';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import DailySummary from './pages/DailySummary';
import { useAuthSession } from '@/hooks/useAuthSession';
import { SidebarRoot } from '@/components/ui/sidebar';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import ImportDocumentation from './pages/ImportDocumentation';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthSession();
  const queryClient = new QueryClient();

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    // Check if the user is on the Auth page and has a session
    if (location.pathname === '/auth' && user) {
      // Redirect to the profile page
      navigate('/profile');
    }
  }, [location, navigate, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`font-siso text-siso-text bg-siso-bg min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Auth />} path="/auth" />
            <Route element={<OnboardingSocial />} path="/onboarding/social" />
            <Route element={<OnboardingInterests />} path="/onboarding/interests" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Support />} path="/support" />
            <Route element={<DocumentationCategory />} path="/support/:categorySlug" />
            <Route element={<DocumentationArticle />} path="/support/:categorySlug/:articleSlug" />
            <Route element={<DocumentationQuestion />} path="/support/question/:questionSlug" />
            <Route element={<Project />} path="/project/:projectId" />
            <Route element={<NewProject />} path="/project/new" />
            <Route element={<EditProject />} path="/project/edit/:projectId" />
            <Route element={<Plan />} path="/plan/:planId" />
            <Route element={<NewPlan />} path="/plan/new/:projectId" />
            <Route element={<EditPlan />} path="/plan/edit/:planId" />
            <Route element={<Task />} path="/task/:taskId" />
            <Route element={<NewTask />} path="/task/new/:planId" />
            <Route element={<EditTask />} path="/task/edit/:taskId" />
            <Route element={<DailySummary />} path="/daily-summary" />
            {/* Add the new route for documentation import */}
            <Route element={<ImportDocumentation />} path="/import-documentation" />
          </Routes>
        </ThemeProvider>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
