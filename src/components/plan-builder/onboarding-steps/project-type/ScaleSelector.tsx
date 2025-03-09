
import React from 'react';
import { motion } from 'framer-motion';
import { ScaleOption } from './ScaleOption';
import { scaleOptions } from './ProjectTypeData';
import { ProjectTypeInfo } from './ProjectTypeInfo';

interface ScaleSelectorProps {
  selectedScale: string;
  setSelectedScale: (scale: string) => void;
  getSelectedTypeInfo: () => ProjectTypeInfo | null;
}

export function ScaleSelector({ selectedScale, setSelectedScale, getSelectedTypeInfo }: ScaleSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-6"
    >
      <h3 className="text-lg font-semibold mb-3">Project Scale</h3>
      <div className="grid grid-cols-3 gap-4">
        {scaleOptions.map((scale) => (
          <ScaleOption
            key={scale.value}
            scale={scale}
            selectedScale={selectedScale}
            setSelectedScale={setSelectedScale}
            getSelectedTypeInfo={getSelectedTypeInfo}
          />
        ))}
      </div>
    </motion.div>
  );
}
