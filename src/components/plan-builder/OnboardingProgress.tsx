
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface Step {
  title: string;
  icon: React.ReactNode;
}

interface OnboardingProgressProps {
  currentStep: number;
  steps: Step[];
  onBack: () => void;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
  steps,
  onBack
}) => {
  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <>
      <div className="bg-muted h-2 w-full">
        <motion.div 
          className="bg-gradient-to-r from-siso-red to-siso-orange h-full" 
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: `${((currentStep - 1 < 0 ? 0 : currentStep - 1) / (steps.length - 1)) * 100}%` }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-siso-red to-siso-orange text-white h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold">
            {currentStep + 1}
          </div>
          <span className="text-sm font-medium">
            {steps[currentStep].title}
          </span>
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        {currentStep > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="h-8 px-2 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Button>
        )}
      </div>
    </>
  );
};
