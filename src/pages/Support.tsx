
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { seedDemoData } from '@/utils/seedData';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { Card } from '@/components/ui/card';

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
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Project Documentation</h2>
                  <p className="text-lg mb-4">
                    Welcome to the SISO platform documentation. This guide provides information about how to use the platform effectively.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Create a new project from the Dashboard or Projects section</li>
                    <li>Use the Plan Builder to define your project requirements</li>
                    <li>Track your project progress and metrics from the Dashboard</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-siso-border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Plan Builder</h4>
                      <p>Create detailed project plans with requirements, features, and specifications.</p>
                    </div>
                    <div className="border border-siso-border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">AI Assistant</h4>
                      <p>Get help and guidance from our AI assistant throughout your project.</p>
                    </div>
                    <div className="border border-siso-border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Project Dashboard</h4>
                      <p>Monitor project progress, metrics, and key performance indicators.</p>
                    </div>
                    <div className="border border-siso-border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Support</h4>
                      <p>Access help and documentation when needed through our support center.</p>
                    </div>
                  </div>
                </section>

                <section className="bg-siso-bg-highlight/10 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Need more help?</h3>
                  <p>
                    If you can't find what you're looking for in the documentation, 
                    switch to the Chat Assistance tab to get personalized help from our AI assistant.
                  </p>
                </section>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Support;
