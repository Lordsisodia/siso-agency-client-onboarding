
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShareButtons } from '../ShareButtons';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  summary: string;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  onOpenChange,
  title,
  summary,
}) => {
  const [url] = useState(window.location.href);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Article</DialogTitle>
          <DialogDescription>
            Share this article with your network
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              value={url}
              readOnly
              className="font-mono text-sm"
            />
          </div>
          <Button size="sm" variant="outline" onClick={handleCopyLink}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Share via:</p>
          <ShareButtons title={title} summary={summary} url={url} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
