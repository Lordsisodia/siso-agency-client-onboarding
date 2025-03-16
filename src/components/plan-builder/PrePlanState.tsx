
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Zap, History } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrePlanStateProps {
  onShowProjectHistory: () => void;
  onStartPlanning: () => void;
}

export const PrePlanState: React.FC<PrePlanStateProps> = ({ 
  onShowProjectHistory,
  onStartPlanning
}) => {
  return (
    <div className="max-w-4xl mx-auto pt-10 relative z-10">
      <div className="text-center mb-14">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-3 bg-siso-bg-alt/50 backdrop-blur-md rounded-2xl mb-6"
        >
          <FileText className="w-10 h-10 text-siso-red" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent mb-6"
        >
          AI Project Planner
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-siso-text-muted max-w-2xl mx-auto"
        >
          Get detailed project plans, budget estimates, and timelines tailored to your specific needs in minutes.
        </motion.p>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-xl p-6 md:p-8 mb-10"
      >
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl text-siso-text font-medium">
              Ready to create your project plan?
            </h2>
            <p className="text-sm text-siso-text-muted">
              Our AI will guide you through the process of creating a comprehensive project plan.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              onClick={onStartPlanning}
              className="w-full sm:w-auto bg-gradient-to-r from-siso-orange to-siso-red hover:opacity-90 text-white flex items-center gap-2 px-8 py-6 text-lg"
            >
              <Zap className="w-5 h-5" />
              <span>Start Planning</span>
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="mt-4 border-siso-border text-siso-text hover:text-siso-red flex items-center gap-2"
              onClick={onShowProjectHistory}
            >
              <History className="w-4 h-4" />
              <span>View project history</span>
            </Button>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-xl p-6 flex flex-col">
          <Zap className="w-8 h-8 text-siso-orange mb-4" />
          <h3 className="text-lg font-semibold text-siso-text mb-2">Instant Planning</h3>
          <p className="text-sm text-siso-text-muted flex-grow">Get a comprehensive project plan in minutes, not days or weeks.</p>
        </div>
        
        <div className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-xl p-6 flex flex-col">
          <FileText className="w-8 h-8 text-siso-orange mb-4" />
          <h3 className="text-lg font-semibold text-siso-text mb-2">Detailed Requirements</h3>
          <p className="text-sm text-siso-text-muted flex-grow">Our AI helps identify all the necessary components for your project.</p>
        </div>
        
        <div className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-xl p-6 flex flex-col">
          <Clock className="w-8 h-8 text-siso-orange mb-4" />
          <h3 className="text-lg font-semibold text-siso-text mb-2">Realistic Timelines</h3>
          <p className="text-sm text-siso-text-muted flex-grow">Get accurate time estimates based on your specific project requirements.</p>
        </div>
      </motion.div>
    </div>
  );
};
