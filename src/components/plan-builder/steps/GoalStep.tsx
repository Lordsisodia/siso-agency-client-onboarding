
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Target, CheckCircle } from 'lucide-react';

interface GoalStepProps {
  goal: string;
  onGoalChange: (goal: string) => void;
  onNext: () => void;
}

export const GoalStep: React.FC<GoalStepProps> = ({ 
  goal, 
  onGoalChange, 
  onNext 
}) => {
  // Define the goals array before using it
  const goals = [
    { 
      value: "Increase Sales", 
      description: "Boost revenue through improved conversion rates and customer acquisition"
    },
    { 
      value: "Build Brand Awareness", 
      description: "Increase visibility and recognition of your brand in the market"
    },
    { 
      value: "Improve User Engagement", 
      description: "Enhance how users interact with your product or service"
    },
    { 
      value: "Streamline Operations", 
      description: "Optimize internal processes and increase efficiency"
    },
    { 
      value: "Enhance Customer Support", 
      description: "Provide better service and response to customer needs"
    },
    { 
      value: "Launch a New Product", 
      description: "Successfully introduce a new offering to the market"
    }
  ];
  
  const [showCustomInput, setShowCustomInput] = useState(
    !goals.some(g => g.value === goal) && goal !== ""
  );

  const handleCustomGoal = (value: string) => {
    if (value.trim()) {
      onGoalChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">What's your main goal?</h3>
        <p className="text-muted-foreground">This will help us focus your project plan on achieving specific outcomes</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Target className="w-5 h-5 text-siso-orange mt-0.5" />
          <div>
            <p className="text-sm font-medium">Why your goal matters</p>
            <p className="text-xs text-muted-foreground">A clear goal helps us prioritize features, set appropriate timelines, and measure success.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {goals.map(presetGoal => (
            <Button
              key={presetGoal.value}
              variant={goal === presetGoal.value ? "default" : "outline"}
              onClick={() => {
                onGoalChange(presetGoal.value);
                setShowCustomInput(false);
              }}
              className="h-auto py-3 justify-start text-left"
            >
              <div className="flex gap-3 items-start">
                {goal === presetGoal.value && (
                  <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">{presetGoal.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{presetGoal.description}</p>
                </div>
              </div>
            </Button>
          ))}
          
          <Button
            variant={showCustomInput ? "default" : "outline"}
            onClick={() => {
              setShowCustomInput(true);
              if (!showCustomInput) {
                onGoalChange("");
              }
            }}
            className="h-auto py-3 justify-start text-left"
          >
            <div className="flex gap-3 items-center">
              {showCustomInput && <CheckCircle className="w-5 h-5 text-white" />}
              <p className="font-medium">I have a different goal</p>
            </div>
          </Button>
        </div>
        
        {showCustomInput && (
          <div>
            <Label htmlFor="customGoal" className="text-base">Describe your goal:</Label>
            <Textarea
              id="customGoal"
              value={!goals.some(g => g.value === goal) ? goal : ""}
              onChange={(e) => handleCustomGoal(e.target.value)}
              placeholder="Describe your specific business objective"
              className="w-full mt-1 min-h-[80px]"
            />
          </div>
        )}
        
        <div className="pt-4">
          <Button 
            onClick={onNext}
            disabled={!goal.trim()}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
