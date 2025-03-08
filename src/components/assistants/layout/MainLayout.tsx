
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-siso-bg to-siso-bg/95">
      <div className="flex-1 md:ml-16">{children}</div>
    </div>
  );
};
