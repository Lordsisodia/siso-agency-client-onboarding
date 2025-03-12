
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves';
import { FloatingOrbs } from '@/components/effects/FloatingOrbs';
import { WebsiteInputSheet } from '@/components/plan-builder/WebsiteInputSheet';
import { ManualInputSheet } from '@/components/plan-builder/ManualInputSheet';
import { ProjectHeader } from '@/components/project/ProjectHeader';
import { ProjectContent } from '@/components/project/ProjectContent';
import { useNewProject } from '@/hooks/use-new-project';

export default function NewProject() {
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

  return (
    <MainLayout>
      {/* Add FloatingOrbs background effect */}
      <FloatingOrbs />
      
      <div className="container max-w-6xl mx-auto py-6 px-4 min-h-screen relative">
        {/* Waves background with adjusted z-index */}
        <Waves 
          lineColor="rgba(255, 87, 34, 0.08)" 
          backgroundColor="transparent" 
          waveSpeedX={0.01} 
          waveSpeedY={0.004} 
          waveAmpX={28} 
          waveAmpY={16} 
          className="absolute inset-0 z-0 w-full h-full opacity-80" 
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
