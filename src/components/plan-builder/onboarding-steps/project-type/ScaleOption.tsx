
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Clock } from 'lucide-react';
import { ScaleOptionType } from './ProjectTypeData';
import { ProjectTypeInfo } from './ProjectTypeData';

interface ScaleOptionProps {
  scale: ScaleOptionType;
  selectedScale: string;
  setSelectedScale: (scale: string) => void;
  getSelectedTypeInfo: () => ProjectTypeInfo | null;
}

export function ScaleOption({ 
  scale, 
  selectedScale, 
  setSelectedScale,
  getSelectedTypeInfo
}: ScaleOptionProps) {
  const isSelected = selectedScale === scale.value;
  const typeInfo = getSelectedTypeInfo();
  
  const springConfig = { type: "spring", stiffness: 300, damping: 20 };

  return (
    <motion.div
      whileHover={{ 
        y: -6, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ 
        y: 0,
        transition: { duration: 0.2 } 
      }}
    >
      <Card 
        className={`cursor-pointer transition-all h-full overflow-hidden relative ${
          isSelected 
            ? 'border-primary shadow-lg bg-primary/5' 
            : 'hover:bg-card/80 hover:border-muted hover:shadow-md'
        }`}
        onClick={() => setSelectedScale(scale.value)}
      >
        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
          {isSelected && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center"
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
          
          <motion.div 
            className="mb-3" 
            animate={{ 
              scale: isSelected ? [1, 1.2, 1] : 1 
            }}
            transition={{ 
              duration: 0.5,
              repeat: isSelected ? 0 : 0
            }}
          >
            <motion.div 
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-siso-red to-siso-orange text-white shadow-md'
                  : 'bg-muted'
              }`}
              whileHover={{ 
                scale: isSelected ? 1 : 1.1,
                backgroundColor: isSelected ? "" : "rgba(255, 87, 34, 0.1)"
              }}
              transition={springConfig}
            >
              <Clock className="w-6 h-6" />
            </motion.div>
          </motion.div>
          
          <motion.span 
            className="font-medium text-center mb-1"
            animate={{ 
              color: isSelected ? "#FF5722" : "" 
            }}
            transition={{ duration: 0.2 }}
          >
            {scale.name}
          </motion.span>
          
          <p className="text-xs text-muted-foreground text-center mb-2">{scale.description}</p>
          
          {typeInfo && (
            <div className="mt-2 text-center">
              <div className="text-xs font-medium">
                <span className="text-muted-foreground">Time: </span>
                <span>{typeInfo.timeEstimate[scale.value]}</span>
              </div>
              <div className="text-xs font-medium">
                <span className="text-muted-foreground">Cost: </span>
                <span>{typeInfo.costEstimate[scale.value]}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
