
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Globe, ShoppingCart, Brush, Terminal, LayoutGrid, BadgeCheck, Clock } from 'lucide-react';

export interface EnhancedProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (data: Record<string, any>) => void;
}

export function EnhancedProjectType({ projectType, projectScale, updateProjectData }: EnhancedProjectTypeProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const projectTypes = [
    { id: 'mobile', name: 'Mobile App', icon: <Smartphone className="w-6 h-6" /> },
    { id: 'web', name: 'Website', icon: <Globe className="w-6 h-6" /> },
    { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingCart className="w-6 h-6" /> },
    { id: 'design', name: 'UI/UX Design', icon: <Brush className="w-6 h-6" /> },
    { id: 'software', name: 'Software', icon: <Terminal className="w-6 h-6" /> },
    { id: 'other', name: 'Other', icon: <LayoutGrid className="w-6 h-6" /> },
  ];

  const projectScales = [
    { id: 'small', name: 'Small (1-3 months)' },
    { id: 'medium', name: 'Medium (3-6 months)' },
    { id: 'large', name: 'Large (6+ months)' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
  };
  
  const springConfig = { type: "spring", stiffness: 300, damping: 20 };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      <motion.div variants={item}>
        <h3 className="text-xl font-semibold mb-2">What type of project are you planning?</h3>
        <p className="text-muted-foreground mb-6">Select the category that best describes your project</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projectTypes.map((type, index) => (
            <motion.div
              key={type.id}
              variants={item}
              custom={index}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.2 } 
              }}
              onHoverStart={() => setHoveredCard(type.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card 
                className={`cursor-pointer transition-all relative overflow-hidden ${
                  projectType === type.id 
                    ? 'border-primary shadow-lg bg-primary/5' 
                    : 'hover:bg-card/80 hover:border-muted hover:shadow-md'
                }`}
                onClick={() => updateProjectData({ projectType: type.id })}
              >
                {projectType === type.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center z-10"
                  >
                    <BadgeCheck className="w-3 h-3 text-white" />
                  </motion.div>
                )}
                
                {projectType === type.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-siso-red/5 to-siso-orange/10 -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 relative ${
                      projectType === type.id
                        ? 'bg-gradient-to-br from-siso-red to-siso-orange text-white shadow-lg'
                        : 'bg-muted'
                    }`}
                  >
                    {hoveredCard === type.id && projectType !== type.id && (
                      <motion.div 
                        className="absolute inset-0 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: "radial-gradient(circle at center, rgba(255, 87, 34, 0.5) 0%, rgba(255, 160, 0, 0) 70%)"
                        }}
                      />
                    )}
                    
                    <motion.div>
                      {type.icon}
                    </motion.div>
                    
                    {projectType === type.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: [0.2, 0.6, 0.2],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{
                          background: "radial-gradient(circle at center, rgba(255, 87, 34, 0.5) 0%, rgba(255, 160, 0, 0) 70%)"
                        }}
                      />
                    )}
                  </motion.div>
                  <motion.span 
                    className="font-medium"
                    animate={{ 
                      color: hoveredCard === type.id && projectType !== type.id ? "#FF5722" : "" 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {type.name}
                  </motion.span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div variants={item}>
        <h3 className="text-xl font-semibold mb-2">What is the scale of your project?</h3>
        <p className="text-muted-foreground mb-6">This helps us estimate resources and timeline</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {projectScales.map((scale, index) => (
            <motion.div
              key={scale.id}
              variants={item}
              custom={index + 6} // offset from previous section
              className="flex-1"
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
                className={`cursor-pointer transition-all h-full overflow-hidden ${
                  projectScale === scale.id 
                    ? 'border-primary shadow-lg bg-primary/5' 
                    : 'hover:bg-card/80 hover:border-muted hover:shadow-md'
                }`}
                onClick={() => updateProjectData({ projectScale: scale.id })}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center h-full relative">
                  {projectScale === scale.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-r from-siso-red to-siso-orange flex items-center justify-center"
                    >
                      <BadgeCheck className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                  
                  {projectScale === scale.id && (
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
                      scale: projectScale === scale.id ? [1, 1.2, 1] : 1 
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: projectScale === scale.id ? 0 : 0
                    }}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 relative ${
                        projectScale === scale.id
                          ? 'bg-gradient-to-br from-siso-red to-siso-orange text-white shadow-md'
                          : 'bg-muted'
                      }`}
                      whileHover={{ 
                        scale: projectScale !== scale.id ? 1.1 : 1,
                        backgroundColor: projectScale !== scale.id ? "rgba(255, 87, 34, 0.1)" : ""
                      }}
                      transition={springConfig}
                    >
                      <Clock className="w-6 h-6" />
                      
                      {projectScale === scale.id && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: [0.2, 0.5, 0.2],
                            scale: [0.8, 1.1, 0.8]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            background: "radial-gradient(circle at center, rgba(255, 87, 34, 0.5) 0%, rgba(255, 160, 0, 0) 70%)"
                          }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                  
                  <motion.span 
                    className="font-medium text-center"
                    animate={{ 
                      color: projectScale === scale.id ? "#FF5722" : "" 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {scale.name}
                  </motion.span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
