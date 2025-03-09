
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ProjectTypeGrid } from './project-type/ProjectTypeGrid';
import { ScaleSelector } from './project-type/ScaleSelector';
import { ProjectTypeInfo as TypeInfo } from './project-type/ProjectTypeData';
import { ProjectTypeInfo } from './project-type/ProjectTypeInfo';
import { projectTypes } from './project-type/ProjectTypeData';

interface EnhancedProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (key: string, value: any) => void;
}

export function EnhancedProjectType({ 
  projectType, 
  projectScale, 
  updateProjectData 
}: EnhancedProjectTypeProps) {
  const [selectedType, setSelectedType] = useState<string>(projectType || '');
  const [selectedScale, setSelectedScale] = useState<string>(projectScale || 'medium');
  const [showDetails, setShowDetails] = useState<boolean>(!!projectType);

  // Update parent state when selections change
  const handleTypeChange = useCallback((type: string) => {
    setSelectedType(type);
    updateProjectData('projectType', type);
  }, [updateProjectData]);

  const handleScaleChange = useCallback((scale: string) => {
    setSelectedScale(scale);
    updateProjectData('projectScale', scale);
  }, [updateProjectData]);

  // Get the selected project type info
  const getSelectedTypeInfo = useCallback((): TypeInfo | null => {
    if (!selectedType) return null;
    return projectTypes[selectedType] || null;
  }, [selectedType]);

  return (
    <div className="space-y-8">
      <div>
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold mb-2"
        >
          What type of project are you planning?
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground mb-6"
        >
          Select the category that best describes your project
        </motion.p>

        <ProjectTypeGrid 
          selectedType={selectedType} 
          setSelectedType={handleTypeChange}
          setShowDetails={setShowDetails}
        />
      </div>

      {showDetails && (
        <>
          <ScaleSelector 
            selectedScale={selectedScale}
            setSelectedScale={handleScaleChange}
            getSelectedTypeInfo={getSelectedTypeInfo}
          />
          
          <ProjectTypeInfo 
            typeInfo={getSelectedTypeInfo()} 
            selectedScale={selectedScale} 
          />
        </>
      )}
      
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-siso-red/5 to-siso-orange/5 blur-3xl -z-10 opacity-60"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl -z-10 opacity-60"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
    </div>
  );
}
