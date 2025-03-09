
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle2, Building, Users, Calendar, DollarSign, BarChart, HelpCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OnboardingWelcome } from './onboarding-steps/OnboardingWelcome';
import { EnhancedProjectType } from './onboarding-steps/EnhancedProjectType';
import { EnhancedFeatureSelection } from './onboarding-steps/EnhancedFeatureSelection';
import { EnhancedBusinessContext } from './onboarding-steps/EnhancedBusinessContext';
import { EnhancedTimelineBudget } from './onboarding-steps/EnhancedTimelineBudget';
import { EnhancedOnboardingSummary } from './onboarding-steps/EnhancedOnboardingSummary';
import '../ai-news/animations.css';

interface ProjectOnboardingProps {
  onComplete: (projectData: any) => void;
  onSkip: () => void;
}

export function EnhancedProjectOnboarding({ onComplete, onSkip }: ProjectOnboardingProps) {
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
  
  // Track completion status of each step
  const [stepsCompleted, setStepsCompleted] = useState({
    welcome: true,
    projectType: false,
    features: false,
    business: false,
    timeline: false,
  });

  // Auto-save progress to localStorage
  useEffect(() => {
    const savedData = JSON.stringify({ 
      projectData,
      currentStep, 
      stepsCompleted 
    });
    localStorage.setItem('projectOnboardingProgress', savedData);
  }, [projectData, currentStep, stepsCompleted]);

  // Try to load saved progress on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('projectOnboardingProgress');
      if (savedProgress) {
        const { projectData: savedData, currentStep: savedStep, stepsCompleted: savedCompletion } = JSON.parse(savedProgress);
        setProjectData(savedData);
        setCurrentStep(savedStep);
        setStepsCompleted(savedCompletion);
      }
    } catch (error) {
      console.error('Failed to load saved progress', error);
    }
  }, []);

  const steps = [
    { title: "Welcome", icon: <Building className="w-4 h-4" />, key: "welcome" },
    { title: "Project Type", icon: <BarChart className="w-4 h-4" />, key: "projectType" },
    { title: "Features", icon: <CheckCircle2 className="w-4 h-4" />, key: "features" },
    { title: "Business", icon: <Users className="w-4 h-4" />, key: "business" },
    { title: "Timeline", icon: <Calendar className="w-4 h-4" />, key: "timeline" },
    { title: "Summary", icon: <DollarSign className="w-4 h-4" />, key: "summary" },
  ];

  const updateProjectData = (key: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const markStepComplete = (step: string, isComplete: boolean = true) => {
    setStepsCompleted(prev => ({
      ...prev,
      [step]: isComplete
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

  const handleResetProgress = () => {
    if (confirm('This will reset all your progress. Are you sure?')) {
      localStorage.removeItem('projectOnboardingProgress');
      setCurrentStep(0);
      setProjectData({
        projectType: '',
        projectScale: 'medium',
        businessContext: {
          companyName: '',
          industry: '',
          targetAudience: '',
          teamSize: '',
        },
        features: {},
        timelineBudget: {
          timeline: '3-6 months',
          budget: '$10,000 - $50,000',
          goals: '',
        },
      });
      setStepsCompleted({
        welcome: true,
        projectType: false,
        features: false,
        business: false,
        timeline: false,
      });
    }
  };

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OnboardingWelcome onNext={handleNext} onSkip={onSkip} />;
      case 1:
        return (
          <EnhancedProjectType 
            projectType={projectData.projectType} 
            projectScale={projectData.projectScale} 
            updateProjectData={updateProjectData}
            onComplete={() => markStepComplete('projectType')}
          />
        );
      case 2:
        return (
          <EnhancedFeatureSelection 
            features={projectData.features} 
            projectType={projectData.projectType}
            updateFeatures={(features) => {
              updateProjectData('features', features);
              markStepComplete('features');
            }}
          />
        );
      case 3:
        return (
          <EnhancedBusinessContext 
            businessContext={projectData.businessContext} 
            updateBusinessContext={(context) => {
              updateProjectData('businessContext', context);
              markStepComplete('business');
            }}
          />
        );
      case 4:
        return (
          <EnhancedTimelineBudget 
            timelineBudget={projectData.timelineBudget} 
            projectType={projectData.projectType}
            updateTimelineBudget={(data) => {
              updateProjectData('timelineBudget', data);
              markStepComplete('timeline');
            }}
          />
        );
      case 5:
        return (
          <EnhancedOnboardingSummary 
            projectData={projectData} 
            onEdit={(stepIndex) => setCurrentStep(stepIndex)}
          />
        );
      default:
        return null;
    }
  };

  // Generate decorative sparkles/background elements
  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 4 + 1; // 1-5px
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 2 + 2; // 2-4s
      
      sparkles.push(
        <div 
          key={i}
          className="absolute rounded-full bg-siso-orange/20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            top: `${posY}%`,
            animation: `pulse-glow ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
      );
    }
    return sparkles;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-card to-card/80 rounded-xl border border-border shadow-xl overflow-hidden relative">
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        {generateSparkles()}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full px-6 pt-6 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Project Setup</h2>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleResetProgress}
                  className="h-8 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Reset
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset onboarding progress</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="mb-2 h-2 bg-muted/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-siso-red to-siso-orange rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        <div className="progress-indicator mt-6">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep || 
              (stepsCompleted[step.key as keyof typeof stepsCompleted] && index === currentStep);
            const isActive = index === currentStep;
            
            return (
              <div 
                key={step.title} 
                className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => index <= Math.max(...Object.values(stepsCompleted).map((val, i) => val ? i + 1 : 0)) && setCurrentStep(index)}
              >
                <motion.div 
                  className="step-circle cursor-pointer"
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -3 : 0
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    step.icon
                  )}
                </motion.div>
                <span className="step-label hidden sm:block">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 pt-4">
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
      {currentStep > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t flex justify-between bg-gradient-to-r from-muted/20 to-muted/30 backdrop-blur-sm"
        >
          {currentStep > 0 && (
            <motion.div
              whileHover={{ x: -3, transition: { duration: 0.2 } }}
              whileTap={{ x: 0, scale: 0.98, transition: { duration: 0.2 } }}
            >
              <Button variant="outline" onClick={handleBack} size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </motion.div>
          )}
          
          {currentStep < steps.length - 1 ? (
            <motion.div
              whileHover={{ x: 3, transition: { duration: 0.2 } }}
              whileTap={{ x: 0, scale: 0.98, transition: { duration: 0.2 } }}
              className="ml-auto"
            >
              <Button 
                onClick={handleNext} 
                size="sm" 
                className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white"
                disabled={!stepsCompleted[steps[currentStep].key as keyof typeof stepsCompleted] && currentStep !== 0}
              >
                Next
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    ease: "easeInOut" 
                  }}
                  className="ml-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
              className="ml-auto"
            >
              <Button 
                onClick={() => onComplete(projectData)} 
                size="sm" 
                className="bg-gradient-to-r from-siso-red to-siso-orange text-white hover:opacity-90 gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10">Start Planning</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    ease: "easeInOut" 
                  }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
      
      {/* Optional Info/Help Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted/20 hover:bg-muted/40"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Need help? Your progress is auto-saved.</p>
            <p className="text-xs text-muted-foreground mt-1">You can continue later.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
