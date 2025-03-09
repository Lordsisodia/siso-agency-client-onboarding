
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react';
import { ProjectTypeInfo } from './ProjectTypeData';

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
  const handleSelect = () => {
    setSelectedType(typeKey);
    setShowDetails(true);
  };

  const isSelected = selectedType === typeKey;

  return (
    <Card
      className={`cursor-pointer transition-all relative overflow-hidden ${
        isSelected
          ? 'border-primary shadow-lg bg-primary/5'
          : 'hover:bg-card/80 hover:border-muted hover:shadow-md'
      }`}
      onClick={handleSelect}
    >
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center z-10"
        >
          <BadgeCheck className="w-3 h-3 text-white" />
        </motion.div>
      )}

      {isSelected && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-siso-red/5 to-siso-orange/10 -z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <CardContent className="p-6 flex flex-col items-center text-center">
        <motion.div 
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isSelected
              ? 'bg-gradient-to-br from-siso-red to-siso-orange text-white shadow-lg'
              : 'bg-muted'
          }`}
          whileHover={{ scale: isSelected ? 1 : 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {typeInfo.icon}
        </motion.div>
        <span className="font-medium">{typeInfo.name}</span>
      </CardContent>
    </Card>
  );
}
