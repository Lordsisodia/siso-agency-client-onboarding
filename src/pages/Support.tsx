
import React, { useEffect, useState } from 'react';
import { seedDemoData } from '@/utils/seedData';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { DocumentationSection } from '@/components/support/DocumentationSection';
import { AiChatSection } from '@/components/support/AiChatSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessagesSquare, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Support = () => {
  const [activeTab, setActiveTab] = useState('documentation');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    seedDemoData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Simplified header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-siso-text-bold mb-2">Help Center</h1>
            <p className="text-siso-text/70 mb-6">Find comprehensive guides and documentation to help you get started</p>
            
            {/* Prominent search bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-siso-text/60" />
              <Input
                type="search"
                placeholder="Search documentation..."
                className="pl-10 bg-siso-bg-card/20 border-siso-border w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
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
              <DocumentationSection searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="ai-chat" className="mt-0">
              <AiChatSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

export default Support;
