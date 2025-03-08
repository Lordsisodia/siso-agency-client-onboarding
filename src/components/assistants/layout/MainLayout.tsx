
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="relative flex min-h-screen bg-gradient-to-b from-siso-bg to-siso-bg/95">
      <Sidebar />
      <div className="flex-1 w-full z-0 relative">
        {children}
      </div>
    </div>
  );
};
