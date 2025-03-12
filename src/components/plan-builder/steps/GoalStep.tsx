
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  const goals = [
    "Increase Sales",
    "Boost Brand Awareness",
    "Improve User Engagement",
    "Streamline Operations",
    "Provide Better Customer Support",
    "Launch a New Product"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">What's your main goal?</h3>
        <p className="text-muted-foreground">Help us understand what success looks like for you</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {goals.map(presetGoal => (
            <Button
              key={presetGoal}
              variant={goal === presetGoal ? "default" : "outline"}
              onClick={() => onGoalChange(presetGoal)}
              className="h-auto py-3 text-left justify-start"
            >
              {presetGoal}
            </Button>
          ))}
        </div>
        
        <div>
          <Label htmlFor="customGoal" className="text-base">Or enter a custom goal:</Label>
          <Input
            id="customGoal"
            value={goal.startsWith("Custom: ") 
              ? goal.substring(8) 
              : goals.includes(goal) ? "" : goal}
            onChange={(e) => {
              const value = e.target.value;
              if (value.trim()) {
                onGoalChange(value.startsWith("Custom: ") ? value : `Custom: ${value}`);
              }
            }}
            placeholder="Enter your specific goal"
            className="w-full mt-1"
          />
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={onNext}
            disabled={!goal}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
