
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ArrowLeft, Building, Users, Calendar, DollarSign, BarChart, CheckCircle2 } from 'lucide-react';
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

  // For the background sparkles
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
            animation: `sparkle ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
      );
    }
    return sparkles;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-xl border border-border shadow-xl overflow-hidden relative">
      <style jsx global>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .progress-indicator {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
        }
        
        .progress-step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 14px;
          left: calc(50% + 15px);
          width: calc(100% - 30px);
          height: 2px;
          background-color: rgba(var(--muted), 0.3);
          z-index: -1;
        }
        
        .progress-step.active:not(:last-child)::after,
        .progress-step.completed:not(:last-child)::after {
          background: linear-gradient(to right, #FF5722, #FFA000);
        }
        
        .step-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(var(--muted), 0.2);
          color: var(--muted-foreground);
          font-size: 14px;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .active .step-circle {
          background: linear-gradient(135deg, #FF5722, #FFA000);
          color: white;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 87, 34, 0.4);
        }
        
        .completed .step-circle {
          background: linear-gradient(135deg, #FF5722, #FFA000);
          color: white;
        }
        
        .step-label {
          font-size: 12px;
          color: var(--muted-foreground);
          transition: all 0.3s ease;
        }
        
        .active .step-label,
        .completed .step-label {
          color: var(--foreground);
          font-weight: 500;
        }
        
        /* For the features container */
        .features-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .features-container::-webkit-scrollbar-track {
          background: rgba(var(--muted), 0.1);
          border-radius: 10px;
        }
        
        .features-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF5722, #FFA000);
          border-radius: 10px;
        }
      `}</style>
      
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        {generateSparkles()}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full px-6 pt-6 relative z-10">
        <div className="mb-2 h-2 bg-muted/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-siso-red to-siso-orange rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        <div className="progress-indicator mt-6">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`progress-step ${
                index === currentStep ? 'active' : index < currentStep ? 'completed' : ''
              }`}
            >
              <motion.div 
                className="step-circle"
                initial={false}
                animate={{ 
                  scale: index === currentStep ? 1.1 : 1,
                  y: index === currentStep ? -3 : 0
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {index < currentStep ? (
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
          ))}
        </div>
      </div>

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
      {currentStep > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t flex justify-between bg-muted/30 backdrop-blur-sm"
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
              <Button onClick={handleNext} size="sm" className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white">
                Next
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
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
                    repeatType: "reverse", 
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
    </div>
  );
}
