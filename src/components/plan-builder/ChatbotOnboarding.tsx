
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Globe, Instagram, Twitter, Linkedin, Facebook, BarChart, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export interface OnboardingData {
  companyName: string;
  websiteUrl: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  industry: string;
  targetAudience: string[];
  mainGoal: string;
}

interface ChatbotOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const industries = [
  'E-commerce', 
  'Healthcare', 
  'Education', 
  'Finance', 
  'Technology', 
  'Entertainment',
  'Food & Beverage',
  'Travel',
  'Real Estate',
  'Manufacturing',
  'Other'
];

const targetAudienceOptions = [
  { id: '18-24', label: '18-24 years' },
  { id: '25-34', label: '25-34 years' },
  { id: '35-44', label: '35-44 years' },
  { id: '45-54', label: '45-54 years' },
  { id: '55+', label: '55+ years' },
  { id: 'tech-savvy', label: 'Tech-Savvy' },
  { id: 'budget-conscious', label: 'Budget-Conscious' },
  { id: 'luxury', label: 'Luxury Seekers' },
  { id: 'professionals', label: 'Professionals' },
  { id: 'students', label: 'Students' }
];

const goalOptions = [
  { id: 'grow-sales', label: 'Grow Sales' },
  { id: 'boost-brand', label: 'Boost Brand Awareness' },
  { id: 'save-time', label: 'Save Time/Automate' },
  { id: 'improve-service', label: 'Improve Customer Service' },
  { id: 'expand-market', label: 'Expand to New Markets' }
];

