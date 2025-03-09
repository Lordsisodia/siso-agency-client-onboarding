
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onComplete: (projectData: any) => void;
  projectData: any;
}

export function NavigationButtons({ 
  currentStep, 
  totalSteps,
  onBack, 
  onNext,
  onComplete,
  projectData
}: NavigationButtonsProps) {
  if (currentStep === 0) return null;
  
  return (
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
          <Button variant="outline" onClick={onBack} size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </motion.div>
      )}
      
      {currentStep < totalSteps - 1 ? (
        <motion.div
          whileHover={{ x: 3, transition: { duration: 0.2 } }}
          whileTap={{ x: 0, scale: 0.98, transition: { duration: 0.2 } }}
          className="ml-auto"
        >
          <Button onClick={onNext} size="sm" className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white">
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
  );
}
