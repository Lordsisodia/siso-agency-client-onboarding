
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  TwitterIcon, 
  FacebookIcon, 
  LinkedinIcon, 
  MailIcon, 
  LinkIcon 
} from 'lucide-react';

export interface ShareButtonsProps {
  title: string;
  summary?: string; // Make summary optional to fix type error
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  title, 
  summary = "", 
  url = window.location.href 
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'Email',
      icon: MailIcon,
      url: `mailto:?subject=${encodedTitle}&body=${encodedSummary}%0A%0A${encodedUrl}`,
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white py-2 px-4 rounded flex items-center justify-center`}
          >
            <link.icon className="h-4 w-4 mr-2" />
            {link.name}
          </a>
        ))}
      </div>
      
      <Button
        onClick={copyToClipboard}
        variant="outline"
        className="flex items-center justify-center"
      >
        <LinkIcon className="h-4 w-4 mr-2" />
        Copy Link
      </Button>
    </div>
  );
};
