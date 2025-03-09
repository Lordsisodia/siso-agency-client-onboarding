
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, DollarSign, Clock, Target, Check, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface TimelineBudgetProps {
  timelineBudget: {
    timeline: string;
    budget: string;
    goals: string;
  };
  projectType: string;
  updateTimelineBudget: (data: {
    timeline: string;
    budget: string;
    goals: string;
  }) => void;
}

// Possible timelines
const timelineOptions = [
  '1-3 months',
  '3-6 months',
  '6-12 months',
  '12+ months'
];

// Budget ranges
const budgetOptions = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+'
];

// Goals suggestions based on project type
const goalSuggestions: Record<string, string[]> = {
  'mobile-app': [
    'Increase user engagement',
    'Generate revenue through in-app purchases',
    'Expand market reach to mobile users',
    'Improve customer service through mobile interface',
    'Collect user data for business insights'
  ],
  'website': [
    'Establish online presence',
    'Generate leads for sales team',
    'Showcase products/services',
    'Provide information to customers',
    'Support existing customers'
  ],
  'e-commerce': [
    'Sell products online',
    'Increase average order value',
    'Reduce cart abandonment',
    'Build customer loyalty',
    'Expand to new markets'
  ],
  'ui-ux-design': [
    'Improve user experience metrics',
    'Create consistent brand identity',
    'Increase conversion rates',
    'Reduce user errors',
    'Support future development'
  ],
  'software': [
    'Automate business processes',
    'Improve operational efficiency',
    'Reduce costs through optimization',
    'Gather valuable business data',
    'Support scaling operations'
  ],
  'other': [
    'Solve specific business problem',
    'Meet market demand',
    'Stay competitive in industry',
    'Modernize outdated systems',
    'Support business growth'
  ]
};

export function EnhancedTimelineBudget({ 
  timelineBudget, 
  projectType,
  updateTimelineBudget 
}: TimelineBudgetProps) {
  const [formData, setFormData] = useState(timelineBudget);
  const [urgencyLevel, setUrgencyLevel] = useState(5);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [customGoal, setCustomGoal] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  
  // Get relevant goal suggestions based on project type
  const getGoalSuggestions = () => {
    return goalSuggestions[projectType] || goalSuggestions.other;
  };
  
  // Update timeline based on urgency
  useEffect(() => {
    if (formTouched) {
      let timeline;
      switch (true) {
        case urgencyLevel <= 3:
          timeline = '6-12 months';
          break;
        case urgencyLevel <= 6:
          timeline = '3-6 months';
          break;
        case urgencyLevel <= 8:
          timeline = '1-3 months';
          break;
        default:
          timeline = 'Under 1 month';
      }
      handleChange('timeline', timeline);
    }
  }, [urgencyLevel]);
  
  // Update parent component when form changes
  useEffect(() => {
    if (formTouched) {
      let goalsText = '';
      
      if (selectedGoals.length > 0) {
        goalsText = selectedGoals.join('\n');
      }
      
      if (customGoal.trim()) {
        goalsText = goalsText 
          ? `${goalsText}\n${customGoal}` 
          : customGoal;
      }
      
      updateTimelineBudget({
        ...formData,
        goals: goalsText
      });
    }
  }, [formData, selectedGoals, customGoal, formTouched]);
  
  const handleChange = (field: string, value: string) => {
    setFormTouched(true);
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const toggleGoal = (goal: string) => {
    setFormTouched(true);
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };
  
  // Get urgency color
  const getUrgencyColor = () => {
    if (urgencyLevel <= 3) return 'bg-green-100 text-green-800';
    if (urgencyLevel <= 6) return 'bg-yellow-100 text-yellow-800';
    if (urgencyLevel <= 8) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };
  
  // Get urgency text
  const getUrgencyText = () => {
    if (urgencyLevel <= 3) return 'Low';
    if (urgencyLevel <= 6) return 'Medium';
    if (urgencyLevel <= 8) return 'High';
    return 'Urgent';
  };
  
  // Animation variants
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
        <h2 className="text-2xl font-bold mb-2">Timeline & Budget</h2>
        <p className="text-muted-foreground">
          Set your project timeline, budget, and define key goals.
        </p>
      </div>

      <motion.div
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Timeline Section */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-4 flex items-center justify-center md:w-16">
                  <Calendar className="h-8 w-8 text-siso-orange" />
                </div>
                <div className="p-4 flex-1">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm font-medium">Project Urgency</Label>
                      <Badge className={`${getUrgencyColor()}`}>
                        {getUrgencyText()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-green-600" />
                      <Slider
                        value={[urgencyLevel]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => {
                          setFormTouched(true);
                          setUrgencyLevel(value[0]);
                        }}
                        className="flex-1"
                      />
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Flexible Timeline</span>
                      <span>Need It ASAP</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="timeline" className="text-sm font-medium">
                        Expected Timeline
                      </Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => handleChange('timeline', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
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
        
        {/* Budget Section */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-4 flex items-center justify-center md:w-16">
                  <DollarSign className="h-8 w-8 text-siso-red" />
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="budget" className="text-sm font-medium">
                          Budget Range
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="max-w-xs">This helps us recommend solutions within your budget constraints.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleChange('budget', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {formData.budget && projectType && (
                        <div className="mt-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Typical cost for {projectType.split('-').join(' ')} projects:</span>
                            <Badge variant="outline" className="font-normal">
                              {projectType === 'mobile-app' && '$10,000 - $50,000+'}
                              {projectType === 'website' && '$5,000 - $30,000+'}
                              {projectType === 'e-commerce' && '$15,000 - $70,000+'}
                              {projectType === 'ui-ux-design' && '$5,000 - $30,000+'}
                              {projectType === 'software' && '$20,000 - $100,000+'}
                              {projectType === 'other' && 'Varies significantly'}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Goals Section */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-4 flex items-center justify-center md:w-16">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">
                        Project Goals
                      </Label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Select goals for your project or add your own
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {getGoalSuggestions().map((goal, index) => (
                          <Badge
                            key={index}
                            variant={selectedGoals.includes(goal) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/90 transition-colors"
                            onClick={() => toggleGoal(goal)}
                          >
                            {selectedGoals.includes(goal) && (
                              <Check className="mr-1 h-3 w-3" />
                            )}
                            {goal}
                          </Badge>
                        ))}
                      </div>
                      
                      <Textarea
                        placeholder="Add additional project goals..."
                        value={customGoal}
                        onChange={(e) => {
                          setFormTouched(true);
                          setCustomGoal(e.target.value);
                        }}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Completion indicator */}
      {formTouched && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center"
        >
          <Check className="h-4 w-4 mr-2" />
          <span className="text-sm">Timeline and budget information saved</span>
        </motion.div>
      )}
    </div>
  );
}
