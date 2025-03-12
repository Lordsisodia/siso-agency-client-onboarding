import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import NewProject from '@/pages/NewProject';
import PlanBuilder from '@/pages/PlanBuilder';
import Projects from '@/pages/Projects';
import Assistants from '@/pages/Assistants';
import Assistant from '@/pages/Assistant';
import LeaderboardPage from '@/pages/LeaderboardPage';
import { AuthProvider } from '@/hooks/useAuth';
import { ToastProvider } from '@/hooks/use-toast';
import { ViewportLoadingProvider } from '@/hooks/useViewportLoading';
import { NotificationsProvider } from '@/hooks/useNotifications';
import { DashboardStatsProvider } from '@/hooks/useDashboardStats';
import { LeaderboardDataProvider } from '@/hooks/leaderboard/useLeaderboardData';
import ProjectDetails from '@/pages/ProjectDetails';

function App() {
  useEffect(() => {
    // Log the current base URL
    console.log("Base URL:", import.meta.env.BASE_URL);
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL || "/"}>
      <AuthProvider>
        <ToastProvider>
          <ViewportLoadingProvider>
            <NotificationsProvider>
              <DashboardStatsProvider>
                <LeaderboardDataProvider>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/new-project" element={<NewProject />} />
                    <Route path="/project/:projectId" element={<ProjectDetails />} />
                    <Route path="/plan-builder" element={<PlanBuilder />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/assistants" element={<Assistants />} />
                    <Route path="/assistants/:id" element={<Assistant />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                  </Routes>
                </LeaderboardDataProvider>
              </DashboardStatsProvider>
            </NotificationsProvider>
          </ViewportLoadingProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
