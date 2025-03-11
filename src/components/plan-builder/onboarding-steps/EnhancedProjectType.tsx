
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectTypeGrid } from './project-type/ProjectTypeGrid';
import { ProjectTypeInfo } from './project-type/ProjectTypeInfo';
import { ScaleSelector } from './project-type/ScaleSelector';
import { Badge } from '@/components/ui/badge';
import { projectTypes } from './project-type/ProjectTypeData';

export interface EnhancedProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (key: string, value: any) => void;
}

export const EnhancedProjectType: React.FC<EnhancedProjectTypeProps> = ({ 
  projectType, 
  projectScale, 
  updateProjectData
}) => {
  const [selectedProjectType, setSelectedProjectType] = useState<string>(projectType || '');
  const [selectedScale, setSelectedScale] = useState<string>(projectScale || 'medium');

  // Find the currently selected project type info
  const selectedTypeInfo = projectTypes.find(type => type.id === selectedProjectType);

  // Handle project type selection
  const handleProjectTypeSelect = (typeId: string) => {
    setSelectedProjectType(typeId);
    updateProjectData('projectType', typeId);
  };

  // Handle scale selection
  const handleScaleSelect = (scale: string) => {
    setSelectedScale(scale);
    updateProjectData('projectScale', scale);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-semibold text-siso-text">Project Type</h2>
          <p className="text-siso-text-muted">
            Select the type of project you want to create. This will help us tailor the planning process.
          </p>
        </div>

        <div className="space-y-8">
          {/* Project Type Selection Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-siso-text">Choose Project Type</h3>
              {selectedProjectType && (
                <Badge variant="outline" className="text-xs">
                  {selectedTypeInfo?.name || 'Selected'}
                </Badge>
              )}
            </div>
            
            <ProjectTypeGrid
              selectedType={selectedProjectType}
              onSelect={handleProjectTypeSelect}
            />
          </div>

          {/* Project Scale Selection */}
          {selectedProjectType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-siso-text">Project Scale</h3>
                <Badge variant="outline" className="text-xs">
                  {selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)}
                </Badge>
              </div>
              
              <ScaleSelector
                selected={selectedScale}
                onSelect={handleScaleSelect}
              />
              
              {/* Project Type Info Card */}
              <ProjectTypeInfo
                selectedType={selectedProjectType}
                selectedScale={selectedScale}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
