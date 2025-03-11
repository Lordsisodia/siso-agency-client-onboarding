
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScaleOptionType } from './ProjectTypeData';
import { projectTypes } from './ProjectTypeData';

interface ScaleOptionProps {
  option: ScaleOptionType;
  selected: boolean;
  onClick: () => void;
}

const ScaleOption = ({ option, selected, onClick }: ScaleOptionProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all border border-siso-border hover:border-siso-orange/50",
        selected ? 
          "bg-gradient-to-br from-siso-red/10 to-siso-orange/10 shadow-md border-siso-orange" : 
          "bg-black/20 backdrop-blur-sm"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{option.name}</CardTitle>
          {selected && (
            <div className="bg-gradient-to-r from-siso-red to-siso-orange rounded-full p-1">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        <CardDescription>{option.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Features</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {option.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <h4 className="font-medium">Timeline</h4>
              <p className="text-muted-foreground">{option.timeline}</p>
            </div>
            <div>
              <h4 className="font-medium">Budget</h4>
              <p className="text-muted-foreground">{option.budget}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScaleOption;
