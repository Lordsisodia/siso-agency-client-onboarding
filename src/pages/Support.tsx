
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { AiChatSection } from '@/components/support/AiChatSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessagesSquare, Book, Search, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, searchDocumentation } from '@/services/static-documentation.service';
import { DocCategory } from '@/types/documentation';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { GradientText } from '@/components/ui/gradient-text';

const Support = () => {
  const [activeTab, setActiveTab] = useState('documentation');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        if (searchQuery) {
          console.log("Searching documentation with query:", searchQuery);
          const results = await searchDocumentation(searchQuery);
          console.log("Search results:", results);
          setCategories(results);
        } else {
          console.log("Fetching all documentation categories");
          const allCategories = await fetchCategories();
          console.log("Fetched categories:", allCategories);
          setCategories(allCategories);
        }
      } catch (error) {
        console.error('Error loading documentation categories:', error);
        toast({
          title: "Error loading documentation",
          description: "There was a problem loading the documentation. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, [searchQuery, toast]);

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
      <div className="container mx-auto py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header with search */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <GradientText 
                colors={["#9b87f5", "#D946EF", "#F97316"]} 
                className="text-4xl sm:text-5xl font-bold mb-3"
              >
                Help Center
              </GradientText>
              <p className="text-siso-text/70 text-lg max-w-2xl mx-auto">
                Find answers to your questions and comprehensive guides to help you get started
              </p>
            </div>
            
            {/* Fancy animated search bar */}
            <div className={cn(
              "relative max-w-2xl mx-auto mt-8",
              activeTab === 'documentation' ? 'block' : 'hidden'
            )}>
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={handleSearch}
                onSubmit={handleSearchSubmit}
                className="shadow-lg"
              />
            </div>
          </div>

          <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-10 bg-siso-bg-alt/30 backdrop-blur-sm">
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
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-siso-text/50 mb-4" />
                  <p className="text-siso-text/70">Loading documentation...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <Card 
                      key={category.id} 
                      className="border border-siso-border hover:border-siso-orange/30 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-siso-bg-alt/20 backdrop-blur-sm overflow-hidden"
                      onClick={() => handleCategoryClick(category.slug)}
                    >
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-siso-orange/20 to-siso-red/20 p-3 rounded-lg">
                              {React.createElement(category.icon as React.ElementType, { 
                                className: "h-6 w-6 text-siso-orange" 
                              })}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg text-white mb-2">{category.title}</h3>
                              <p className="text-sm text-siso-text/70 mb-4 line-clamp-2">{category.description}</p>
                              <div className="flex items-center text-xs font-medium text-siso-orange/80 bg-siso-orange/10 py-1 px-2 rounded-full w-fit">
                                <Search className="h-3 w-3 mr-1" />
                                {category.questionCount} questions
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
