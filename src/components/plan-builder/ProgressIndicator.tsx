
import React from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-background">
      <div className="flex items-center justify-between text-sm font-medium px-4 py-2">
        <div className="w-full flex items-center justify-between">
          {stepLabels.map((label, index) => (
            <React.Fragment key={index}>
              <div 
                className={`flex items-center gap-2 ${currentStep === index + 1 ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${currentStep >= index + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {index + 1}
                </span>
                <span>{label}</span>
              </div>
              
              {index < totalSteps - 1 && (
                <div className={`h-1 w-12 mx-2 ${currentStep > index + 1 ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
