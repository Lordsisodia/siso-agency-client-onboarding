
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useProjectData } from '@/contexts/ProjectDataContext';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, CodeIcon, RocketIcon, InfoIcon, TagIcon, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LiveProjectOverview: React.FC = () => {
  const { projectData, isLoading } = useProjectData();
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  
  // When lastUpdatedField changes, highlight it briefly
  useEffect(() => {
    if (projectData.lastUpdatedField) {
      setHighlightedField(projectData.lastUpdatedField);
      const timer = setTimeout(() => {
        setHighlightedField(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [projectData.lastUpdatedField]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-siso-border">
        <div>
          <h2 className="text-xl font-semibold text-siso-text">Project Overview</h2>
          <p className="text-sm text-siso-text-muted">Live updated from your conversation</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-siso-text-muted">Project completion</div>
          <div className="w-24">
            <Progress value={projectData.completionPercentage || 0} className="h-2" />
          </div>
          <span className="text-xs font-medium text-siso-text-muted">{projectData.completionPercentage || 0}%</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-siso-bg-card/30 backdrop-blur-sm flex items-center justify-center z-10"
            >
              <div className="flex flex-col items-center">
                <div className="animate-spin h-8 w-8 border-4 border-siso-red border-t-transparent rounded-full mb-2"></div>
                <p className="text-siso-text-muted">Updating project data...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Project Title & Description */}
        <Card className={cn(
          "transition-all duration-300",
          highlightedField === 'title' || highlightedField === 'description' 
            ? "border-siso-red/70 shadow-md shadow-siso-red/20" 
            : "border-siso-border"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <RocketIcon className="w-5 h-5 mr-2 text-siso-orange" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="text-sm font-medium text-siso-text-muted">Project Name</div>
              <div className="font-medium">
                {projectData.title || (
                  <span className="text-siso-text-muted italic">Not specified yet</span>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium text-siso-text-muted">Description</div>
              <div>
                {projectData.description || (
                  <span className="text-siso-text-muted italic">No description provided yet</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Business Context */}
        <Card className={cn(
          "transition-all duration-300",
          highlightedField === 'businessContext' 
            ? "border-siso-red/70 shadow-md shadow-siso-red/20" 
            : "border-siso-border"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <BriefcaseIcon className="w-5 h-5 mr-2 text-siso-orange" />
              Business Context
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-siso-text-muted">Company</div>
                <div>
                  {projectData.businessContext?.companyName || (
                    <span className="text-siso-text-muted italic">Not specified</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium text-siso-text-muted">Industry</div>
                <div>
                  {projectData.businessContext?.industry || (
                    <span className="text-siso-text-muted italic">Not specified</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium text-siso-text-muted">Target Audience</div>
              <div>
                {projectData.businessContext?.target_audience && projectData.businessContext.target_audience.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {projectData.businessContext.target_audience.map((audience, index) => (
                      <div key={index} className="bg-siso-bg-alt px-2 py-1 rounded-md text-sm">
                        {audience}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-siso-text-muted italic">No target audience defined</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Project Goals */}
        <Card className={cn(
          "transition-all duration-300",
          highlightedField === 'goals' 
            ? "border-siso-red/70 shadow-md shadow-siso-red/20" 
            : "border-siso-border"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <TagIcon className="w-5 h-5 mr-2 text-siso-orange" />
              Project Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectData.goals ? (
              <div className="prose prose-siso dark:prose-invert max-w-none text-siso-text-muted">
                {projectData.goals}
              </div>
            ) : (
              <div className="text-siso-text-muted italic">No goals defined yet</div>
            )}
          </CardContent>
        </Card>
        
        {/* Features */}
        <Card className={cn(
          "transition-all duration-300",
          highlightedField === 'features' 
            ? "border-siso-red/70 shadow-md shadow-siso-red/20" 
            : "border-siso-border"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CodeIcon className="w-5 h-5 mr-2 text-siso-orange" />
              Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectData.features?.core && projectData.features.core.length > 0 ? (
              <div>
                <h4 className="font-medium mb-2">Core Features</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {projectData.features.core.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                
                {projectData.features.extras && projectData.features.extras.length > 0 && (
                  <>
                    <h4 className="font-medium mt-4 mb-2">Additional Features</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {projectData.features.extras.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <div className="text-siso-text-muted italic">No features defined yet</div>
            )}
          </CardContent>
        </Card>
        
        {/* Timeline */}
        <Card className={cn(
          "transition-all duration-300",
          highlightedField === 'timeline' 
            ? "border-siso-red/70 shadow-md shadow-siso-red/20" 
            : "border-siso-border"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <ClockIcon className="w-5 h-5 mr-2 text-siso-orange" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectData.timeline?.estimated_weeks ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Estimated duration:</span>
                  <span>{projectData.timeline.estimated_weeks} weeks</span>
                </div>
                
                {projectData.timeline.phases && projectData.timeline.phases.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Development Phases</h4>
                    <div className="space-y-3">
                      {projectData.timeline.phases.map((phase, index) => (
                        <div key={index} className="border border-siso-border rounded-md p-3">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{phase.name}</span>
                            <span className="text-sm text-siso-text-muted">{phase.duration}</span>
                          </div>
                          {phase.tasks && phase.tasks.length > 0 && (
                            <ul className="text-sm text-siso-text-muted list-disc pl-5 space-y-1">
                              {phase.tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-siso-text-muted italic">No timeline estimated yet</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
