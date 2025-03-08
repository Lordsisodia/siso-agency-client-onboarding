
import React from 'react';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-siso-bg to-siso-bg/95">
      <div className="flex-1 md:ml-16">{children}</div>
    </div>
  );
};
