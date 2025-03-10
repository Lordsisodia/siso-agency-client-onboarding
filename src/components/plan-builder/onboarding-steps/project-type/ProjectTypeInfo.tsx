
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/ui/animations';
import { ProjectTypeData } from './ProjectTypeData';

// Import as a type
import type { ProjectTypeInfo as ProjectTypeInfoType } from './ProjectTypeData';

interface ProjectTypeInfoProps {
  selectedType: string | null;
}

export const ProjectTypeInfo: React.FC<ProjectTypeInfoProps> = ({ selectedType }) => {
  if (!selectedType) return null;

  const projectInfo = ProjectTypeData.find(
    (type) => type.id === selectedType
  );

  if (!projectInfo) return null;

  return (
    <motion.div
      className="mt-4 space-y-2 text-sm bg-gray-50 rounded-lg p-4 dark:bg-gray-800"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h3 className="font-medium text-base mb-2">{projectInfo.title} Details</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-3">{projectInfo.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm mb-1">Typical Features:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
            {projectInfo.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-1">Timeline Estimate:</h4>
          <p className="text-gray-600 dark:text-gray-300">
            {projectInfo.timelineEstimate}
          </p>

          <h4 className="font-medium text-sm mt-3 mb-1">Budget Range:</h4>
          <p className="text-gray-600 dark:text-gray-300">
            {projectInfo.budgetRange}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
