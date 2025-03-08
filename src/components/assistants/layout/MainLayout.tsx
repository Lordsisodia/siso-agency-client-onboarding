
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-siso-bg to-siso-bg/95">
      <Sidebar />
      <main className="flex-1 flex flex-col relative pl-16 md:pl-0 w-full overflow-auto">
        <div className="flex-grow w-full p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
