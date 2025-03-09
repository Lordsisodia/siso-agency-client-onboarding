
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Users, Target, Briefcase, Check, Info } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BusinessContextProps {
  businessContext: {
    companyName: string;
    industry: string;
    targetAudience: string;
    teamSize: string;
  };
  updateBusinessContext: (context: {
    companyName: string;
    industry: string;
    targetAudience: string;
    teamSize: string;
  }) => void;
}

// Industry options
const industries = [
  'E-commerce/Retail',
  'Technology/SaaS',
  'Healthcare',
  'Education',
  'Finance/Banking',
  'Media/Entertainment',
  'Food & Beverage',
  'Real Estate',
  'Travel/Hospitality',
  'Manufacturing',
  'Consulting/Professional Services',
  'Non-profit/NGO',
  'Government/Public Sector',
  'Other'
];

// Audience options (for common target audiences)
const audienceOptions = [
  'B2B (Business to Business)',
  'B2C (Business to Consumer)',
  'B2G (Business to Government)',
  'Millennials/Gen Z',
  'Small Business Owners',
  'Enterprise Companies',
  'Healthcare Professionals',
  'Educators',
  'Parents',
  'Travelers',
  'Investors',
  'General Consumer',
  'Other'
];

// Team size options
const teamSizes = [
  'Solo founder',
  '2-5 employees',
  '6-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees'
];

export function EnhancedBusinessContext({ 
  businessContext, 
  updateBusinessContext 
}: BusinessContextProps) {
  const [formData, setFormData] = useState(businessContext);
  const [customIndustry, setCustomIndustry] = useState('');
  const [customAudience, setCustomAudience] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  
  // Check if form fields are filled with meaningful data
  const isCompleted = 
    formData.companyName.trim().length > 0 && 
    (formData.industry.trim().length > 0 || customIndustry.trim().length > 0) &&
    (formData.targetAudience.trim().length > 0 || customAudience.trim().length > 0) &&
    formData.teamSize.trim().length > 0;
  
  // Update business context when form changes
  useEffect(() => {
    if (formTouched) {
      let updatedData = { ...formData };
      
      // If custom industry is selected, use the custom value
      if (formData.industry === 'Other' && customIndustry) {
        updatedData.industry = customIndustry;
      }
      
      // If custom audience is selected, use the custom value
      if (formData.targetAudience === 'Other' && customAudience) {
        updatedData.targetAudience = customAudience;
      }
      
      updateBusinessContext(updatedData);
    }
  }, [formData, customIndustry, customAudience, formTouched]);

  const handleChange = (field: string, value: string) => {
    setFormTouched(true);
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Layout animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tell us about your business</h2>
        <p className="text-muted-foreground">
          This information helps us tailor the project plan to your specific business needs.
        </p>
      </div>
      
      <motion.div
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-4 flex items-center justify-center md:w-16">
                  <Building className="h-8 w-8 text-siso-orange" />
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="companyName" className="text-sm font-medium">
                        Company/Project Name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Enter company or project name"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="industry" className="text-sm font-medium">
                        Industry
                      </Label>
                      <Select
                        value={formData.industry || ''}
                        onValueChange={(value) => handleChange('industry', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <AnimatePresence>
                        {formData.industry === 'Other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              placeholder="Specify industry"
                              value={customIndustry}
                              onChange={(e) => setCustomIndustry(e.target.value)}
                              className="mt-2"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-4 flex items-center justify-center md:w-16">
                  <Target className="h-8 w-8 text-siso-red" />
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="targetAudience" className="text-sm font-medium">
                          Target Audience
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="max-w-xs">Defining your target audience helps create a tailored user experience.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select
                        value={formData.targetAudience || ''}
                        onValueChange={(value) => handleChange('targetAudience', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {audienceOptions.map((audience) => (
                            <SelectItem key={audience} value={audience}>
                              {audience}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <AnimatePresence>
                        {formData.targetAudience === 'Other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Textarea
                              placeholder="Describe your target audience"
                              value={customAudience}
                              onChange={(e) => setCustomAudience(e.target.value)}
                              className="mt-2"
                              rows={3}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-4 flex items-center justify-center md:w-16">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="teamSize" className="text-sm font-medium">
                        Team Size
                      </Label>
                      <Select
                        value={formData.teamSize || ''}
                        onValueChange={(value) => handleChange('teamSize', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamSizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Completion indicator */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center"
          >
            <Check className="h-4 w-4 mr-2" />
            <span className="text-sm">Business information complete</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
