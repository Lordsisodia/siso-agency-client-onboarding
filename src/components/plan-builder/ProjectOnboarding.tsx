import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { CheckCircle2, PencilLine, BarChart, HelpCircle, WandSparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressIndicator } from './components/ProgressIndicator';
import { BackgroundSparkles } from './components/BackgroundSparkles';
import { OnboardingStyles } from './components/OnboardingStyles';
import { NavigationButtons } from './components/NavigationButtons';

interface OnboardingWelcomeProps {
  onNext: () => void;
  onSkip?: () => void;
}

interface ProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (data: Record<string, any>) => void;
}

interface FeatureSelectionProps {
  features: Record<string, { selected: boolean; priority: string }>;
  updateFeatures: (features: Record<string, { selected: boolean; priority: string }>) => void;
}

interface ProjectOnboardingProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

export function ProjectOnboarding({ onComplete, onSkip }: ProjectOnboardingProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [projectData, setProjectData] = useState({
    projectType: '',
    projectScale: 'medium',
    businessContext: {
      companyName: '',
      industry: '',
      targetAudience: '',
      teamSize: '',
    },
    timelineBudget: {
      timeline: '',
      budget: '',
      goals: '',
    },
    features: {} as Record<string, { selected: boolean; priority: string }>,
  });
  
  const updateProjectData = useCallback((section: string, data: any) => {
    setProjectData(prev => {
      if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        return { 
          ...prev, 
          [section]: { ...(prev[section as keyof typeof prev] as object || {}), ...data }
        };
      } else {
        return {
          ...prev,
          [section]: data
        };
      }
    });
  }, []);
  
  const steps = [
    { title: 'Welcome', icon: <WandSparkles className="w-4 h-4" /> },
    { title: 'Project Type', icon: <PencilLine className="w-4 h-4" /> },
    { title: 'Business Context', icon: <BarChart className="w-4 h-4" /> },
    { title: 'Timeline & Budget', icon: <HelpCircle className="w-4 h-4" /> },
    { title: 'Features', icon: <CheckCircle2 className="w-4 h-4" /> },
    { title: 'Summary', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];
  
  const handleNext = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      
      onComplete(projectData);
      
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
  
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <OnboardingWelcome onNext={handleNext} onSkip={onSkip} />;
      case 1:
        return (
          <ProjectType 
            projectType={projectData.projectType}
            projectScale={projectData.projectScale}
            updateProjectData={(data) => updateProjectData('projectType', data)}
          />
        );
      case 2:
        return (
          <BusinessContext 
            businessContext={projectData.businessContext}
            updateBusinessContext={(data) => updateProjectData('businessContext', data)}
          />
        );
      case 3:
        return (
          <TimelineBudget 
            timelineBudget={projectData.timelineBudget}
            updateTimelineBudget={(data) => updateProjectData('timelineBudget', data)}
          />
        );
      case 4:
        return (
          <FeatureSelection 
            features={projectData.features}
            updateFeatures={(features) => updateProjectData('features', features)}
          />
        );
      case 5:
        return (
          <OnboardingSummary 
            projectData={projectData}
            onEdit={(section) => {
              const sectionMap: Record<string, number> = {
                projectType: 1,
                businessContext: 2,
                timelineBudget: 3,
                features: 4,
              };
              setStep(sectionMap[section] || 0);
            }}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="relative bg-card rounded-xl shadow-lg overflow-hidden">
      <ProgressIndicator
        steps={steps}
        currentStep={step}
        progressPercentage={progressPercentage}
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
          
          {step > 0 && step < steps.length - 1 && (
            <NavigationButtons
              onNext={handleNext}
              onBack={handleBack}
              isFirstStep={step === 0}
              loading={loading}
            />
          )}
          
          {step === steps.length - 1 && (
            <NavigationButtons
              onBack={handleBack}
              onComplete={handleComplete}
              isLastStep={true}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
      
      <OnboardingStyles />
    </div>
  );
}
