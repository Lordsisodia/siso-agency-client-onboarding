
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, DollarSign, Target } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Project Timeline & Budget</h3>
        <p className="text-muted-foreground mb-4">Help us plan resources and expectations</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Timeline
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {timelineOptions.map((option) => (
              <motion.div
                key={option}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    timelineBudget.timeline === option 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:bg-card/80 hover:border-muted'
                  }`}
                  onClick={() => handleChange('timeline', option)}
                >
                  <CardContent className="p-3 flex items-center justify-center text-center text-sm">
                    {option}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            Budget Range
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {budgetOptions.map((option) => (
              <motion.div
                key={option}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    timelineBudget.budget === option 
                      ? 'border-primary bg-primary/10' 
                      : 'hover:bg-card/80 hover:border-muted'
                  }`}
                  onClick={() => handleChange('budget', option)}
                >
                  <CardContent className="p-3 flex items-center justify-center text-center text-sm">
                    {option}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="goals" className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            Key Project Goals
          </Label>
          <Textarea
            id="goals"
            value={timelineBudget.goals}
            onChange={(e) => handleChange('goals', e.target.value)}
            placeholder="What are your main objectives for this project?"
            className="border-siso-border focus:border-siso-orange resize-none min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
}
