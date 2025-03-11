
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dot } from 'lucide-react';

interface ProcessingTreeProps {
  categoryName?: string;
  stageName?: string;
  parentColor?: string;
  childColor?: string;
}

export function ProcessingTree({
  categoryName = "Processing",
  stageName = "Analyzing",
  parentColor = "bg-blue-500",
  childColor = "bg-indigo-400"
}: ProcessingTreeProps) {
  return (
    <div className="flex flex-col space-y-1 py-1 pl-1 opacity-80">
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Dot className={`h-5 w-5 text-${parentColor} animate-pulse`} />
        <span className="text-xs text-muted-foreground">{categoryName}</span>
      </motion.div>
      
      <AnimatePresence>
        <motion.div 
          className="flex items-center pl-4"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Dot className={`h-4 w-4 text-${childColor}`} />
          <span className="text-xs text-muted-foreground/70">{stageName}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
