
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Share2 } from 'lucide-react';

interface SocialMediaStepProps {
  socialLinks: {
    twitter: string;
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  onSocialLinkChange: (platform: string, value: string) => void;
  onNext: () => void;
}

export const SocialMediaStep: React.FC<SocialMediaStepProps> = ({ 
  socialLinks, 
  onSocialLinkChange, 
  onNext 
}) => {
  const hasSocialLinks = Object.values(socialLinks).some(link => link.trim() !== '');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Any social media to share?</h3>
        <p className="text-muted-foreground">Your social profiles help us understand your online presence and audience</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Share2 className="w-5 h-5 text-siso-orange mt-0.5" />
          <div>
            <p className="text-sm font-medium">Why this matters</p>
            <p className="text-xs text-muted-foreground">We can analyze your social media presence to better understand your brand voice, audience engagement, and content strategy.</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <Label htmlFor="twitter" className="text-base">Twitter/X</Label>
            <Input
              id="twitter"
              value={socialLinks.twitter}
              onChange={(e) => onSocialLinkChange('twitter', e.target.value)}
              placeholder="https://twitter.com/yourusername"
              className="w-full mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="linkedin" className="text-base">LinkedIn</Label>
            <Input
              id="linkedin"
              value={socialLinks.linkedin}
              onChange={(e) => onSocialLinkChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="instagram" className="text-base">Instagram</Label>
            <Input
              id="instagram"
              value={socialLinks.instagram}
              onChange={(e) => onSocialLinkChange('instagram', e.target.value)}
              placeholder="https://instagram.com/yourusername"
              className="w-full mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="facebook" className="text-base">Facebook</Label>
            <Input
              id="facebook"
              value={socialLinks.facebook}
              onChange={(e) => onSocialLinkChange('facebook', e.target.value)}
              placeholder="https://facebook.com/yourpage"
              className="w-full mt-1"
            />
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={onNext}
            className="w-full"
          >
            {hasSocialLinks ? 'Next' : 'Skip Social Media'}
          </Button>
        </div>
      </div>
    </div>
  );
};
