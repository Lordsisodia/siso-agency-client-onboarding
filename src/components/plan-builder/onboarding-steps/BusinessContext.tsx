
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Building, Users, Briefcase } from 'lucide-react';

interface BusinessContextProps {
  businessContext: {
    companyName: string;
    industry: string;
    targetAudience: string;
    teamSize: string;
  };
  updateBusinessContext: (context: any) => void;
}

export function BusinessContext({ businessContext, updateBusinessContext }: BusinessContextProps) {
  const handleChange = (field: string, value: string) => {
    updateBusinessContext({
      ...businessContext,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Tell us about your business</h3>
        <p className="text-muted-foreground mb-4">This helps us tailor the project to your specific needs</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="flex items-center gap-2">
            <Building className="w-4 h-4 text-muted-foreground" />
            Company Name
          </Label>
          <Input
            id="companyName"
            value={businessContext.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            placeholder="Acme Inc."
            className="border-siso-border focus:border-siso-orange"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            Industry
          </Label>
          <Input
            id="industry"
            value={businessContext.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            placeholder="Technology, Healthcare, Education, etc."
            className="border-siso-border focus:border-siso-orange"
          />
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="targetAudience" className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            Target Audience
          </Label>
          <Textarea
            id="targetAudience"
            value={businessContext.targetAudience}
            onChange={(e) => handleChange('targetAudience', e.target.value)}
            placeholder="Describe your ideal customers or users"
            className="border-siso-border focus:border-siso-orange resize-none min-h-[80px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="teamSize" className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            Team Size
          </Label>
          <Input
            id="teamSize"
            value={businessContext.teamSize}
            onChange={(e) => handleChange('teamSize', e.target.value)}
            placeholder="1-10, 11-50, 51-200, 200+"
            className="border-siso-border focus:border-siso-orange"
          />
        </div>
      </div>
    </div>
  );
}
