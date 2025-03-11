
import React from 'react';

type InfoBoxProps = {
  title: string;
  items: string[];
};

export const InfoBox: React.FC<InfoBoxProps> = ({ title, items }) => {
  return (
    <div className="bg-siso-bg-alt/20 rounded-lg p-4 border border-siso-border/40">
      <h3 className="font-medium mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-1 text-sm text-siso-text/70">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
