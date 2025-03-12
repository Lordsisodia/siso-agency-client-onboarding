
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface IndustryAudienceStepProps {
  industry: string;
  targetAudience: string;
  onIndustryChange: (value: string) => void;
  onTargetAudienceChange: (value: string) => void;
  onNext: () => void;
}

export const IndustryAudienceStep: React.FC<IndustryAudienceStepProps> = ({ 
  industry, 
  targetAudience, 
  onIndustryChange, 
  onTargetAudienceChange, 
  onNext 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Your industry & audience</h3>
        <p className="text-muted-foreground">Help us understand your business better</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="industry" className="text-base">Industry</Label>
          <Input
            id="industry"
            value={industry}
            onChange={(e) => onIndustryChange(e.target.value)}
            placeholder="e.g., Technology, E-Commerce, Healthcare"
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="targetAudience" className="text-base">Target Audience</Label>
          <Textarea
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => onTargetAudienceChange(e.target.value)}
            placeholder="Describe who your product or service is for"
            className="w-full mt-1 min-h-[100px]"
          />
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={onNext}
            disabled={!industry.trim()}
            className="w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
