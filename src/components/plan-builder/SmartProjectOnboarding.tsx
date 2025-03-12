
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Building, Globe, Share2, BarChart, Target, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BackgroundSparkles } from './components/BackgroundSparkles';
import { OnboardingStyles } from './components/OnboardingStyles';
import { saveQuestionFeedback } from '@/services/documentation-feedback.service';

// Import step components
import { CompanyNameStep } from './steps/CompanyNameStep';
import { WebsiteStep } from './steps/WebsiteStep';
import { SocialMediaStep } from './steps/SocialMediaStep';
import { IndustryAudienceStep } from './steps/IndustryAudienceStep';
import { GoalStep } from './steps/GoalStep';
import { SummaryStep } from './steps/SummaryStep';
import { OnboardingProgress } from './OnboardingProgress';

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
  
  const updateGoal = useCallback((value: string) => {
    setProjectData(prev => ({
      ...prev,
      goals: value
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
  
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <CompanyNameStep
            companyName={projectData.businessContext.companyName}
            onChange={(value) => updateBusinessContext('companyName', value)}
            onNext={handleNext}
            onSkip={onSkip}
          />
        );
      case 1:
        return (
          <WebsiteStep
            website={projectData.businessContext.website}
            onChange={(value) => updateBusinessContext('website', value)}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <SocialMediaStep
            socialLinks={projectData.businessContext.socialLinks}
            onSocialLinkChange={updateSocialLink}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <IndustryAudienceStep
            industry={projectData.businessContext.industry}
            targetAudience={projectData.businessContext.targetAudience}
            onIndustryChange={(value) => updateBusinessContext('industry', value)}
            onTargetAudienceChange={(value) => updateBusinessContext('targetAudience', value)}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <GoalStep
            goal={projectData.goals}
            onGoalChange={updateGoal}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <SummaryStep
            projectData={projectData}
            onComplete={handleComplete}
            onBack={handleBack}
            isLoading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-card rounded-xl shadow-lg overflow-hidden">
      <OnboardingProgress
        currentStep={step}
        steps={steps}
        onBack={handleBack}
      />
      
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
