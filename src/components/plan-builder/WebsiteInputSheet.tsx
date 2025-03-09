
import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Globe, Facebook, Twitter, Linkedin, Instagram, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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
        description: "There was a problem processing your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-none bg-transparent">
        <div className="w-full h-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-card border border-siso-border rounded-lg shadow-lg overflow-hidden max-w-sm"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-siso-text">Project Information</h3>
              <p className="text-siso-text-muted mb-6 text-sm">
                Provide your website, socials, or basic information to help us analyze and plan your project better.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-siso-text-muted" />
                    Website URL
                  </Label>
                  <Input
                    id="websiteUrl"
                    placeholder="https://example.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="bg-card text-siso-text border-siso-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-card text-siso-text border-siso-border"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Social Media Links</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <Input
                        placeholder="Facebook URL"
                        value={socialLinks.facebook}
                        onChange={(e) => updateSocialLink('facebook', e.target.value)}
                        className="bg-card text-siso-text border-siso-border"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-blue-400" />
                      <Input
                        placeholder="Twitter URL"
                        value={socialLinks.twitter}
                        onChange={(e) => updateSocialLink('twitter', e.target.value)}
                        className="bg-card text-siso-text border-siso-border"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-700" />
                      <Input
                        placeholder="LinkedIn URL"
                        value={socialLinks.linkedin}
                        onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                        className="bg-card text-siso-text border-siso-border"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <Input
                        placeholder="Instagram URL"
                        value={socialLinks.instagram}
                        onChange={(e) => updateSocialLink('instagram', e.target.value)}
                        className="bg-card text-siso-text border-siso-border"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectGoals">Project Goals</Label>
                  <Textarea
                    id="projectGoals"
                    placeholder="What are you trying to achieve with this project?"
                    value={projectGoals}
                    onChange={(e) => setProjectGoals(e.target.value)}
                    className="min-h-24 bg-card text-siso-text border-siso-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    placeholder="Who is your target audience?"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="min-h-20 bg-card text-siso-text border-siso-border"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-siso-red to-siso-orange text-white hover:opacity-90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
