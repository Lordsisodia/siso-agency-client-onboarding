
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface Step {
  title: string;
  icon: React.ReactNode;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  progressPercentage: number;
}

export function ProgressIndicator({ steps, currentStep, progressPercentage }: ProgressIndicatorProps) {
  return (
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
  );
}
