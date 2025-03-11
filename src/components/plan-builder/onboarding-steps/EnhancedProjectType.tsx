
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectTypeGrid from './project-type/ProjectTypeGrid';
import ScaleSelector from './project-type/ScaleSelector';
import { projectTypes } from './project-type/ProjectTypeData';
import { Sparkles } from 'lucide-react';

export interface EnhancedProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (key: string, value: any) => void;
  onComplete?: () => void;
}

const EnhancedProjectType = ({ 
  projectType,
  projectScale,
  updateProjectData,
  onComplete
}: EnhancedProjectTypeProps) => {
  const [selectedType, setSelectedType] = useState(projectType || '');
  const [selectedScale, setSelectedScale] = useState(projectScale || 'standard');
  
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    updateProjectData('projectType', typeId);
  };
  
  const handleScaleSelect = (scale: string) => {
    setSelectedScale(scale);
    updateProjectData('projectScale', scale);
  };

  const handleNext = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const selectedProjectType = projectTypes.find(type => type.id === selectedType);

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center gap-2">
        <div className="bg-siso-orange p-1.5 rounded-md">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold">What type of project are you building?</h2>
      </div>
      
      <CardDescription className="text-md max-w-3xl">
        Choose the type of project you're looking to build. This helps us customize the planning process
        to fit your specific needs and goals.
      </CardDescription>
      
      <div className="my-6">
        <h3 className="text-xl font-medium mb-4">Project Type</h3>
        <ProjectTypeGrid
          selectedType={selectedType}
          onSelect={handleTypeSelect}
        />
      </div>
      
      {selectedType && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Project Scale</h3>
          <p className="text-muted-foreground mb-4">
            Choose the scale of your project based on your timeline and budget constraints.
          </p>
          
          <ScaleSelector
            selected={selectedScale}
            onSelect={handleScaleSelect}
          />
          
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleNext}
              size="lg"
              className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedProjectType;
