
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Building, Users, Briefcase, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BusinessContextProps {
  businessContext: {
    companyName: string;
    industry: string;
    targetAudience: string;
    teamSize: string;
  };
  updateBusinessContext: (context: any) => void;
}

export function BusinessContext({ businessContext, updateBusinessContext }: BusinessContextProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const handleChange = (field: string, value: string) => {
    updateBusinessContext({
      ...businessContext,
      [field]: value
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
  };
  
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h3 className="text-xl font-semibold mb-1">Tell us about your business</h3>
        <p className="text-muted-foreground mb-4">This helps us tailor the project to your specific needs</p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        <motion.div variants={item} className="space-y-3">
          <Label htmlFor="companyName" className="flex items-center gap-2 text-base">
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="p-2 rounded-md bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/10"
            >
              <Building className="w-4 h-4 text-siso-orange" />
            </motion.div>
            Company Name
          </Label>
          <div className="relative">
            <Input
              id="companyName"
              value={businessContext.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Acme Inc."
              className="border-siso-border focus:border-siso-orange pl-10 transition-all duration-300 focus:ring-2 focus:ring-siso-orange/20 rounded-md"
              onFocus={() => setFocusedField('companyName')}
              onBlur={() => setFocusedField(null)}
            />
            <AnimatePresence>
              {focusedField === 'companyName' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-siso-red/20 to-siso-orange/20 rounded-md -z-10"
                />
              )}
            </AnimatePresence>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${businessContext.companyName ? 'bg-green-500' : 'bg-gray-300'}`} 
            />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="space-y-3">
          <Label htmlFor="industry" className="flex items-center gap-2 text-base">
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="p-2 rounded-md bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/10"
            >
              <Briefcase className="w-4 h-4 text-blue-500" />
            </motion.div>
            Industry
          </Label>
          <div className="relative">
            <Input
              id="industry"
              value={businessContext.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              placeholder="Technology, Healthcare, Education, etc."
              className="border-siso-border focus:border-siso-orange pl-10 transition-all duration-300 focus:ring-2 focus:ring-siso-orange/20 rounded-md"
              onFocus={() => setFocusedField('industry')}
              onBlur={() => setFocusedField(null)}
            />
            <AnimatePresence>
              {focusedField === 'industry' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-md -z-10"
                />
              )}
            </AnimatePresence>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${businessContext.industry ? 'bg-green-500' : 'bg-gray-300'}`} 
            />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="space-y-3 sm:col-span-2">
          <Label htmlFor="targetAudience" className="flex items-center gap-2 text-base">
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="p-2 rounded-md bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/10"
            >
              <Target className="w-4 h-4 text-purple-500" />
            </motion.div>
            Target Audience
          </Label>
          <div className="relative group">
            <Textarea
              id="targetAudience"
              value={businessContext.targetAudience}
              onChange={(e) => handleChange('targetAudience', e.target.value)}
              placeholder="Describe your ideal customers or users"
              className="border-siso-border focus:border-siso-orange resize-none min-h-[120px] pl-10 transition-all duration-300 focus:ring-2 focus:ring-siso-orange/20 rounded-md"
              onFocus={() => setFocusedField('targetAudience')}
              onBlur={() => setFocusedField(null)}
            />
            <AnimatePresence>
              {focusedField === 'targetAudience' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-500/20 rounded-md -z-10"
                />
              )}
            </AnimatePresence>
            <motion.div 
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-siso-orange/0 via-siso-orange to-siso-orange/0 group-focus-within:w-full w-0 transition-all duration-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: businessContext.targetAudience ? "80%" : "0%" }}
            />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="space-y-3">
          <Label htmlFor="teamSize" className="flex items-center gap-2 text-base">
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="p-2 rounded-md bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/10"
            >
              <Users className="w-4 h-4 text-green-500" />
            </motion.div>
            Team Size
          </Label>
          <div className="relative">
            <Input
              id="teamSize"
              value={businessContext.teamSize}
              onChange={(e) => handleChange('teamSize', e.target.value)}
              placeholder="1-10, 11-50, 51-200, 200+"
              className="border-siso-border focus:border-siso-orange pl-10 transition-all duration-300 focus:ring-2 focus:ring-siso-orange/20 rounded-md"
              onFocus={() => setFocusedField('teamSize')}
              onBlur={() => setFocusedField(null)}
            />
            <AnimatePresence>
              {focusedField === 'teamSize' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-md -z-10"
                />
              )}
            </AnimatePresence>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${businessContext.teamSize ? 'bg-green-500' : 'bg-gray-300'}`} 
            />
          </div>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-gradient-to-r from-siso-red/5 to-siso-orange/5 blur-3xl -z-10 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div 
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl -z-10 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </motion.div>
  );
}
