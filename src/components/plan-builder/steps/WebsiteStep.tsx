
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

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
  const [error, setError] = useState('');

  const validateAndContinue = () => {
    // Skip validation if empty (user doesn't have a website)
    if (!website.trim()) {
      onNext();
      return;
    }

    // Basic URL validation
    try {
      const url = new URL(website);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        setError('Please enter a valid URL starting with http:// or https://');
        return;
      }
      setError('');
      onNext();
    } catch (e) {
      setError('Please enter a valid website URL');
    }
  };

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
          onChange={(e) => {
            onChange(e.target.value);
            if (error) setError('');
          }}
          placeholder="https://yourwebsite.com"
          className={`w-full ${error ? 'border-red-500' : ''}`}
        />
        
        {error && (
          <div className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="pt-4">
          <Button 
            onClick={validateAndContinue}
            className="w-full"
          >
            {website.trim() ? 'Next' : 'No website yet'}
          </Button>
        </div>
      </div>
    </div>
  );
};
