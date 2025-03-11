
import React from 'react';
import { scaleOptions } from './ProjectTypeData';
import ScaleOption from './ScaleOption';

export interface ScaleSelectorProps {
  selected: string;
  onSelect: (scale: string) => void;
}

const ScaleSelector = ({ selected, onSelect }: ScaleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {scaleOptions.map((option) => (
        <ScaleOption
          key={option.id}
          option={option}
          selected={selected === option.id}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
};

export default ScaleSelector;
