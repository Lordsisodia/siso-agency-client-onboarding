
import { motion } from 'framer-motion';

interface StepProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function PlanBuilderSteps({ currentStep, totalSteps, stepTitles }: StepProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: currentStep >= index ? 1 : 0.8,
                opacity: currentStep >= index ? 1 : 0.5
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                ${currentStep > index 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                  : currentStep === index 
                    ? 'bg-gradient-to-r from-siso-red to-siso-orange text-white' 
                    : 'bg-siso-bg border border-siso-border text-siso-text/50'}`}
            >
              {currentStep > index ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: currentStep >= index ? 1 : 0.5,
                fontWeight: currentStep === index ? 600 : 400
              }}
              className="text-xs text-center max-w-[80px]"
            >
              {title}
            </motion.span>
            
            {index < totalSteps - 1 && (
              <div className="absolute h-[2px] bg-siso-border/50 w-[calc(100%-2rem)] top-5 -right-1/2 -z-10">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: currentStep > index ? "100%" : "0%" }}
                  className="h-full bg-gradient-to-r from-siso-red to-siso-orange"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
