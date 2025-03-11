
import React, { useEffect, useState } from 'react';
import { seedDemoData } from '@/utils/seedData';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { AiChatSection } from '@/components/support/AiChatSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessagesSquare, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getCategories, searchDocumentation } from '@/services/documentation.service';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const [activeTab, setActiveTab] = useState('documentation');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const categories = searchQuery 
    ? searchDocumentation(searchQuery) 
    : getCategories();

  useEffect(() => {
    seedDemoData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/support/${categoryId}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with search */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-siso-text-bold mb-2">Help Center</h1>
            <p className="text-siso-text/70 mb-6">Find comprehensive guides and documentation to help you get started</p>
            
            {/* Prominent search bar */}
            <div className="relative max-w-2xl mx-auto mb-4">
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
              {/* Documentation Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="border border-siso-border hover:border-siso-border-hover cursor-pointer transition-all duration-300"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-siso-orange/10 p-2 rounded-full">
                          <category.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-lg">{category.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {category.articleCount} articles
                            </Badge>
                          </div>
                          <p className="text-sm text-siso-text/70">{category.description}</p>
                          
                          {/* Preview of top articles */}
                          {category.articles.slice(0, 2).map((article) => (
                            <div key={article.id} className="mt-3 border-t border-siso-border pt-2">
                              <h4 className="text-sm font-medium">{article.title}</h4>
                              <p className="text-xs text-siso-text/60">{article.excerpt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {categories.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-siso-text/70">No results found for "{searchQuery}"</p>
                </div>
              )}
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
