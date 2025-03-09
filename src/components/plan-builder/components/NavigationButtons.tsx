
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  onNext?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
  isLastStep?: boolean;
  isFirstStep?: boolean;
  loading?: boolean;
  nextDisabled?: boolean;
  skipLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  completeLabel?: string;
}

export function NavigationButtons({
  onNext,
  onBack,
  onComplete,
  onSkip,
  isLastStep = false,
  isFirstStep = false,
  loading = false,
  nextDisabled = false,
  skipLabel = "Skip",
  nextLabel = "Next",
  backLabel = "Back",
  completeLabel = "Complete"
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center gap-4 mt-6">
      <div className="flex items-center gap-2">
        {!isFirstStep && onBack && (
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Button>
        )}
        
        {onSkip && (
          <Button 
            variant="ghost" 
            onClick={onSkip}
            disabled={loading}
          >
            {skipLabel}
          </Button>
        )}
      </div>
      
      <div>
        {isLastStep && onComplete ? (
          <Button 
            onClick={onComplete}
            className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white"
            disabled={loading || nextDisabled}
          >
            {completeLabel}
          </Button>
        ) : onNext && (
          <Button 
            onClick={onNext}
            className="flex items-center gap-2 bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white"
            disabled={loading || nextDisabled}
          >
            {nextLabel}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
