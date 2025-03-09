
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare, Globe, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { Waves } from '@/components/ui/waves-background';

interface PrePlanStateProps {
  onStartWithChat: () => void;
  onManualInput: () => void;
  onWebsiteAnalysis: () => void;
}

export const PrePlanState: React.FC<PrePlanStateProps> = ({ 
  onStartWithChat,
  onManualInput,
  onWebsiteAnalysis
}) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center w-full p-6 overflow-hidden">
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
          How would you like to start?
        </GradientHeading>
        
        <motion.p 
          className="text-lg text-siso-text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Choose one of the following methods to begin planning your project
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Option 1: Start with Chat */}
        <motion.div 
          whileHover={{ y: -10, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-card/60 backdrop-blur-sm border border-siso-border hover:border-siso-border-hover rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Start with Chat</h3>
          <p className="text-siso-text-muted text-sm mb-6 flex-grow">
            Have a conversation with our AI assistant. Describe your project goals and get personalized guidance.
          </p>
          <Button
            onClick={onStartWithChat}
            className="w-full bg-blue-500 text-white hover:bg-blue-600 border-none shadow-md"
          >
            Start Chatting
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Option 2: Website Analysis */}
        <motion.div 
          whileHover={{ y: -10, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-card/60 backdrop-blur-sm border border-siso-border hover:border-siso-border-hover rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Website Analysis</h3>
          <p className="text-siso-text-muted text-sm mb-6 flex-grow">
            Provide your website URL and social links for AI analysis to get tailored recommendations.
          </p>
          <Button
            onClick={onWebsiteAnalysis}
            className="w-full bg-purple-500 text-white hover:bg-purple-600 border-none shadow-md"
          >
            Analyze Website
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Option 3: Manual Input */}
        <motion.div 
          whileHover={{ y: -10, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-card/60 backdrop-blur-sm border border-siso-border hover:border-siso-border-hover rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Manual Input</h3>
          <p className="text-siso-text-muted text-sm mb-6 flex-grow">
            Fill out a guided form with details about your project, company, goals, and desired features.
          </p>
          <Button
            onClick={onManualInput}
            className="w-full bg-green-500 text-white hover:bg-green-600 border-none shadow-md"
          >
            Fill Form
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
