
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Index from '@/pages/Index';
import Landing from '@/pages/Landing';
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
import DocumentationCategoryPage from '@/pages/support/DocumentationCategoryPage';
import DocumentationArticlePage from '@/pages/support/DocumentationArticlePage';
import DocumentationQuestionPage from '@/pages/support/DocumentationQuestionPage';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL || "/"}>
      <AuthProvider>
        <Toaster />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/new-project" element={
            <ProtectedRoute>
              <NewProject />
            </ProtectedRoute>
          } />
          <Route path="/project/:projectId" element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          } />
          <Route path="/plan-builder" element={
            <ProtectedRoute>
              <PlanBuilder />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          } />
          <Route path="/support/:categorySlug" element={
            <ProtectedRoute>
              <DocumentationCategoryPage />
            </ProtectedRoute>
          } />
          <Route path="/support/:categorySlug/:articleSlug" element={
            <ProtectedRoute>
              <DocumentationArticlePage />
            </ProtectedRoute>
          } />
          <Route path="/support/:categorySlug/:articleSlug/:questionSlug" element={
            <ProtectedRoute>
              <DocumentationQuestionPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
