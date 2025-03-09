
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Globe, ShoppingCart, Brush, Terminal, LayoutGrid } from 'lucide-react';

interface ProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (key: string, value: any) => void;
}

export function ProjectType({ projectType, projectScale, updateProjectData }: ProjectTypeProps) {
  const projectTypes = [
    { id: 'mobile', name: 'Mobile App', icon: <Smartphone className="w-6 h-6" /> },
    { id: 'web', name: 'Website', icon: <Globe className="w-6 h-6" /> },
    { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingCart className="w-6 h-6" /> },
    { id: 'design', name: 'UI/UX Design', icon: <Brush className="w-6 h-6" /> },
    { id: 'software', name: 'Software', icon: <Terminal className="w-6 h-6" /> },
    { id: 'other', name: 'Other', icon: <LayoutGrid className="w-6 h-6" /> },
  ];

  const projectScales = [
    { id: 'small', name: 'Small (1-3 months)' },
    { id: 'medium', name: 'Medium (3-6 months)' },
    { id: 'large', name: 'Large (6+ months)' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">What type of project are you planning?</h3>
        <p className="text-muted-foreground mb-4">Select the category that best describes your project</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projectTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all ${
                  projectType === type.id 
                    ? 'border-primary bg-primary/10' 
                    : 'hover:bg-card/80 hover:border-muted'
                }`}
                onClick={() => updateProjectData('projectType', type.id)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    projectType === type.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {type.icon}
                  </div>
                  <span className="font-medium">{type.name}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">What is the scale of your project?</h3>
        <p className="text-muted-foreground mb-4">This helps us estimate resources and timeline</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {projectScales.map((scale) => (
            <motion.div
              key={scale.id}
              className="flex-1"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Card 
                className={`cursor-pointer transition-all h-full ${
                  projectScale === scale.id 
                    ? 'border-primary bg-primary/10' 
                    : 'hover:bg-card/80 hover:border-muted'
                }`}
                onClick={() => updateProjectData('projectScale', scale.id)}
              >
                <CardContent className="p-4 flex items-center justify-center h-full">
                  <span className="font-medium">{scale.name}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
