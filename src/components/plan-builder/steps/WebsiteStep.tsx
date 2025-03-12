
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface WebsiteStepProps {
  website: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export const WebsiteStep: React.FC<WebsiteStepProps> = ({ 
  website, 
  onChange, 
  onNext 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Do you have a website?</h3>
        <p className="text-muted-foreground">We can analyze it to better understand your needs</p>
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="website" className="text-base">Website URL</Label>
        <Input
          id="website"
          value={website}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="w-full"
        />
        
        <div className="pt-4">
          <Button 
            onClick={onNext}
            className="w-full"
          >
            {website.trim() ? 'Next' : 'No website yet'}
          </Button>
        </div>
      </div>
    </div>
  );
};
