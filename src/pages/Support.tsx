
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { seedDemoData } from '@/utils/seedData';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { DocumentationSection } from '@/components/support/DocumentationSection';
import { AiChatSection } from '@/components/support/AiChatSection';
import { Book, Search, MessagesSquare, BookOpen, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Support = () => {
  const [activeTab, setActiveTab] = useState('documentation');

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
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-siso-text-bold mb-2">Help Center</h1>
              <p className="text-siso-text/70">Find answers, resources, and get help with your project</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button className="bg-siso-orange hover:bg-siso-red text-white flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>

          {/* Quick access cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border hover:border-siso-orange/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="bg-siso-orange/10 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-siso-orange" />
                </div>
                <div>
                  <h3 className="font-medium">Documentation</h3>
                  <p className="text-sm text-siso-text/70">Browse guides and tutorials</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border hover:border-siso-orange/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="bg-siso-orange/10 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-siso-orange" />
                </div>
                <div>
                  <h3 className="font-medium">AI Assistant</h3>
                  <p className="text-sm text-siso-text/70">Get personalized help</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-siso-bg-card/20 backdrop-blur-sm border border-siso-border hover:border-siso-orange/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="bg-siso-orange/10 p-2 rounded-full">
                  <MessagesSquare className="h-5 w-5 text-siso-orange" />
                </div>
                <div>
                  <h3 className="font-medium">Community</h3>
                  <p className="text-sm text-siso-text/70">Connect with other users</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2">
              <MessagesSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documentation" className="mt-0">
            <DocumentationSection />
          </TabsContent>
          
          <TabsContent value="ai-chat" className="mt-0">
            <AiChatSection />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Support;
