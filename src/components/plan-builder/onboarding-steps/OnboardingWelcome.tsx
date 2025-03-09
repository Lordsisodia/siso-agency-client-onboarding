
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingWelcomeProps {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingWelcome({ onNext, onSkip }: OnboardingWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center shadow-lg mb-6"
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold mb-4 bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent"
      >
        Let's Plan Your Project
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg text-muted-foreground mb-8 max-w-md"
      >
        Answer a few questions to help us create the perfect project plan for you. It'll only take a few minutes.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex gap-4"
      >
        <Button
          variant="outline"
          onClick={onSkip}
          className="border-siso-border text-siso-text hover:bg-siso-bg-alt"
        >
          Skip to AI Chat
        </Button>
        
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white shadow-md"
        >
          Get Started
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
