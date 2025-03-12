
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Link, FileEdit } from 'lucide-react';

interface ProjectHeaderProps {
  onGoBack: () => void;
  onWebsiteAnalysis: () => void;
  onManualInput: () => void;
  showActionButtons: boolean;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  onGoBack,
  onWebsiteAnalysis,
  onManualInput,
  showActionButtons
}) => {
  return (
    <div className="mb-6 flex items-center justify-between relative backdrop-blur-sm bg-card/30 p-3 rounded-lg">
      <Button 
        onClick={onGoBack}
        variant="outline"
        className="h-8 text-sm border-siso-border text-siso-text hover:bg-siso-bg-card flex items-center gap-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Button>
      
      {showActionButtons && (
        <div className="flex gap-2">
          <Button 
            onClick={onWebsiteAnalysis}
            variant="outline"
            className="h-8 text-sm border-siso-border bg-card/50 backdrop-blur-sm text-siso-text hover:bg-siso-bg-alt hover:border-siso-border-hover flex items-center gap-2 transition-all duration-300"
          >
            <Link className="w-3.5 h-3.5" />
            <span>Website Analysis</span>
          </Button>
          
          <Button 
            onClick={onManualInput}
            variant="outline"
            className="h-8 text-sm border-siso-border bg-card/50 backdrop-blur-sm text-siso-text hover:bg-siso-bg-alt hover:border-siso-border-hover flex items-center gap-2 transition-all duration-300"
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Manual Input</span>
          </Button>
        </div>
      )}
    </div>
  );
};
