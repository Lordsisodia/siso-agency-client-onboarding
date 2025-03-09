
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ProjectDocumentation } from '@/components/education/ProjectDocumentation';
import { seedDemoData } from '@/utils/seedData';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';

const Support = () => {
  useEffect(() => {
    // Seed demo data when the Support page loads
    seedDemoData();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6 relative">
        <Waves 
          waveSpeedX={0.015}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          lineColor="rgba(255,255,255,0.1)"
          className="absolute inset-0 -z-10"
        />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-siso-text-bold mb-2">Support</h1>
          <p className="text-siso-text/70">Get help with your project or explore our documentation</p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
            <TabsTrigger value="chat">Chat Assistance</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <div className="bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border rounded-xl p-6 min-h-[70vh]">
              <ChatInterface 
                title="Support Assistant"
                welcomeMessage="Hello! I'm your support assistant. How can I help with your project today?"
                inputPlaceholder="Ask me anything about your project..."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="docs" className="mt-0">
            <div className="bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border rounded-xl p-6 min-h-[70vh]">
              <ProjectDocumentation />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Support;
