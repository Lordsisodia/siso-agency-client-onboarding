
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CompanyNameStepProps {
  companyName: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const CompanyNameStep: React.FC<CompanyNameStepProps> = ({ 
  companyName, 
  onChange, 
  onNext, 
  onSkip 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">What's your company called?</h3>
        <p className="text-muted-foreground">Let's start with the basics to personalize your experience</p>
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="companyName" className="text-base">Company Name</Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Acme Corporation"
          className="w-full"
        />
        
        <div className="pt-4">
          <Button 
            onClick={onNext} 
            disabled={!companyName.trim()}
            className="w-full"
          >
            Next
          </Button>
          <Button 
            variant="ghost" 
            onClick={onSkip}
            className="w-full mt-2"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};
