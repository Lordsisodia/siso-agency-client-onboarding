
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, DollarSign, Target, Clock, Zap } from 'lucide-react';

interface TimelineBudgetProps {
  timelineBudget: {
    timeline: string;
    budget: string;
    goals: string;
  };
  updateTimelineBudget: (data: any) => void;
}

export function TimelineBudget({ timelineBudget, updateTimelineBudget }: TimelineBudgetProps) {
  const timelineOptions = [
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '1+ year'
  ];
  
  const budgetOptions = [
    'Under $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+'
  ];
  
  const handleChange = (field: string, value: string) => {
    updateTimelineBudget({
      ...timelineBudget,
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

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h3 className="text-xl font-semibold mb-1">Project Timeline & Budget</h3>
        <p className="text-muted-foreground mb-6">Help us plan resources and set the right expectations</p>
      </motion.div>
      
      <div className="space-y-8">
        <motion.div variants={item} className="space-y-4">
          <Label className="flex items-center gap-2 text-base mb-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20"
            >
              <Clock className="w-5 h-5 text-blue-500" />
            </motion.div>
            Timeline
          </Label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timelineOptions.map((option, index) => (
              <motion.div
                key={option}
                variants={item}
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ y: 0, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 h-full overflow-hidden ${
                    timelineBudget.timeline === option 
                      ? 'border-primary shadow-md' 
                      : 'hover:border-muted-foreground/30'
                  }`}
                  onClick={() => handleChange('timeline', option)}
                >
                  <div className="relative">
                    {timelineBudget.timeline === option && (
                      <motion.div 
                        initial={{ y: -30 }}
                        animate={{ y: 0 }}
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-siso-red to-siso-orange"
                      />
                    )}
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <motion.div
                        animate={{ 
                          scale: timelineBudget.timeline === option ? [1, 1.1, 1] : 1 
                        }}
                        transition={{ 
                          duration: 0.5, 
                          repeat: timelineBudget.timeline === option ? Infinity : 0, 
                          repeatType: "reverse" 
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          timelineBudget.timeline === option
                            ? 'bg-gradient-to-r from-siso-red to-siso-orange text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </motion.div>
                      <span className="font-medium text-sm">{option}</span>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={item} className="space-y-4">
          <Label className="flex items-center gap-2 text-base mb-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-2 rounded-full bg-green-100 dark:bg-green-900/20"
            >
              <DollarSign className="w-5 h-5 text-green-500" />
            </motion.div>
            Budget Range
          </Label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {budgetOptions.map((option, index) => (
              <motion.div
                key={option}
                variants={item}
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ y: 0, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 h-full overflow-hidden ${
                    timelineBudget.budget === option 
                      ? 'border-primary shadow-md' 
                      : 'hover:border-muted-foreground/30'
                  }`}
                  onClick={() => handleChange('budget', option)}
                >
                  <div className="relative">
                    {timelineBudget.budget === option && (
                      <motion.div 
                        initial={{ y: -30 }}
                        animate={{ y: 0 }}
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-siso-red to-siso-orange"
                      />
                    )}
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <motion.div
                        animate={{ 
                          scale: timelineBudget.budget === option ? [1, 1.1, 1] : 1 
                        }}
                        transition={{ 
                          duration: 0.5, 
                          repeat: timelineBudget.budget === option ? Infinity : 0, 
                          repeatType: "reverse" 
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          timelineBudget.budget === option
                            ? 'bg-gradient-to-r from-siso-red to-siso-orange text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <DollarSign className="w-4 h-4" />
                      </motion.div>
                      <span className="font-medium text-sm">{option}</span>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={item} className="space-y-3">
          <Label htmlFor="goals" className="flex items-center gap-2 text-base">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20"
            >
              <Zap className="w-5 h-5 text-purple-500" />
            </motion.div>
            Key Project Goals
          </Label>
          <div className="relative group">
            <Textarea
              id="goals"
              value={timelineBudget.goals}
              onChange={(e) => handleChange('goals', e.target.value)}
              placeholder="What are your main objectives for this project?"
              className="border-siso-border focus:border-siso-orange resize-none min-h-[120px] pl-4 transition-all duration-300 focus:ring-2 focus:ring-siso-orange/20"
            />
            <motion.div 
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-siso-orange/0 via-siso-orange to-siso-orange/0 transition-all duration-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: timelineBudget.goals ? "80%" : "0%" }}
            />
          </div>
          
          {timelineBudget.goals && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-right text-muted-foreground mt-1"
            >
              {timelineBudget.goals.length} characters • {timelineBudget.goals.split(' ').length} words
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
