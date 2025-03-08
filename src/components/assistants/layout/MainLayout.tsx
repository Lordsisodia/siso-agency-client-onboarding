
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-siso-bg to-siso-bg/95">
        <Sidebar />
        <SidebarInset className="flex-1 md:ml-0">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
