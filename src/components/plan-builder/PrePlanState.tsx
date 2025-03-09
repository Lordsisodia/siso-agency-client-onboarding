
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { Waves } from '@/components/ui/waves-background';
import { useNavigate } from 'react-router-dom';

interface PrePlanStateProps {
  onShowProjectHistory: () => void;
}

export const PrePlanState: React.FC<PrePlanStateProps> = ({ onShowProjectHistory }) => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    // Navigate to the project creation page
    navigate('/new-project');
    // Also show project history in the current view
    onShowProjectHistory();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center w-full p-6 overflow-hidden">
      {/* Waves background - making it cover the full page */}
      <Waves 
        lineColor="rgba(255, 87, 34, 0.1)" 
        backgroundColor="transparent" 
        waveSpeedX={0.0125} 
        waveSpeedY={0.005} 
        waveAmpX={32} 
        waveAmpY={16} 
        className="absolute inset-0 z-0 w-full h-full" 
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
          Start planning your projects with the help of AI and get detailed plans, features, timelines, and budgets
        </motion.p>
      </motion.div>

      <motion.div 
        className="w-full max-w-md mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-siso-red to-siso-orange opacity-50 rounded-lg blur-md"></div>
            <Button 
              onClick={handleStartPlanning}
              className="relative bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 text-white text-lg py-6 px-8 rounded-lg shadow-lg flex items-center gap-3"
              size="lg"
            >
              Start Planning Your Project
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
