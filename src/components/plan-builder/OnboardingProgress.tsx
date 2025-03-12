
import React from 'react';
import { Button } from '@/components/ui/button';

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
        <div 
          className="bg-gradient-to-r from-siso-red to-siso-orange h-full transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-muted-foreground">• {steps[currentStep].title}</span>
        </div>
        
        {currentStep > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="h-8 px-2"
          >
            Back
          </Button>
        )}
      </div>
    </>
  );
};
