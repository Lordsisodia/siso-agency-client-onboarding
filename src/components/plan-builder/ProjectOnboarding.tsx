
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, ArrowLeft, Building, Users, Calendar, DollarSign, BarChart } from 'lucide-react';
import { OnboardingWelcome } from './onboarding-steps/OnboardingWelcome';
import { ProjectType } from './onboarding-steps/ProjectType';
import { FeatureSelection } from './onboarding-steps/FeatureSelection';
import { BusinessContext } from './onboarding-steps/BusinessContext';
import { TimelineBudget } from './onboarding-steps/TimelineBudget';
import { OnboardingSummary } from './onboarding-steps/OnboardingSummary';

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

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-xl border border-border shadow-md overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full px-6 pt-6">
        <Progress value={progressPercentage} className="h-2" indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange" />
        
        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`flex flex-col items-center transition-colors ${
                index <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                index < currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : index === currentStep 
                  ? 'border-2 border-primary text-primary' 
                  : 'border border-muted-foreground'
              }`}>
                {index < currentStep ? <Check className="w-4 h-4" /> : step.icon}
              </div>
              <span className="hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
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
      </div>

      {/* Step Navigation */}
      {currentStep > 0 && (
        <div className="p-4 border-t flex justify-between bg-muted/30">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} size="sm" className="ml-auto">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={() => onComplete(projectData)} 
              size="sm" 
              className="ml-auto bg-gradient-to-r from-siso-red to-siso-orange text-white hover:opacity-90"
            >
              Start Planning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
