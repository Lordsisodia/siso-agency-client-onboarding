
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Users, Calendar, DollarSign, BarChart, Check } from 'lucide-react';
import { OnboardingWelcome } from './onboarding-steps/OnboardingWelcome';
import { ProjectType } from './onboarding-steps/ProjectType';
import { FeatureSelection } from './onboarding-steps/FeatureSelection';
import { BusinessContext } from './onboarding-steps/BusinessContext';
import { TimelineBudget } from './onboarding-steps/TimelineBudget';
import { OnboardingSummary } from './onboarding-steps/OnboardingSummary';
import { ProgressIndicator } from './components/ProgressIndicator';
import { BackgroundSparkles } from './components/BackgroundSparkles';
import { OnboardingStyles } from './components/OnboardingStyles';
import { NavigationButtons } from './components/NavigationButtons';

interface ProjectOnboardingProps {
  onComplete: (projectData: any) => void;
  onSkip: () => void;
}

export function ProjectOnboarding({ onComplete, onSkip }: ProjectOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState({
    projectType: '',
    projectScale: 'medium',
    businessContext: {
      companyName: '',
      industry: '',
      targetAudience: '',
      teamSize: '',
    },
    features: {} as Record<string, { selected: boolean, priority: string }>,
    timelineBudget: {
      timeline: '3-6 months',
      budget: '$10,000 - $50,000',
      goals: '',
    },
  });

  const steps = [
    { title: "Welcome", icon: <Building className="w-4 h-4" /> },
    { title: "Project Type", icon: <BarChart className="w-4 h-4" /> },
    { title: "Features", icon: <Check className="w-4 h-4" /> },
    { title: "Business", icon: <Users className="w-4 h-4" /> },
    { title: "Timeline", icon: <Calendar className="w-4 h-4" /> },
    { title: "Summary", icon: <DollarSign className="w-4 h-4" /> },
  ];

  const updateProjectData = (key: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(projectData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OnboardingWelcome onNext={handleNext} onSkip={onSkip} />;
      case 1:
        return (
          <ProjectType 
            projectType={projectData.projectType} 
            projectScale={projectData.projectScale} 
            updateProjectData={updateProjectData} 
          />
        );
      case 2:
        return (
          <FeatureSelection 
            features={projectData.features} 
            updateFeatures={(features) => updateProjectData('features', features)}
          />
        );
      case 3:
        return (
          <BusinessContext 
            businessContext={projectData.businessContext} 
            updateBusinessContext={(context) => updateProjectData('businessContext', context)}
          />
        );
      case 4:
        return (
          <TimelineBudget 
            timelineBudget={projectData.timelineBudget} 
            updateTimelineBudget={(data) => updateProjectData('timelineBudget', data)}
          />
        );
      case 5:
        return (
          <OnboardingSummary 
            projectData={projectData} 
            onEdit={(stepIndex) => setCurrentStep(stepIndex)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-xl border border-border shadow-xl overflow-hidden relative">
      <OnboardingStyles />
      
      {/* Background sparkles */}
      <BackgroundSparkles />
      
      {/* Progress Bar */}
      <ProgressIndicator 
        steps={steps}
        currentStep={currentStep}
        progressPercentage={progressPercentage}
      />

      {/* Step Content */}
      <div className="p-6 pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Navigation */}
      <NavigationButtons 
        currentStep={currentStep}
        totalSteps={steps.length}
        onBack={handleBack}
        onNext={handleNext}
        onComplete={onComplete}
        projectData={projectData}
      />
    </div>
  );
}
