
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from 'lucide-react';

export interface EnhancedProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (data: Record<string, any>) => void;
}

export const EnhancedProjectType = ({ 
  projectType,
  projectScale,
  updateProjectData
}: EnhancedProjectTypeProps) => {
  const [selectedType, setSelectedType] = useState(projectType || '');
  const [selectedScale, setSelectedScale] = useState(projectScale || 'standard');
  
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    updateProjectData({ projectType: typeId });
  };
  
  const handleScaleSelect = (scale: string) => {
    setSelectedScale(scale);
    updateProjectData({ projectScale: scale });
  };

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
      
      {/* Placeholder for project type selection */}
      <div className="my-6">
        <h3 className="text-xl font-medium mb-4">Project Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['ecommerce', 'portfolio', 'business', 'saas'].map(type => (
            <Card 
              key={type}
              className={`cursor-pointer ${selectedType === type ? 'border-primary' : ''}`}
              onClick={() => handleTypeSelect(type)}
            >
              <CardContent className="p-4 text-center">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {selectedType && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-2">Project Scale</h3>
          <p className="text-muted-foreground mb-4">
            Choose the scale of your project based on your timeline and budget constraints.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['mvp', 'standard', 'premium'].map(scale => (
              <Card 
                key={scale}
                className={`cursor-pointer ${selectedScale === scale ? 'border-primary' : ''}`}
                onClick={() => handleScaleSelect(scale)}
              >
                <CardContent className="p-4 text-center">
                  {scale.charAt(0).toUpperCase() + scale.slice(1)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedProjectType;
