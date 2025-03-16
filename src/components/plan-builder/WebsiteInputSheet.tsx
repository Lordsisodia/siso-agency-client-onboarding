
import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Globe, Facebook, Twitter, Linkedin, Instagram, Send, Loader2, Building, Users, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

interface WebsiteInputSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WebsiteInputData) => Promise<void>;
}

export interface WebsiteInputData {
  websiteUrl: string;
  companyName: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  projectGoals: string;
  targetAudience: string;
}

export function WebsiteInputSheet({ isOpen, onClose, onSubmit }: WebsiteInputSheetProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  });
  const [projectGoals, setProjectGoals] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basics');
  const { toast } = useToast();

  const updateSocialLink = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteUrl && !companyName) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a website URL or company name.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        websiteUrl,
        companyName,
        socialLinks,
        projectGoals,
        targetAudience
      });
      
      toast({
        title: "Information Submitted",
        description: "We'll analyze your information and help you create a project plan.",
      });
      
      onClose();
    } catch (error) {
      console.error("Error submitting website information:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem processing your information. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-none bg-transparent backdrop-blur-md overflow-y-auto max-h-screen">
        <div className="w-full h-full flex items-start justify-center">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full bg-card/95 backdrop-blur-sm border border-siso-border rounded-xl shadow-lg overflow-hidden max-w-md"
          >
            <div className="bg-gradient-to-r from-siso-red/10 to-siso-orange/10 p-4 border-b border-siso-border/30 sticky top-0 z-10">
              <h3 className="text-lg font-semibold mb-1 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">Project Information</h3>
              <p className="text-siso-text-muted text-xs">
                Provide details about your project to help us create a better plan
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="px-4 py-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
                <TabsList className="grid grid-cols-3 w-full bg-black/20 p-0.5">
                  <TabsTrigger 
                    value="basics" 
                    className="text-xs py-1.5 data-[state=active]:bg-siso-orange/10"
                  >
                    <Building className="w-3 h-3 mr-1" />
                    Basics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="social" 
                    className="text-xs py-1.5 data-[state=active]:bg-siso-orange/10"
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    Social
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details" 
                    className="text-xs py-1.5 data-[state=active]:bg-siso-orange/10"
                  >
                    <BarChart className="w-3 h-3 mr-1" />
                    Details
                  </TabsTrigger>
                </TabsList>

                {/* BASICS TAB */}
                <TabsContent value="basics" className="space-y-3 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-siso-text text-xs font-medium">
                      Company Name <span className="text-siso-red">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="h-8 text-sm bg-card/50 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl" className="text-siso-text text-xs font-medium">
                      Website URL
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-siso-text-muted" />
                      <Input
                        id="websiteUrl"
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="h-8 text-sm bg-card/50 pl-9 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text"
                        type="url"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* SOCIAL TAB */}
                <TabsContent value="social" className="space-y-3 mt-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-blue-500" />
                      <Input
                        placeholder="Facebook URL"
                        value={socialLinks.facebook}
                        onChange={(e) => updateSocialLink('facebook', e.target.value)}
                        className="h-8 text-sm bg-card/50 pl-9 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text"
                      />
                    </div>
                    
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-blue-400" />
                      <Input
                        placeholder="Twitter URL"
                        value={socialLinks.twitter}
                        onChange={(e) => updateSocialLink('twitter', e.target.value)}
                        className="h-8 text-sm bg-card/50 pl-9 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text"
                      />
                    </div>
                    
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-blue-600" />
                      <Input
                        placeholder="LinkedIn URL"
                        value={socialLinks.linkedin}
                        onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                        className="h-8 text-sm bg-card/50 pl-9 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text"
                      />
                    </div>
                    
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-pink-500" />
                      <Input
                        placeholder="Instagram URL"
                        value={socialLinks.instagram}
                        onChange={(e) => updateSocialLink('instagram', e.target.value)}
                        className="h-8 text-sm bg-card/50 pl-9 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* DETAILS TAB */}
                <TabsContent value="details" className="space-y-3 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="projectGoals" className="text-siso-text text-xs font-medium">
                      Project Goals
                    </Label>
                    <Textarea
                      id="projectGoals"
                      placeholder="What are you trying to achieve with this project?"
                      value={projectGoals}
                      onChange={(e) => setProjectGoals(e.target.value)}
                      className="min-h-[60px] text-sm bg-card/50 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience" className="text-siso-text text-xs font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-siso-text-muted" />
                      Target Audience
                    </Label>
                    <Textarea
                      id="targetAudience"
                      placeholder="Who is your target audience?"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="min-h-[60px] text-sm bg-card/50 focus:ring-1 focus:ring-siso-orange/50 transition-all border-siso-border/50 text-siso-text resize-none"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="pt-3 mt-3 border-t border-siso-border/30 flex justify-end sticky bottom-0 bg-card/95 pb-3">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-8 text-sm bg-gradient-to-r from-siso-red to-siso-orange text-white hover:opacity-90 transition-opacity shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      Submit
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
