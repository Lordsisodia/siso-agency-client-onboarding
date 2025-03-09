
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GeneratePromptProps {
  onGenerate: () => void;
  isAdmin: boolean;
  articleCount: number;
}

export function GeneratePrompt({ onGenerate, isAdmin, articleCount }: GeneratePromptProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Alert variant="default" className="bg-purple-950/20 border-purple-500/30">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          AI summary generation has been temporarily disabled.
        </AlertDescription>
      </Alert>
    </div>
  );
}
