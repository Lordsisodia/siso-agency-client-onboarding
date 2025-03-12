
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Building } from 'lucide-react';

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
        <p className="text-muted-foreground">This helps us personalize your project plan and recommendations</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Building className="w-5 h-5 text-siso-orange mt-0.5" />
          <div>
            <p className="text-sm font-medium">Why this matters</p>
            <p className="text-xs text-muted-foreground">Your company name helps us tailor our recommendations to your brand identity and business needs.</p>
          </div>
        </div>

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
