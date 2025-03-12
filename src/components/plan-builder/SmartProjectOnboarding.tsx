
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Building, Globe, Share2, BarChart, Target, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BackgroundSparkles } from './components/BackgroundSparkles';
import { OnboardingStyles } from './components/OnboardingStyles';
import { saveQuestionFeedback } from '@/services/documentation-feedback.service';

interface SmartProjectOnboardingProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

export function SmartProjectOnboarding({ onComplete, onSkip }: SmartProjectOnboardingProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [projectData, setProjectData] = useState({
    businessContext: {
      companyName: '',
      website: '',
      socialLinks: {
        twitter: '',
        instagram: '',
        linkedin: '',
        facebook: ''
      },
      industry: '',
      targetAudience: ''
    },
    projectType: '',
    goals: '',
    features: {} as Record<string, { selected: boolean; priority: string }>,
  });
  
  const updateBusinessContext = useCallback((field: string, value: string) => {
    setProjectData(prev => ({
      ...prev,
      businessContext: {
        ...prev.businessContext,
        [field]: value
      }
    }));
  }, []);
  
  const updateSocialLink = useCallback((platform: string, value: string) => {
    setProjectData(prev => ({
      ...prev,
      businessContext: {
        ...prev.businessContext,
        socialLinks: {
          ...prev.businessContext.socialLinks,
          [platform]: value
        }
      }
    }));
  }, []);
  
  const steps = [
    { title: 'Company Name', icon: <Building className="w-4 h-4" /> },
    { title: 'Website URL', icon: <Globe className="w-4 h-4" /> },
    { title: 'Social Media', icon: <Share2 className="w-4 h-4" /> },
    { title: 'Industry & Audience', icon: <BarChart className="w-4 h-4" /> },
    { title: 'Main Goal', icon: <Target className="w-4 h-4" /> },
    { title: 'Summary', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];
  
  const handleNext = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const stepId = `onboarding_step_${step}`;
      saveQuestionFeedback(stepId, 'helpful');
    }
  }, [step, steps.length]);
  
  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);
  
  const handleComplete = useCallback(async () => {
    try {
      setLoading(true);
      
      const finalData = {
        ...projectData,
        businessContext: {
          ...projectData.businessContext,
          socialLinks: Object.fromEntries(
            Object.entries(projectData.businessContext.socialLinks)
              .filter(([_, value]) => value.trim() !== '')
          )
        }
      };
      
      onComplete(finalData);
      
      toast({
        title: "Onboarding completed!",
        description: "Your project details have been saved. Let's start planning!",
      });
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: "Error",
        description: "There was a problem completing the onboarding process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [projectData, onComplete, toast]);
  
  const progressPercentage = ((step) / (steps.length - 1)) * 100;
  
  const renderCompanyNameStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">What's your company called?</h3>
          <p className="text-muted-foreground">Let's start with the basics to personalize your experience</p>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="companyName" className="text-base">Company Name</Label>
          <Input
            id="companyName"
            value={projectData.businessContext.companyName}
            onChange={(e) => updateBusinessContext('companyName', e.target.value)}
            placeholder="e.g., Acme Corporation"
            className="w-full"
          />
          
          <div className="pt-4">
            <Button 
              onClick={handleNext} 
              disabled={!projectData.businessContext.companyName.trim()}
              className="w-full"
            >
              Next
            </Button>
            <Button 
              variant="ghost" 
              onClick={onSkip}
              className="w-full mt-2"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderWebsiteStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Do you have a website?</h3>
          <p className="text-muted-foreground">We can analyze it to better understand your needs</p>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="website" className="text-base">Website URL</Label>
          <Input
            id="website"
            value={projectData.businessContext.website}
            onChange={(e) => updateBusinessContext('website', e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full"
          />
          
          <div className="pt-4">
            <Button 
              onClick={handleNext}
              className="w-full"
            >
              {projectData.businessContext.website.trim() ? 'Next' : 'No website yet'}
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderSocialMediaStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Any social media to share?</h3>
          <p className="text-muted-foreground">Add your platforms or skip if you're not online yet</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="twitter" className="text-base">Twitter/X</Label>
              <Input
                id="twitter"
                value={projectData.businessContext.socialLinks.twitter}
                onChange={(e) => updateSocialLink('twitter', e.target.value)}
                placeholder="https://twitter.com/yourusername"
                className="w-full mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin" className="text-base">LinkedIn</Label>
              <Input
                id="linkedin"
                value={projectData.businessContext.socialLinks.linkedin}
                onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/yourcompany"
                className="w-full mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="instagram" className="text-base">Instagram</Label>
              <Input
                id="instagram"
                value={projectData.businessContext.socialLinks.instagram}
                onChange={(e) => updateSocialLink('instagram', e.target.value)}
                placeholder="https://instagram.com/yourusername"
                className="w-full mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="facebook" className="text-base">Facebook</Label>
              <Input
                id="facebook"
                value={projectData.businessContext.socialLinks.facebook}
                onChange={(e) => updateSocialLink('facebook', e.target.value)}
                placeholder="https://facebook.com/yourpage"
                className="w-full mt-1"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleNext}
              className="w-full"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderIndustryAudienceStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Your industry & audience</h3>
          <p className="text-muted-foreground">Help us understand your business better</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="industry" className="text-base">Industry</Label>
            <Input
              id="industry"
              value={projectData.businessContext.industry}
              onChange={(e) => updateBusinessContext('industry', e.target.value)}
              placeholder="e.g., Technology, E-Commerce, Healthcare"
              className="w-full mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="targetAudience" className="text-base">Target Audience</Label>
            <Textarea
              id="targetAudience"
              value={projectData.businessContext.targetAudience}
              onChange={(e) => updateBusinessContext('targetAudience', e.target.value)}
              placeholder="Describe who your product or service is for"
              className="w-full mt-1 min-h-[100px]"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleNext}
              disabled={!projectData.businessContext.industry.trim()}
              className="w-full"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderMainGoalStep = () => {
    const goals = [
      "Increase Sales",
      "Boost Brand Awareness",
      "Improve User Engagement",
      "Streamline Operations",
      "Provide Better Customer Support",
      "Launch a New Product"
    ];
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">What's your main goal?</h3>
          <p className="text-muted-foreground">Help us understand what success looks like for you</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {goals.map(goal => (
              <Button
                key={goal}
                variant={projectData.goals === goal ? "default" : "outline"}
                onClick={() => {
                  setProjectData(prev => ({
                    ...prev,
                    goals: goal
                  }));
                }}
                className="h-auto py-3 text-left justify-start"
              >
                {goal}
              </Button>
            ))}
          </div>
          
          <div>
            <Label htmlFor="customGoal" className="text-base">Or enter a custom goal:</Label>
            <Input
              id="customGoal"
              value={projectData.goals.startsWith("Custom: ") 
                ? projectData.goals.substring(8) 
                : goals.includes(projectData.goals) ? "" : projectData.goals}
              onChange={(e) => {
                const value = e.target.value;
                if (value.trim()) {
                  setProjectData(prev => ({
                    ...prev,
                    goals: value.startsWith("Custom: ") ? value : `Custom: ${value}`
                  }));
                }
              }}
              placeholder="Enter your specific goal"
              className="w-full mt-1"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleNext}
              disabled={!projectData.goals}
              className="w-full"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderSummaryStep = () => {
    const hasSocialLinks = Object.values(projectData.businessContext.socialLinks).some(link => link.trim() !== '');
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Looking good! Here's a summary</h3>
          <p className="text-muted-foreground">Review your information before we create your project</p>
        </div>
        
        <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
          <div className="grid gap-2">
            <div>
              <span className="font-medium">Company:</span> {projectData.businessContext.companyName || "Not specified"}
            </div>
            
            {projectData.businessContext.website && (
              <div>
                <span className="font-medium">Website:</span> {projectData.businessContext.website}
              </div>
            )}
            
            {hasSocialLinks && (
              <div>
                <span className="font-medium">Social Media:</span> {Object.entries(projectData.businessContext.socialLinks)
                  .filter(([_, value]) => value.trim() !== '')
                  .map(([platform]) => platform)
                  .join(', ')}
              </div>
            )}
            
            <div>
              <span className="font-medium">Industry:</span> {projectData.businessContext.industry || "Not specified"}
            </div>
            
            {projectData.businessContext.targetAudience && (
              <div>
                <span className="font-medium">Target Audience:</span> {projectData.businessContext.targetAudience}
              </div>
            )}
            
            <div>
              <span className="font-medium">Main Goal:</span> {projectData.goals || "Not specified"}
            </div>
          </div>
        </div>
        
        <div className="pt-4 space-y-2">
          <Button 
            onClick={handleComplete}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating your project..." : "Complete & Create Project"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="w-full"
            disabled={loading}
          >
            Go Back & Edit
          </Button>
        </div>
      </div>
    );
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderCompanyNameStep();
      case 1:
        return renderWebsiteStep();
      case 2:
        return renderSocialMediaStep();
      case 3:
        return renderIndustryAudienceStep();
      case 4:
        return renderMainGoalStep();
      case 5:
        return renderSummaryStep();
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-card rounded-xl shadow-lg overflow-hidden">
      <div className="bg-muted h-2 w-full">
        <div 
          className="bg-gradient-to-r from-siso-red to-siso-orange h-full transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Step {step + 1} of {steps.length}</span>
          <span className="text-sm text-muted-foreground">• {steps[step].title}</span>
        </div>
        
        {step > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="h-8 px-2"
          >
            Back
          </Button>
        )}
      </div>
      
      <BackgroundSparkles />
      
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="pt-6 px-6 pb-6">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {renderStepContent()}
          </motion.div>
        </CardContent>
      </Card>
      
      <OnboardingStyles />
    </div>
  );
}
