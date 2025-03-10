
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { projectTypes } from './ProjectTypeData';

export interface ProjectTypeInfoProps {
  typeId: string;
  onClose: () => void;
}

export const ProjectTypeInfo: React.FC<ProjectTypeInfoProps> = ({ typeId, onClose }) => {
  const projectType = projectTypes.find(type => type.id === typeId);

  if (!projectType) {
    return (
      <div className="p-4 text-center">
        <p>Project type information not found.</p>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4"
    >
      <h3 className="text-xl font-semibold mb-3">{projectType.name}</h3>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">{projectType.description}</p>
        
        {projectType.keyFeatures && (
          <div>
            <h4 className="font-medium mb-2">Key Features</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {projectType.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {projectType.timeline && (
          <div>
            <h4 className="font-medium mb-2">Typical Timeline</h4>
            <p className="text-sm">{projectType.timeline}</p>
          </div>
        )}
        
        {projectType.bestFor && (
          <div>
            <h4 className="font-medium mb-2">Best For</h4>
            <p className="text-sm">{projectType.bestFor}</p>
          </div>
        )}
        
        <Button onClick={onClose} className="w-full">Close</Button>
      </div>
    </motion.div>
  );
};
