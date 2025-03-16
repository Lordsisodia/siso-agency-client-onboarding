
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlanIcon, FileText, Clock, Zap, ChevronRight, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PrePlanStateProps {
  onShowProjectHistory: () => void;
  onStartPlan: (prompt: string) => Promise<void>;
}

export const PrePlanState: React.FC<PrePlanStateProps> = ({ onShowProjectHistory, onStartPlan }) => {
  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectDescription.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onStartPlan(projectDescription);
    } catch (error) {
      console.error("Error submitting project description:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Get detailed project plans, budget estimates, and timelines tailored to your specific needs in minutes. Start by describing your project.
        </motion.p>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-xl p-6 md:p-8 mb-10"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="project-description" className="block text-lg text-siso-text font-medium">
              Describe your project
            </label>
            <p className="text-sm text-siso-text-muted">
              What are you trying to build? Provide as much detail as possible for a more accurate plan.
            </p>
            <Textarea
              id="project-description"
              placeholder="I want to create a mobile app for scheduling appointments..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="h-32 resize-none bg-siso-bg-card/40 border-siso-border focus:border-siso-red text-siso-text"
              required
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-center">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto border-siso-border text-siso-text hover:text-siso-red flex items-center gap-2"
              onClick={onShowProjectHistory}
            >
              <History className="w-4 h-4" />
              <span>View project history</span>
            </Button>
            
            <Button 
              type="submit"
              disabled={!projectDescription.trim() || isSubmitting}
              className="w-full sm:w-auto bg-gradient-to-r from-siso-orange to-siso-red hover:opacity-90 text-white flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Generate project plan</span>
                </>
              )}
            </Button>
          </div>
        </form>
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
