
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ProjectTypeInfoProps {
  selectedType: string;
  selectedScale: string;
  getSelectedTypeInfo: () => ProjectTypeInfo | null;
}

export interface ProjectTypeInfo {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  techStack: string[];
  timeEstimate: {
    small: string;
    medium: string;
    large: string;
  };
  costEstimate: {
    small: string;
    medium: string;
    large: string;
  };
}

export function ProjectTypeInfo({ selectedType, selectedScale, getSelectedTypeInfo }: ProjectTypeInfoProps) {
  const typeInfo = getSelectedTypeInfo();
  
  if (!selectedType || !typeInfo) return null;
  
  const getScaleBadgeColor = (scale: string) => {
    switch (scale) {
      case 'small':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'large':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5 }}
      className="mt-6 bg-muted/20 p-4 rounded-lg border border-border"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          {typeInfo.icon}
          <span className="ml-2">{typeInfo.title} Details</span>
        </h3>
        <Badge className={getScaleBadgeColor(selectedScale)}>
          {selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)} Project
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium">Example Projects</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
            {typeInfo.examples.map((example, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {example}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium">Common Technologies</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {typeInfo.techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Badge variant="outline" className="bg-background/50">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center gap-1 text-xs underline underline-offset-4">
              <Info className="h-3 w-3" /> How are estimates calculated?
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Estimates are based on industry averages for similar projects. Actual costs and timelines may vary based on specific requirements, team composition, and other factors.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
