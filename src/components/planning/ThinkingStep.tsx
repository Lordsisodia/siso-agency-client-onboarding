
import React from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface ThinkingStepProps {
  title: string;
  substeps: string[];
  isActive: boolean;
  isComplete: boolean;
  activeSubstep: number;
}

export const ThinkingStep: React.FC<ThinkingStepProps> = ({
  title,
  substeps,
  isActive,
  isComplete,
  activeSubstep,
}) => {
  return (
    <Card className={`p-4 transition-all duration-300 ${isActive ? 'border-purple-300 bg-purple-50' : isComplete ? 'border-green-200 bg-green-50' : 'opacity-50'}`}>
      <div className="flex items-center gap-3 mb-2">
        {isComplete ? (
          <CheckCircle className="text-green-500 h-5 w-5" />
        ) : isActive ? (
          <Loader2 className="animate-spin text-purple-500 h-5 w-5" />
        ) : (
          <Circle className="text-gray-300 h-5 w-5" />
        )}
        <h3 className={`font-medium ${isComplete ? 'text-green-700' : isActive ? 'text-purple-700' : 'text-gray-500'}`}>
          {title}
        </h3>
      </div>

      {(isActive || isComplete) && (
        <div className="ml-8 space-y-2 mt-2">
          {substeps.map((substep, index) => {
            const isSubstepActive = isActive && index === activeSubstep;
            const isSubstepComplete = isComplete || (isActive && index < activeSubstep);
            
            return (
              <motion.div
                key={index}
                initial={isSubstepActive ? { opacity: 0, x: -5 } : {}}
                animate={isSubstepActive ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-2"
              >
                {isSubstepComplete ? (
                  <CheckCircle className="text-green-400 h-4 w-4" />
                ) : isSubstepActive ? (
                  <Loader2 className="animate-spin text-purple-400 h-4 w-4" />
                ) : (
                  <Circle className="text-gray-300 h-4 w-4" />
                )}
                <span className={`text-sm ${isSubstepComplete ? 'text-green-600' : isSubstepActive ? 'text-purple-600' : 'text-gray-400'}`}>
                  {substep}
                </span>
                
                {isSubstepActive && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-purple-400 text-xs ml-2"
                  >
                    thinking...
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
