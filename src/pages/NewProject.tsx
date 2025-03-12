
import React, { Suspense, useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { WebsiteInputSheet } from '@/components/plan-builder/WebsiteInputSheet';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { ProjectHeader } from '@/components/project/ProjectHeader';
import { ProjectContent } from '@/components/project/ProjectContent';
import { useNewProject } from '@/hooks/use-new-project';
import { useAuth } from '@/hooks/useAuth';

export default function NewProject() {
  const [isReady, setIsReady] = useState(false);
  const { user } = useAuth();
  
  const {
    projectId,
    isWebsiteInputOpen,
    setIsWebsiteInputOpen,
    isManualInputOpen,
    setIsManualInputOpen,
    showOnboarding,
    showChat,
    connectionError,
    messages,
    isLoading,
    chatError,
    handleGoBack,
    startChatInterface,
    handleWebsiteSubmit,
    sendMessage
  } = useNewProject();

  // Add effect to ensure auth is initialized before rendering content
  useEffect(() => {
    // Set a small delay to ensure auth state is properly initialized
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [user]);

  console.log("NewProject render - showOnboarding:", showOnboarding, "showChat:", showChat, "isReady:", isReady, "user:", !!user);

  // Show loading state while components initialize
  if (!isReady) {
    return (
      <MainLayout>
        <div className="container max-w-6xl mx-auto py-6 px-4 min-h-screen relative flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-siso-orange border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-siso-text-muted">Loading project...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-6 px-4 min-h-screen relative">
        {/* Waves background */}
        <Waves 
          lineColor="rgba(255, 87, 34, 0.05)" 
          backgroundColor="transparent" 
          waveSpeedX={0.01} 
          waveSpeedY={0.004} 
          waveAmpX={24} 
          waveAmpY={12} 
          className="absolute inset-0 z-0 w-full h-full" 
        />
        
        {/* Page header */}
        <ProjectHeader 
          onGoBack={handleGoBack}
          onWebsiteAnalysis={() => setIsWebsiteInputOpen(true)}
          onManualInput={() => setIsManualInputOpen(true)}
          showActionButtons={showChat}
        />

        {/* Main content */}
        <ProjectContent
          showOnboarding={showOnboarding}
          showChat={showChat}
          connectionError={connectionError}
          projectId={projectId}
          messages={messages}
          isLoading={isLoading}
          onStartChat={startChatInterface}
          onSkipOnboarding={() => startChatInterface()}
        />
        
        {/* Input Sheets */}
        <WebsiteInputSheet 
          isOpen={isWebsiteInputOpen}
          onClose={() => setIsWebsiteInputOpen(false)}
          onSubmit={handleWebsiteSubmit}
        />
        
        <ManualInputSheet
          isOpen={isManualInputOpen}
          onClose={() => setIsManualInputOpen(false)}
          onSubmitToAI={(prompt, formData) => {
            return sendMessage(prompt, undefined, formData);
          }}
        />
      </div>
    </MainLayout>
  );
}
