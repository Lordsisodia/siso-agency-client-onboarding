
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ProjectTypeInfo } from './ProjectTypeInfo';

interface ScaleOptionProps {
  scale: {
    value: string;
    label: string;
    description: string;
  };
  selectedScale: string;
  setSelectedScale: (scale: string) => void;
  getSelectedTypeInfo: () => ProjectTypeInfo | null;
}

export function ScaleOption({ 
  scale, 
  selectedScale, 
  setSelectedScale, 
  getSelectedTypeInfo 
}: ScaleOptionProps) {
  const typeInfo = getSelectedTypeInfo();
  
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`p-3 cursor-pointer transition-all duration-300 ${
          selectedScale === scale.value 
            ? 'border-2 border-siso-orange shadow-md' 
            : 'border border-border hover:border-siso-orange/50'
        }`}
        onClick={() => setSelectedScale(scale.value)}
      >
        <h4 className="font-medium text-center">{scale.label}</h4>
        <p className="text-xs text-muted-foreground text-center mt-1">{scale.description}</p>
        
        {typeInfo && (
          <div className="mt-2 flex flex-col space-y-1">
            <div className="text-xs text-center">
              <span className="text-muted-foreground">Est. Time: </span>
              <span className="font-medium">
                {typeInfo.timeEstimate[scale.value as keyof typeof typeInfo.timeEstimate]}
              </span>
            </div>
            <div className="text-xs text-center">
              <span className="text-muted-foreground">Est. Cost: </span>
              <span className="font-medium">
                {typeInfo.costEstimate[scale.value as keyof typeof typeInfo.costEstimate]}
              </span>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
