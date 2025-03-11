
import React from 'react';
import { ArrowRight, Check, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SlideIn } from '@/components/ui/animations';
import { projectTypes } from './ProjectTypeData';

export interface ProjectTypeInfoProps {
  selectedType?: string;
  selectedScale?: string;
}

export const ProjectTypeInfo: React.FC<ProjectTypeInfoProps> = ({ 
  selectedType,
  selectedScale
}) => {
  if (!selectedType) {
    return null;
  }

  // Find the matching project type
  const typeInfo = projectTypes.find(type => type.id === selectedType);
  
  if (!typeInfo) {
    return null;
  }

  // Determine features based on selected scale
  const getScaleFeatures = (scale: string = 'medium') => {
    switch (scale) {
      case 'small':
        return typeInfo.features.slice(0, 3);
      case 'medium':
        return typeInfo.features.slice(0, 5);
      case 'large':
        return typeInfo.features;
      default:
        return typeInfo.features.slice(0, 5); // Default to medium
    }
  };

  const features = getScaleFeatures(selectedScale);

  return (
    <SlideIn direction="up" duration={0.4}>
      <Card className="border border-siso-border/30 shadow-sm">
        <CardContent className="p-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-siso-orange/10 p-2 rounded-full">
                <Info className="h-4 w-4 text-siso-orange" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-siso-text">What's included in a {selectedScale} {typeInfo.name}</h3>
                <p className="text-xs text-siso-text-muted mt-1">
                  {typeInfo.description}
                </p>
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-xs font-medium text-siso-text mb-2">Features & Capabilities:</h4>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs">
                    <span className="mt-0.5 text-green-500">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-siso-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2">
              <h4 className="text-xs font-medium text-siso-text mb-2">Timeline Estimate:</h4>
              <p className="text-xs text-siso-text">
                {selectedScale === 'small' ? typeInfo.timelineSmall : 
                 selectedScale === 'large' ? typeInfo.timelineLarge : 
                 typeInfo.timelineMedium}
              </p>
            </div>
            
            <div className="pt-1 text-xs text-siso-text-muted">
              <p className="flex items-center gap-1">
                <span>All projects include responsive design and basic SEO optimization</span>
                <ArrowRight className="h-3 w-3" />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </SlideIn>
  );
};
