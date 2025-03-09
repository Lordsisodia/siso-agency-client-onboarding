
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { Waves } from '@/components/ui/waves-background';
import { Textarea } from '@/components/ui/textarea';

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

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mt-8 h-1.5 bg-siso-border/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-siso-red to-siso-orange"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "95%"] }}
            transition={{ duration: 10, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center w-full p-6 overflow-hidden">
      {/* Waves background */}
      <Waves 
        lineColor="rgba(255, 87, 34, 0.1)" 
        backgroundColor="transparent" 
        waveSpeedX={0.0125} 
        waveSpeedY={0.005} 
        waveAmpX={32} 
        waveAmpY={16} 
        className="absolute inset-0 z-0" 
      />
      
      <motion.div 
        className="relative z-10 max-w-3xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-flex items-center justify-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center shadow-lg shadow-siso-red/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </motion.div>
        
        <GradientHeading variant="rainbow" size="lg" className="mb-6 !text-5xl" weight="bold">
          AI Project Planner
        </GradientHeading>
        
        <motion.p 
          className="text-lg text-siso-text-muted mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Describe your project idea and let AI create a detailed plan with features, timeline, and budget
        </motion.p>
      </motion.div>

      <motion.div 
        className="w-full max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-siso-red to-siso-orange opacity-30 rounded-lg blur-md group-hover:opacity-50 transition-opacity"></div>
            <div className="relative p-0.5 bg-gradient-to-r from-siso-red to-siso-orange rounded-lg">
              <div className="relative bg-siso-bg-alt/70 backdrop-blur-md border border-siso-border rounded-lg overflow-hidden">
                <Textarea
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Describe your project idea here..."
                  className="w-full h-40 p-5 pr-16 bg-transparent border-none text-siso-text resize-none focus:outline-none focus:ring-0 text-md"
                />
                <div className="absolute bottom-4 right-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-md"
                      disabled={!inputValue.trim()}
                      aria-label="Generate plan"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </form>
        
        <motion.div
          className="mt-4 text-center text-siso-text-muted text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Press Enter or click the button to generate your plan
        </motion.div>
      </motion.div>
    </div>
  );
};
