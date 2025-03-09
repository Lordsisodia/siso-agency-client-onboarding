
import React from 'react';
import { motion } from 'framer-motion';
import { ProjectTypeCard } from './ProjectTypeCard';
import { projectTypes } from './ProjectTypeData';

interface ProjectTypeGridProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  setShowDetails: (show: boolean) => void;
}

export function ProjectTypeGrid({ 
  selectedType, 
  setSelectedType, 
  setShowDetails 
}: ProjectTypeGridProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Object.entries(projectTypes).map(([key, type]) => (
        <motion.div 
          key={key}
          variants={itemVariants}
        >
          <ProjectTypeCard
            typeKey={key}
            typeInfo={type}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setShowDetails={setShowDetails}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
