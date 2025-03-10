
import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import { usePoints } from '@/hooks/usePoints';
import { useAuthSession } from '@/hooks/useAuthSession';

export interface ShareButtonsProps {
  url: string;
  title: string;
  summary?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, summary = '' }) => {
  const { user } = useAuthSession();
  const { awardPoints } = usePoints(user?.id);

  const handleShare = (platform: string) => {
    if (user?.id) {
      awardPoints('share_article');
    }
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary || '')}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleShare('twitter')}
      >
        <Twitter size={16} />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleShare('facebook')}
      >
        <Facebook size={16} />
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleShare('linkedin')}
      >
        <Linkedin size={16} />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleShare('email')}
      >
        <Mail size={16} />
        Email
      </Button>
    </div>
  );
};
