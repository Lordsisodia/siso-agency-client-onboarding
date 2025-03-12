
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { WebsiteInputSheet } from '@/components/plan-builder/WebsiteInputSheet';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { ProjectHeader } from '@/components/project/ProjectHeader';
import { ProjectContent } from '@/components/project/ProjectContent';
import { useNewProject } from '@/hooks/use-new-project';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function NewProject() {
  const [isReady, setIsReady] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
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
    isLoading: chatLoading,
    chatError,
    handleGoBack,
    startChatInterface,
    handleWebsiteSubmit,
    sendMessage
  } = useNewProject();

  // Effect to ensure auth is initialized and user is logged in
  useEffect(() => {
    // Wait for auth to initialize and then set ready state
    if (!loading) {
      console.log('NewProject: Auth loaded, user:', !!user);
      
      // Set a small delay to ensure transitions are smooth
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [loading, user, navigate]);

  console.log("NewProject render - showOnboarding:", showOnboarding, "showChat:", showChat, "isReady:", isReady, "user:", !!user, "loading:", loading);

  // Show loading state while components initialize
  if (loading || !isReady) {
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
          isLoading={chatLoading}
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
