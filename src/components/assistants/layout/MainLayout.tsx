
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-siso-bg to-siso-bg/95">
      {/* Apply a fixed maximum width to the content area and add proper padding */}
      <div className="flex-1 md:ml-16 w-full max-w-[calc(100%-4rem)]">
        {children}
      </div>
    </div>
  );
};
