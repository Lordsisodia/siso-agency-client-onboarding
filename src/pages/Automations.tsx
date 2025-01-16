import { useQuery } from '@tanstack/react-query';
import { Download, ExternalLink, Heart, Search, Star, Bot, Zap, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface Automation {
  id: string;
  name: string;
  description: string | null;
  category: string;
  platform: string | null;
  setup_guide: string | null;
  integration_url: string | null;
  profile_image_url: string | null;
}

type AutomationCategory = 'all' | 'featured' | 'linkedin' | 'instagram' | 'x' | 'reddit' | 'youtube' | 'tiktok' | 'general';

export default function Automations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AutomationCategory>('all');

  const { data: automations, isLoading, error } = useQuery({
    queryKey: ['automations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automations')  // Changed from 'tools' to 'automations'
        .select('*');
      
      if (error) throw error;
      return data as Automation[];
    },
  });

  const filteredAutomations = automations?.filter(automation => {
    const matchesSearch = !searchQuery || 
      automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'featured') {
      return matchesSearch && automation.platform === 'Multiple';
    }
    return matchesSearch && 
      (automation.platform?.toLowerCase() === selectedCategory);
  });

  const handleAutomationClick = (automation: Automation) => {
    setSelectedAutomation(automation);
  };

  const getCategoryCount = (category: AutomationCategory) => {
    if (!automations) return 0;
    
    if (category === 'all') return automations.length;
    if (category === 'featured') {
      return automations.filter(a => a.platform === 'Multiple').length;
    }
    return automations.filter(a => a.platform?.toLowerCase() === category).length;
  };

  if (error) {
    return <div className="text-red-500">Error loading automations. Please try again later.</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-siso-bg to-siso-bg/95">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
                SISO Automations
              </h1>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-siso-text/60" />
                <Input
                  placeholder="Search automations..."
                  className="pl-10 bg-siso-text/5 border-siso-text/10 focus-visible:ring-siso-orange"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Callouts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <Alert className="bg-siso-text/5 border border-siso-text/10">
                <Bot className="h-4 w-4 text-siso-orange" />
                <AlertDescription className="text-siso-text/80">
                  <span className="font-semibold text-siso-text">Automation Library:</span> Browse our collection of pre-built automations for various social media platforms and general tasks.
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-siso-text/5 border border-siso-text/10">
                <Zap className="h-4 w-4 text-siso-orange" />
                <AlertDescription className="text-siso-text/80">
                  <span className="font-semibold text-siso-text">Quick Setup:</span> Click on any automation to view details, use cases, and setup instructions.
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-siso-text/5 border border-siso-text/10">
                <ArrowRight className="h-4 w-4 text-siso-orange" />
                <AlertDescription className="text-siso-text/80">
                  <span className="font-semibold text-siso-text">Get Started:</span> Filter by platform, browse featured automations, or search for specific tasks you want to automate.
                </AlertDescription>
              </Alert>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setSelectedCategory(value as AutomationCategory)}>
              <TabsList className="w-full justify-start bg-siso-text/5 border border-siso-text/10 flex-wrap">
                <TabsTrigger value="all" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  All
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('all')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="featured" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  Featured
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('featured')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  LinkedIn
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('linkedin')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="instagram" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  Instagram
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('instagram')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="x" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  X
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('x')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="reddit" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  Reddit
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('reddit')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="youtube" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  YouTube
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('youtube')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="tiktok" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  TikTok
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('tiktok')}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="general" className="data-[state=active]:bg-siso-orange/20 data-[state=active]:text-siso-orange">
                  General
                  <Badge variant="secondary" className="ml-2 bg-siso-text/10">
                    {getCategoryCount('general')}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="text-siso-text">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAutomations?.map((automation) => (
                <Card 
                  key={automation.id} 
                  className="group bg-card/50 backdrop-blur border-siso-text/10 hover:border-siso-orange/50 transition-all duration-300 cursor-pointer"
                  onClick={() => handleAutomationClick(automation)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:animate-glow">
                        <Download className="w-3 h-3 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-siso-text-bold truncate">{automation.name}</h3>
                        <p className="text-xs text-siso-text/80">{automation.platform || 'General'}</p>
                      </div>
                    </div>
                    {automation.description && (
                      <p className="mt-2 text-xs text-siso-text line-clamp-2">
                        {automation.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Sheet open={!!selectedAutomation} onOpenChange={() => setSelectedAutomation(null)}>
            <SheetContent className="bg-siso-bg border-l border-siso-text/10 w-full sm:max-w-xl">
              {selectedAutomation && (
                <>
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-siso-text-bold">
                      {selectedAutomation.name}
                    </SheetTitle>
                    <SheetDescription className="text-siso-text">
                      {selectedAutomation.description}
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {selectedAutomation.integration_url && (
                      <Button
                        className="w-full justify-start gap-2"
                        onClick={() => window.open(selectedAutomation.integration_url!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Integration
                      </Button>
                    )}

                    {selectedAutomation.setup_guide && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-siso-text-bold">Setup Guide</h3>
                        <p className="text-sm text-siso-text whitespace-pre-line">
                          {selectedAutomation.setup_guide}
                        </p>
                      </div>
                    )}

                    <div className="p-4 rounded-lg bg-siso-text/5">
                      <h3 className="text-sm font-semibold text-siso-text-bold mb-2">Platform</h3>
                      <div className="text-sm text-siso-text">
                        {selectedAutomation.platform || 'General'}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
