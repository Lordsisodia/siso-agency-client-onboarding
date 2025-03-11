
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { AiChatSection } from '@/components/support/AiChatSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessagesSquare, Book } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, searchDocumentation } from '@/services/supabase-documentation.service';
import { DocCategory } from '@/services/supabase-documentation.service';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { cn } from '@/lib/utils';

const Support = () => {
  const [activeTab, setActiveTab] = useState('documentation');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          const results = await searchDocumentation(searchQuery);
          setCategories(results);
        } else {
          const allCategories = await fetchCategories();
          setCategories(allCategories);
        }
      } catch (error) {
        console.error('Error loading documentation categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The search is already triggered by the onChange event
    // This is just to handle the form submission
  };

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/support/${categorySlug}`);
  };

  // Define search placeholders related to documentation
  const searchPlaceholders = [
    "How do I create a new project?",
    "What are the features of the AI assistant?",
    "How to manage my account?",
    "Troubleshooting login issues",
    "How to add team members to a project?",
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with search */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-siso-text-bold mb-2">Help Center</h1>
            <p className="text-siso-text/70 mb-6">Find comprehensive guides and documentation to help you get started</p>
            
            {/* Fancy animated search bar */}
            <div className={cn(
              "relative max-w-2xl mx-auto mb-8",
              activeTab === 'documentation' ? 'block' : 'hidden'
            )}>
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={handleSearch}
                onSubmit={handleSearchSubmit}
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
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse h-6 w-24 bg-siso-bg-alt/50 rounded"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Card 
                      key={category.id} 
                      className="border border-siso-border hover:border-siso-border-hover cursor-pointer transition-all duration-300"
                      onClick={() => handleCategoryClick(category.slug)}
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
              )}
              
              {!isLoading && categories.length === 0 && (
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
