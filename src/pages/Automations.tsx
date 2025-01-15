import { useQuery } from '@tanstack/react-query';
import { Download, ExternalLink, Heart, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface Automation {
  id: string;
  name: string;
  description: string | null;
  category: string;
  pricing_type: string | null;
  rating: number | null;
  reviews_count: number | null;
  downloads_count: number | null;
  likes_count: number | null;
  website_url: string | null;
  use_cases: string[] | null;
  input_variables: string[] | null;
}

export default function Automations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  const { data: automations, isLoading, error } = useQuery({
    queryKey: ['automations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('category', 'automation');
      
      if (error) throw error;
      return data as Automation[];
    },
  });

  const filteredAutomations = automations?.filter(automation => 
    !searchQuery || 
    automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    automation.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAutomationClick = (automation: Automation) => {
    setSelectedAutomation(automation);
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
              <h1 className="text-4xl font-bold text-siso-text-bold">
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
                        <p className="text-xs text-siso-text/80">{automation.pricing_type || 'Free'}</p>
                      </div>
                    </div>
                    {automation.description && (
                      <p className="mt-2 text-xs text-siso-text line-clamp-2">
                        {automation.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3 text-siso-text/60" />
                        <span className="text-xs text-siso-text">{automation.downloads_count || '0'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-siso-red" />
                        <span className="text-xs text-siso-text">{automation.likes_count || '0'}</span>
                      </div>
                      {automation.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-siso-orange" />
                          <span className="text-xs text-siso-text">
                            {automation.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
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
                    {selectedAutomation.website_url && (
                      <Button
                        className="w-full justify-start gap-2"
                        onClick={() => window.open(selectedAutomation.website_url!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </Button>
                    )}

                    {selectedAutomation.use_cases && selectedAutomation.use_cases.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-siso-text-bold">Use Cases</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedAutomation.use_cases.map((useCase, index) => (
                            <span 
                              key={index}
                              className="text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-500"
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-siso-text/5">
                        <Star className="h-5 w-5 text-siso-orange mx-auto mb-1" />
                        <div className="text-sm text-siso-text-bold">{selectedAutomation.rating?.toFixed(1) || '-'}</div>
                        <div className="text-xs text-siso-text">Rating</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-siso-text/5">
                        <Download className="h-5 w-5 text-siso-text/60 mx-auto mb-1" />
                        <div className="text-sm text-siso-text-bold">{selectedAutomation.downloads_count || '0'}</div>
                        <div className="text-xs text-siso-text">Downloads</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-siso-text/5">
                        <Heart className="h-5 w-5 text-siso-red mx-auto mb-1" />
                        <div className="text-sm text-siso-text-bold">{selectedAutomation.likes_count || '0'}</div>
                        <div className="text-xs text-siso-text">Likes</div>
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