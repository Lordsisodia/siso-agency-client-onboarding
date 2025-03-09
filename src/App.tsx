
import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
// import { siteConfig } from './config/site'; // Removing this unused import

// Fixing the import statements to use default exports instead of named exports
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Support from './pages/Support';
import Portfolio from './pages/Portfolio';
import Networking from './pages/Networking';
import ProjectPlanning from './pages/ProjectPlanning';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking local storage)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/project-planning" element={<ProjectPlanning />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
