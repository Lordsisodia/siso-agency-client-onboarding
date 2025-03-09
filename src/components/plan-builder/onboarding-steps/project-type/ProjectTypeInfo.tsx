
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Monitor, Info } from 'lucide-react';
import { ProjectTypeInfo } from './ProjectTypeData';

interface ProjectTypeInfoProps {
  typeInfo: ProjectTypeInfo | null;
  selectedScale: string;
}

export function ProjectTypeInfo({ typeInfo, selectedScale }: ProjectTypeInfoProps) {
  if (!typeInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <h3 className="text-lg font-semibold mb-3">{typeInfo.name} Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Estimated Timeline</span>
          </div>
          <p className="text-base font-medium">{typeInfo.timeEstimate[selectedScale]}</p>
        </div>
        
        <div className="bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Estimated Cost</span>
          </div>
          <p className="text-base font-medium">{typeInfo.costEstimate[selectedScale]}</p>
        </div>
        
        <div className="md:col-span-2 bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">Description</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{typeInfo.description}</p>
          
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Monitor className="w-4 h-4" />
            <span className="text-sm font-medium">Examples</span>
          </div>
          <ul className="text-sm text-muted-foreground list-disc list-inside">
            {typeInfo.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
