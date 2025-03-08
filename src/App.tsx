import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanBuilder from './pages/PlanBuilder';
import { Toaster } from '@/components/ui/toaster';
import AssistantSetupPage from './pages/AssistantSetupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanBuilder />} />
        <Route path="/assistant-setup" element={<AssistantSetupPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
