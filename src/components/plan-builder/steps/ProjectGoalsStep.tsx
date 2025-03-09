
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Target, Calendar, DollarSign } from "lucide-react";

interface ProjectGoalsStepProps {
  projectGoal: string;
  setProjectGoal: (value: string) => void;
  targetAudience: string;
  setTargetAudience: (value: string) => void;
  timeframe: string;
  setTimeframe: (value: string) => void;
  budgetRange: string;
  setBudgetRange: (value: string) => void;
}

export function ProjectGoalsStep({
  projectGoal,
  setProjectGoal,
  targetAudience,
  setTargetAudience,
  timeframe,
  setTimeframe,
  budgetRange,
  setBudgetRange,
}: ProjectGoalsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Define your project goals</h2>
        <p className="text-muted-foreground">Help us understand what you want to achieve</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectGoal" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            What's your main goal for this project? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="projectGoal"
            value={projectGoal}
            onChange={(e) => setProjectGoal(e.target.value)}
            placeholder="e.g. Increase sales by creating an online store, automate our customer support..."
            className="min-h-24"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Who is your target audience?
          </Label>
          <Textarea
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g. Small business owners, retail customers, teenagers..."
            className="min-h-20"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timeframe" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Project Timeframe
            </Label>
            <Input
              id="timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              placeholder="e.g. 3 months, by end of year"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budgetRange" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Budget Range
            </Label>
            <Input
              id="budgetRange"
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              placeholder="e.g. $5,000-$10,000, Under $50,000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
