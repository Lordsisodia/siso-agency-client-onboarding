
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import NewProject from '@/pages/NewProject';
import PlanBuilder from '@/pages/PlanBuilder';
import Projects from '@/pages/Projects';
import ProjectDetails from '@/pages/ProjectDetails';
import { AuthProvider } from '@/hooks/useAuth';

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
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
