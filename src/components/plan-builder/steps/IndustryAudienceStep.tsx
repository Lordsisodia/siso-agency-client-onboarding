
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Users } from 'lucide-react';

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
  const commonIndustries = [
    "Technology", "E-commerce", "Healthcare", "Education", 
    "Finance", "Real Estate", "Manufacturing", "Retail", 
    "Entertainment", "Food & Beverage", "Travel", "Consulting"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Your industry & audience</h3>
        <p className="text-muted-foreground">This helps us create a project plan that meets industry standards and reaches your target audience</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
            <BarChart className="w-5 h-5 text-siso-orange mt-0.5" />
            <div>
              <p className="text-sm font-medium">Industry context</p>
              <p className="text-xs text-muted-foreground">Helps us apply relevant best practices and regulations to your project.</p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
            <Users className="w-5 h-5 text-siso-orange mt-0.5" />
            <div>
              <p className="text-sm font-medium">Target audience</p>
              <p className="text-xs text-muted-foreground">Ensures your project reaches and resonates with the right people.</p>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="industry" className="text-base">Industry</Label>
          <div className="grid grid-cols-3 gap-2 my-2">
            {commonIndustries.map((industryOption) => (
              <Button
                key={industryOption}
                type="button"
                variant={industry === industryOption ? "default" : "outline"}
                className="text-xs h-8"
                onClick={() => onIndustryChange(industryOption)}
              >
                {industryOption}
              </Button>
            ))}
          </div>
          <Input
            id="industry"
            value={!commonIndustries.includes(industry) ? industry : ""}
            onChange={(e) => onIndustryChange(e.target.value)}
            placeholder="Or enter a custom industry"
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="targetAudience" className="text-base">Target Audience</Label>
          <Textarea
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => onTargetAudienceChange(e.target.value)}
            placeholder="Describe who your product or service is for (e.g., small business owners, tech-savvy millennials, healthcare professionals)"
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
