
import React from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isStepComplete: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  isStepComplete,
  isSubmitting,
  onCancel,
  onPrevious,
  onNext,
  onSubmit
}: FormNavigationProps) {
  return (
    <div className="p-4 border-t bg-muted/50 flex justify-between">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        
        {currentStep > 1 && (
          <Button variant="outline" onClick={onPrevious} disabled={isSubmitting}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        {currentStep < totalSteps ? (
          <Button 
            onClick={onNext} 
            disabled={!isStepComplete || isSubmitting}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={onSubmit} 
            disabled={!isStepComplete || isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting..." : "Create AI Plan"}
            <Check className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
