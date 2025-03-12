
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';

interface OnboardingWelcomeStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export const OnboardingWelcomeStep: React.FC<OnboardingWelcomeStepProps> = ({ 
  onNext,
  onSkip
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-siso-red/20 to-siso-orange/20 rounded-full mb-4">
          <Rocket className="w-8 h-8 text-siso-orange" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to Project Planning</h2>
        <p className="text-muted-foreground">
          Let's create a project plan tailored to your specific needs. 
          This short questionnaire will help us better understand your requirements.
        </p>
      </div>
      
      <div className="space-y-3 bg-muted/30 p-5 rounded-lg border border-border">
        <h3 className="font-medium">What we'll cover:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="bg-gradient-to-br from-siso-red to-siso-orange rounded-full p-1 flex-shrink-0 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L5.5 7.5L8 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Your company information</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-gradient-to-br from-siso-red to-siso-orange rounded-full p-1 flex-shrink-0 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L5.5 7.5L8 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Web presence details</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-gradient-to-br from-siso-red to-siso-orange rounded-full p-1 flex-shrink-0 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L5.5 7.5L8 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Your industry and target audience</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-gradient-to-br from-siso-red to-siso-orange rounded-full p-1 flex-shrink-0 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L5.5 7.5L8 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Project goals and expectations</span>
          </li>
        </ul>
      </div>
      
      <div className="pt-4 space-y-2">
        <Button 
          onClick={onNext}
          className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 transition-opacity"
        >
          <span>Get Started</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onSkip}
          className="w-full text-muted-foreground"
        >
          Skip & Chat Directly
        </Button>
      </div>
    </div>
  );
};
