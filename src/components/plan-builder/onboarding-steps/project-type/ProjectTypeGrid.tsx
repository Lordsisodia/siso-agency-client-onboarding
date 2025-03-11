
import React from 'react';
import { projectTypes } from './ProjectTypeData';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface ProjectTypeGridProps {
  selectedType: string;
  onSelect: (typeId: string) => void;
}

const ProjectTypeGrid = ({ selectedType, onSelect }: ProjectTypeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
      {projectTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;
        
        return (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer transition-all border border-siso-border hover:border-siso-orange/50",
              isSelected ? 
                "bg-gradient-to-br from-siso-red/10 to-siso-orange/10 shadow-md border-siso-orange" : 
                "bg-black/20 backdrop-blur-sm"
            )}
            onClick={() => onSelect(type.id)}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={cn(
                "p-2 rounded-md",
                isSelected ? "bg-gradient-to-br from-siso-red to-siso-orange text-white" : "bg-black/20"
              )}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>{type.name}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm mt-2">
                <p className="font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {type.features.map((feature, i) => (
                    <li key={i} className="text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProjectTypeGrid;
