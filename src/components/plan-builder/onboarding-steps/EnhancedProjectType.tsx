
import React, { useState, useEffect } from 'react';
import { ProjectTypeGrid } from './project-type/ProjectTypeGrid';
import { ScaleSelector } from './project-type/ScaleSelector';
import { ProjectTypeInfo as TypeInfo } from './project-type/ProjectTypeInfo';
import { ProjectTypeInfo } from './project-type/ProjectTypeInfo';
import { projectTypes } from './project-type/ProjectTypeData';

interface ProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (key: string, value: any) => void;
  onComplete: () => void;
}

export function EnhancedProjectType({ 
  projectType, 
  projectScale, 
  updateProjectData,
  onComplete
}: ProjectTypeProps) {
  const [selectedType, setSelectedType] = useState(projectType);
  const [selectedScale, setSelectedScale] = useState(projectScale);
  const [showDetails, setShowDetails] = useState(false);
  
  // Update completion status when values change
  useEffect(() => {
    if (selectedType) {
      onComplete();
      updateProjectData('projectType', selectedType);
      updateProjectData('projectScale', selectedScale);
    }
  }, [selectedType, selectedScale, onComplete, updateProjectData]);

  const getSelectedTypeInfo = (): TypeInfo | null => {
    return selectedType ? projectTypes[selectedType] || null : null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What type of project are you planning?</h2>
        <p className="text-muted-foreground">
          Select the category that best matches your project goals.
        </p>
      </div>

      <ProjectTypeGrid 
        selectedType={selectedType} 
        setSelectedType={setSelectedType} 
        setShowDetails={setShowDetails} 
      />

      {selectedType && (
        <ScaleSelector 
          selectedScale={selectedScale} 
          setSelectedScale={setSelectedScale}
          getSelectedTypeInfo={getSelectedTypeInfo}
        />
      )}

      {selectedType && showDetails && (
        <ProjectTypeInfo 
          selectedType={selectedType} 
          selectedScale={selectedScale}
          getSelectedTypeInfo={getSelectedTypeInfo}
        />
      )}
    </div>
  );
}
