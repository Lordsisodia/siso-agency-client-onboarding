
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';

interface PrePlanStateProps {
  onSubmit: (prompt: string) => void;
}

export const PrePlanState: React.FC<PrePlanStateProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsAnalyzing(true);
      
      // Create a prompt based on the input
      const prompt = `Create a project plan for: ${inputValue}`;
      
      // Small delay to show the analyzing screen before submitting
      setTimeout(() => {
        onSubmit(prompt);
      }, 1000);
    }
  };

  if (isAnalyzing) {
    return (
      <motion.div 
        className="w-full max-w-2xl mx-auto relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <div className="relative p-4">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-siso-red to-siso-orange opacity-20 blur-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Loader className="w-12 h-12 text-siso-orange" />
            </motion.div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-siso-text mb-4">
          AI Analysis in Progress
        </h2>
        
        <p className="text-lg text-siso-text-muted max-w-md mx-auto">
          Our AI is analyzing your project idea and generating a comprehensive project plan...
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center w-full p-6">
      <motion.div 
        className="relative z-10 max-w-3xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <GradientHeading variant="rainbow" size="lg" className="mb-4">
          AI Project Planner
        </GradientHeading>
        
        <p className="text-lg text-siso-text-muted mb-8 max-w-2xl mx-auto">
          Describe your project idea and let AI create a detailed plan with features, timeline, and budget
        </p>
      </motion.div>

      <motion.div 
        className="w-full max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={handleChange}
              placeholder="Describe your project idea here..."
              className="w-full h-36 p-4 pr-16 bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-lg text-siso-text resize-none focus:outline-none focus:ring-2 focus:ring-siso-red/50"
            />
            <div className="absolute bottom-4 right-4">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-siso-red to-siso-orange text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
                disabled={!inputValue.trim()}
                aria-label="Generate plan"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
