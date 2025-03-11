
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type DatasetToggleProps = {
  useExpandedData: boolean;
  onToggle: (checked: boolean) => void;
};

export const DatasetToggle: React.FC<DatasetToggleProps> = ({ 
  useExpandedData, 
  onToggle 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="expanded-mode" className="text-sm font-medium">
          Use expanded documentation dataset
        </Label>
        <span className="text-xs text-siso-text/60">
          Includes more categories and detailed Q&A content
        </span>
      </div>
      <Switch 
        id="expanded-mode" 
        checked={useExpandedData} 
        onCheckedChange={onToggle}
      />
    </div>
  );
};
