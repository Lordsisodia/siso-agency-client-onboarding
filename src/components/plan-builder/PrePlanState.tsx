
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Waves } from '@/components/ui/waves-background';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

interface PrePlanStateProps {
  onSubmit: (prompt: string) => void;
}

export const PrePlanState: React.FC<PrePlanStateProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
    }
  };

  const placeholders = [
    "Describe your app idea...",
    "I need a marketplace for handmade crafts...",
    "Build a fitness tracking app with social features...",
    "Design a task management tool for remote teams...",
    "Create a recipe sharing platform for home cooks..."
  ];

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center w-full overflow-hidden p-6">
      <Waves 
        lineColor="rgba(255, 255, 255, 0.2)"
        backgroundColor="transparent"
        waveSpeedX={0.01}
        waveSpeedY={0.008}
        waveAmpX={25}
        waveAmpY={12}
        className="opacity-50"
      />
      
      <motion.div 
        className="relative z-10 max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-siso-text bg-clip-text text-transparent bg-gradient-to-r from-siso-red to-siso-orange mb-4">
          AI Project Planner
        </h1>
        
        <p className="text-lg text-siso-text-muted mb-8 max-w-2xl mx-auto">
          Turn your idea into a detailed project plan with features, timeline, and budget estimates
        </p>
      </motion.div>

      <motion.div 
        className="w-full max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
          className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border"
        />
        
        <p className="text-sm text-siso-text-muted mt-4 text-center">
          Press Enter to get started with your project plan
        </p>
      </motion.div>
    </div>
  );
};
