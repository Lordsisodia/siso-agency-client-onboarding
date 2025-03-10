
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share, Twitter, Facebook, Linkedin, Link } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { usePoints } from '@/hooks/usePoints';
import { useAuthSession } from '@/hooks/useAuthSession';

interface ShareButtonsProps {
  url: string;
  title: string;
  onShare?: () => void;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, onShare }) => {
  const { user } = useAuthSession();
  const { awardPoints } = usePoints(user?.id);

  const handleShare = async (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
        });
        // Award points for sharing
        if (user?.id) {
          awardPoints('share_article'); // Updated to match the PointActionType
        }
        if (onShare) onShare();
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      
      // Award points for sharing
      if (user?.id) {
        awardPoints('share_article'); // Updated to match the PointActionType
      }
      
      if (onShare) onShare();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 mr-1 hidden sm:inline-block">Share:</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-blue-400 hover:text-blue-600 hover:bg-blue-100"
        onClick={() => handleShare('twitter')}
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
        onClick={() => handleShare('facebook')}
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-blue-700 hover:text-blue-900 hover:bg-blue-100"
        onClick={() => handleShare('linkedin')}
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        onClick={() => handleShare('copy')}
        title="Copy Link"
      >
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
};
