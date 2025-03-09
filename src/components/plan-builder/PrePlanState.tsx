
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Database, Users, Loader } from 'lucide-react';
import { Waves } from '@/components/ui/waves-background';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { Button } from '@/components/ui/button';

interface PrePlanStateProps {
  onSubmit: (prompt: string) => void;
}

type InputType = 'niche' | 'url' | 'bulk' | null;

export const PrePlanState: React.FC<PrePlanStateProps> = ({ onSubmit }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inputType, setInputType] = useState<InputType>(null);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleTypeSelection = (type: InputType) => {
    setInputType(type);
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleBack = () => {
    setStep(1);
    setInputType(null);
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setStep(3);
      setIsAnalyzing(true);
      
      let prompt = '';
      
      switch(inputType) {
        case 'niche':
          prompt = `Create a project plan for a ${inputValue} business or agency.`;
          break;
        case 'url':
          prompt = `Analyze this website or social media profile: ${inputValue} and create a project plan based on it.`;
          break;
        case 'bulk':
          prompt = `Create a project plan based on the following details: ${inputValue}`;
          break;
      }
      
      // Small delay to show the analyzing screen before submitting
      setTimeout(() => {
        onSubmit(prompt);
      }, 1500);
    }
  };

  const getPlaceholders = () => {
    switch(inputType) {
      case 'niche':
        return [
          "Enter your business or agency niche...",
          "Marketing Agency",
          "E-commerce Store",
          "SaaS Product",
          "Educational Platform"
        ];
      case 'url':
        return [
          "Enter website URL or social media profile...",
          "https://example.com",
          "https://twitter.com/username",
          "https://linkedin.com/in/profile",
          "https://instagram.com/profile"
        ];
      case 'bulk':
      default:
        return [
          "Describe your project in detail...",
          "I need a plan for a marketing agency that specializes in...",
          "We're building an e-commerce platform focused on...",
          "Our educational platform aims to teach...",
          "The SaaS product we're developing will help users to..."
        ];
    }
  };

  const renderStepOne = () => (
    <motion.div 
      className="w-full max-w-2xl mx-auto relative z-10 bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-siso-text mb-6 text-center">
        How would you like to start your project plan?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => handleTypeSelection('niche')}
          className="flex flex-col items-center justify-center p-6 h-auto text-base font-normal hover:bg-siso-red/10 border border-siso-border"
          variant="ghost"
        >
          <Users className="h-10 w-10 mb-4 text-siso-orange" />
          <span className="text-lg font-medium mb-2">Business Niche</span>
          <span className="text-sm text-siso-text-muted text-center">
            Select your agency or company niche
          </span>
        </Button>
        
        <Button 
          onClick={() => handleTypeSelection('url')}
          className="flex flex-col items-center justify-center p-6 h-auto text-base font-normal hover:bg-siso-red/10 border border-siso-border"
          variant="ghost"
        >
          <Globe className="h-10 w-10 mb-4 text-siso-red" />
          <span className="text-lg font-medium mb-2">Website or Social</span>
          <span className="text-sm text-siso-text-muted text-center">
            Provide a URL to analyze
          </span>
        </Button>
        
        <Button 
          onClick={() => handleTypeSelection('bulk')}
          className="flex flex-col items-center justify-center p-6 h-auto text-base font-normal hover:bg-siso-red/10 border border-siso-border"
          variant="ghost"
        >
          <Database className="h-10 w-10 mb-4 text-blue-500" />
          <span className="text-lg font-medium mb-2">Custom Input</span>
          <span className="text-sm text-siso-text-muted text-center">
            Describe your project in detail
          </span>
        </Button>
      </div>
    </motion.div>
  );

  const renderStepTwo = () => (
    <motion.div 
      className="w-full max-w-2xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Button 
          onClick={handleBack}
          variant="ghost" 
          className="text-siso-text-muted hover:text-siso-text"
        >
          ← Back
        </Button>
        <h2 className="text-xl font-semibold text-siso-text flex-1 text-center pr-16">
          {inputType === 'niche' 
            ? 'What is your business niche?' 
            : inputType === 'url' 
              ? 'Enter website or social media URL' 
              : 'Describe your project'}
        </h2>
      </div>

      {inputType === 'bulk' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="Describe your project in detail..."
            className="w-full h-40 p-4 bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border rounded-lg text-siso-text resize-none focus:outline-none focus:ring-2 focus:ring-siso-red/50"
          />
          <div className="text-right">
            <Button 
              type="submit"
              className="bg-gradient-to-r from-siso-red to-siso-orange text-white"
              disabled={!inputValue.trim()}
            >
              Generate Plan
            </Button>
          </div>
        </form>
      ) : (
        <PlaceholdersAndVanishInput
          placeholders={getPlaceholders()}
          onChange={handleChange}
          onSubmit={handleSubmit}
          className="bg-siso-bg-alt/30 backdrop-blur-md border border-siso-border"
          value={inputValue}
        />
      )}
    </motion.div>
  );

  const renderStepThree = () => (
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
        Our AI is analyzing your input and generating a comprehensive project plan...
      </p>
    </motion.div>
  );

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

      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}
    </div>
  );
};
