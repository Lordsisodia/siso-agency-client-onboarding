
import React, { useState } from 'react';
import { AnimatedPlanningUI } from '@/components/planning/AnimatedPlanningUI';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ProjectPlanning = () => {
  const [planningStarted, setPlanningStarted] = useState(false);

  const startPlanning = () => {
    setPlanningStarted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Project Planning Assistant</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered planning assistant will help you create a detailed project plan with timeline, 
          requirements, and resource allocation.
        </p>
      </div>

      {!planningStarted ? (
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            onClick={startPlanning}
          >
            Start Planning
          </Button>
        </motion.div>
      ) : (
        <AnimatedPlanningUI />
      )}
    </div>
  );
};

export default ProjectPlanning;
