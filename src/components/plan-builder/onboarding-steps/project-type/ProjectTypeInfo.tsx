
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
// Import projectTypes instead of ProjectTypeData
import { projectTypes } from './ProjectTypeData';

export interface ProjectTypeInfoProps {
  selectedType: string;
  selectedScale: string;
}

const ProjectTypeInfo: React.FC<ProjectTypeInfoProps> = ({ 
  selectedType,
  selectedScale
}) => {
  // Find the selected project type data
  const typeInfo = projectTypes.find(type => type.id === selectedType);
  
  if (!typeInfo) {
    return (
      <div className="bg-siso-bg-alt p-4 rounded-lg border border-siso-border">
        <p className="text-siso-text">Please select a project type to see details.</p>
      </div>
    );
  }

  // Get complexity level based on selected scale
  const complexityLevel = selectedScale === 'small' 
    ? 'Basic' 
    : selectedScale === 'medium' 
      ? 'Standard' 
      : 'Advanced';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-siso-bg-alt p-6 rounded-lg border border-siso-border relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-siso-orange/5 z-0"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-siso-text-bold mb-2 flex items-center">
          <span className={cn(
            "w-6 h-6 inline-flex items-center justify-center rounded-full mr-2 text-white text-xs",
            typeInfo.colorClass || "bg-siso-orange"
          )}>
            {typeInfo.icon || "🚀"}
          </span>
          {typeInfo.name}
        </h3>
        
        <p className="text-siso-text-muted mb-4">{typeInfo.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-siso-text-bold mb-1">Complexity: {complexityLevel}</h4>
          <div className="h-2 bg-siso-bg-card rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full",
                selectedScale === 'small' ? 'w-1/3 bg-green-500' :
                selectedScale === 'medium' ? 'w-2/3 bg-yellow-500' :
                'w-full bg-red-500'
              )}
            ></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-siso-text-bold mb-1">Typical Timeline</h4>
            <p className="text-sm text-siso-text">
              {selectedScale === 'small' ? typeInfo.timelineSmall :
               selectedScale === 'medium' ? typeInfo.timelineMedium :
               typeInfo.timelineLarge}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-siso-text-bold mb-1">Estimated Budget Range</h4>
            <p className="text-sm text-siso-text">
              {selectedScale === 'small' ? typeInfo.budgetSmall :
               selectedScale === 'medium' ? typeInfo.budgetMedium :
               typeInfo.budgetLarge}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-siso-text-bold mb-1">Key Features</h4>
            <ul className="text-sm text-siso-text list-disc list-inside">
              {(selectedScale === 'small' ? typeInfo.featuresSmall :
                selectedScale === 'medium' ? typeInfo.featuresMedium :
                typeInfo.featuresLarge).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectTypeInfo;
