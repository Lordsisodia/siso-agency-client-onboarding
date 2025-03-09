
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ProjectTypeInfo } from './ProjectTypeInfo';

interface ProjectTypeCardProps {
  typeKey: string;
  typeInfo: ProjectTypeInfo;
  selectedType: string;
  setSelectedType: (type: string) => void;
  setShowDetails: (show: boolean) => void;
}

export function ProjectTypeCard({ 
  typeKey, 
  typeInfo, 
  selectedType, 
  setSelectedType, 
  setShowDetails 
}: ProjectTypeCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`p-4 cursor-pointer h-full relative overflow-hidden transition-all duration-300 ${
          selectedType === typeKey 
            ? 'border-2 border-siso-red shadow-lg' 
            : 'border border-border hover:border-siso-red/50'
        }`}
        onClick={() => {
          setSelectedType(typeKey);
          setShowDetails(true);
        }}
      >
        {selectedType === typeKey && (
          <motion.div 
            className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-siso-red to-siso-orange"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <div className="flex flex-col items-center text-center">
          <div className={`p-3 rounded-full mb-3 ${
            selectedType === typeKey 
              ? 'bg-gradient-to-br from-siso-red/20 to-siso-orange/20' 
              : 'bg-muted/20'
          }`}>
            {typeInfo.icon}
          </div>
          <h3 className="font-semibold">{typeInfo.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{typeInfo.description}</p>
        </div>
      </Card>
    </motion.div>
  );
}