export function ChatbotOnboarding({ onComplete, onSkip }: ChatbotOnboardingProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    companyName: '',
    websiteUrl: '',
    socialLinks: {},
    industry: '',
    targetAudience: [],
    mainGoal: ''
  });
  const [isValid, setIsValid] = useState(false);
  const [showSocialInputs, setShowSocialInputs] = useState(false);
  const { toast } = useToast();
  
  // Determine if current step is valid for proceeding
  useEffect(() => {
    switch (step) {
      case 0: // Company Name
        setIsValid(!!data.companyName.trim());
        break;
      case 1: // Website URL
        setIsValid(!!data.websiteUrl.trim() && isValidUrl(data.websiteUrl));
        break;
      case 2: // Social Media
        setIsValid(true); // Always valid as it's optional
        break;
      case 3: // Industry
        setIsValid(!!data.industry);
        break;
      case 4: // Target Audience
        setIsValid(data.targetAudience.length > 0);
        break;
      case 5: // Main Goal
        setIsValid(!!data.mainGoal);
        break;
      default:
        setIsValid(true);
    }
  }, [step, data]);
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleNext = () => {
    if (isValid) {
      if (step === 5) {
        // Final step, complete onboarding
        onComplete(data);
      } else {
        setStep(prevStep => prevStep + 1);
      }
    } else {
      // Show validation error
      toast({
        title: "Please complete this step",
        description: "This information is required to continue.",
        variant: "destructive"
      });
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    }
  };
  
  const handleSkip = () => {
    if (step === 2) { // Social media step
      setStep(prevStep => prevStep + 1);
    } else {
      onSkip();
    }
  };
  
  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  const updateSocialLink = (platform: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      socialLinks: {
        ...prevData.socialLinks,
        [platform]: value
      }
    }));
  };
  
  const toggleTargetAudience = (value: string) => {
    setData(prevData => {
      const current = [...prevData.targetAudience];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prevData,
        targetAudience: current
      };
    });
  };
  
  const progressPercentage = ((step) / 5) * 100;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };
  
  // Step content
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div 
            key="step-company-name"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="chatbot-message">
              <div className="p-4 bg-siso-bg-alt/30 rounded-lg max-w-md">
                <p>Hey there! Let's get started with your project. What's your company called?</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Input
                value={data.companyName}
                onChange={(e) => updateData('companyName', e.target.value)}
                placeholder="Enter your company name"
                className="max-w-md bg-card/50 focus:ring-1 focus:ring-siso-orange/50"
              />
            </motion.div>
          </motion.div>
        );
        
      case 1:
        return (
          <motion.div 
            key="step-website"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="chatbot-message">
              <div className="p-4 bg-siso-bg-alt/30 rounded-lg max-w-md">
                <p>Awesome, {data.companyName}! What's your website URL?</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="relative max-w-md">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-siso-text-muted" />
                <Input
                  value={data.websiteUrl}
                  onChange={(e) => updateData('websiteUrl', e.target.value)}
                  placeholder="https://example.com"
                  className="pl-10 bg-card/50 focus:ring-1 focus:ring-siso-orange/50"
                />
                {data.websiteUrl && (
                  <div className="mt-2 text-sm">
                    {isValidUrl(data.websiteUrl) ? (
                      <span className="text-green-500 flex items-center">
                        <Check className="w-4 h-4 mr-1" /> Looks good!
                      </span>
                    ) : (
                      <span className="text-red-400">Hmm, that link doesn't look right. Please check the format.</span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            key="step-social"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="chatbot-message">
              <div className="p-4 bg-siso-bg-alt/30 rounded-lg max-w-md">
                <p>Got any social media links to share? If not, feel free to skip this—it's all good!</p>
              </div>
            </motion.div>
            
            {!showSocialInputs ? (
              <motion.div variants={itemVariants} className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-card/50"
                  onClick={() => setShowSocialInputs(true)}
                >
                  Add Social Links
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                >
                  Skip This Step
                </Button>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="space-y-3 max-w-md">
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-500" />
                  <Input
                    value={data.socialLinks.instagram || ''}
                    onChange={(e) => updateSocialLink('instagram', e.target.value)}
                    placeholder="Instagram URL"
                    className="pl-10 bg-card/50 focus:ring-1 focus:ring-siso-orange/50"
                  />
                </div>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                  <Input
                    value={data.socialLinks.twitter || ''}
                    onChange={(e) => updateSocialLink('twitter', e.target.value)}
                    placeholder="Twitter URL"
                    className="pl-10 bg-card/50 focus:ring-1 focus:ring-siso-orange/50"
                  />
                </div>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
                  <Input
                    value={data.socialLinks.linkedin || ''}
                    onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                    placeholder="LinkedIn URL"
                    className="pl-10 bg-card/50 focus:ring-1 focus:ring-siso-orange/50"
                  />
                </div>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input
                    value={data.socialLinks.facebook || ''}
                    onChange={(e) => updateSocialLink('facebook', e.target.value)}
                    placeholder="Facebook URL"
                    className="pl-10 bg-card/50 focus:ring-1 focus:ring-siso-orange/50"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div 
            key="step-industry"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="chatbot-message">
              <div className="p-4 bg-siso-bg-alt/30 rounded-lg max-w-md">
                <p>What industry are you in?</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="relative max-w-md">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-siso-text-muted" />
                <select
                  value={data.industry}
                  onChange={(e) => updateData('industry', e.target.value)}
                  className="w-full h-10 pl-10 pr-4 py-2 bg-card/50 border border-input rounded-md focus:ring-1 focus:ring-siso-orange/50 focus:outline-none"
                >
                  <option value="">Select your industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div 
            key="step-audience"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="chatbot-message">
              <div className="p-4 bg-siso-bg-alt/30 rounded-lg max-w-md">
                <p>Who's your target audience? Pick all that apply.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap gap-2 max-w-xl">
                {targetAudienceOptions.map(option => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={`
                      px-3 py-2 border 
                      ${data.targetAudience.includes(option.id) 
                        ? 'bg-siso-orange/10 border-siso-orange/40 text-siso-orange' 
                        : 'bg-card/50 hover:bg-siso-bg-alt/30'}
                    `}
                    onClick={() => toggleTargetAudience(option.id)}
                  >
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 5:
        return (
          <motion.div 
            key="step-goal"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="chatbot-message">
              <div className="p-4 bg-siso-bg-alt/30 rounded-lg max-w-md">
                <p>What's the main goal for your project?</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="flex flex-col gap-2 max-w-md">
                {goalOptions.map(option => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={`
                      justify-start px-4 py-3 border text-left
                      ${data.mainGoal === option.id 
                        ? 'bg-siso-orange/10 border-siso-orange/40 text-siso-orange' 
                        : 'bg-card/50 hover:bg-siso-bg-alt/30'}
                    `}
                    onClick={() => updateData('mainGoal', option.id)}
                  >
                    <BarChart className="w-4 h-4 mr-2" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  const getStepLabel = () => {
    switch (step) {
      case 0: return 'Company Name';
      case 1: return 'Website URL';
      case 2: return 'Social Links';
      case 3: return 'Industry';
      case 4: return 'Target Audience';
      case 5: return 'Main Goal';
      default: return '';
    }
  };
  
  return (
    <div className="bg-card/40 backdrop-blur-md rounded-xl shadow-lg border border-siso-border/40 p-6 relative overflow-hidden">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-siso-text-muted mb-2">
          <span>Step {step + 1} of 6: {getStepLabel()}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-1.5 bg-siso-bg-alt/30" 
          indicatorClassName="bg-gradient-to-r from-siso-red to-siso-orange"
        />
      </div>
      
      {/* Content area */}
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 0}
          className="text-siso-text-muted hover:text-siso-text"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex gap-3">
          {step !== 2 && ( // Skip only visible on non-social media steps
            <Button
              variant="ghost"
              onClick={onSkip}
              className="text-siso-text-muted hover:text-siso-text"
            >
              Skip All
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!isValid}
            className="bg-gradient-to-r from-siso-red to-siso-orange text-white hover:opacity-90"
          >
            {step === 5 ? (
              <>Complete<Check className="w-4 h-4 ml-2" /></>
            ) : (
              <>Next<ArrowRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-siso-red/5 to-siso-orange/5 blur-3xl -z-10 opacity-60" />
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl -z-10 opacity-60" />
    </div>
  );
}
