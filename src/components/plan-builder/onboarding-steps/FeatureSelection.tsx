
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { featureOptions } from '../types';

interface FeatureSelectionProps {
  features: Record<string, { selected: boolean, priority: string }>;
  updateFeatures: (features: Record<string, { selected: boolean, priority: string }>) => void;
}

export function FeatureSelection({ features, updateFeatures }: FeatureSelectionProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [initializedFeatures, setInitializedFeatures] = useState(false);
  
  // Group features by category
  const categories = Array.from(new Set(featureOptions.map(f => f.category)));
  
  // Initialize features if they haven't been selected yet
  useEffect(() => {
    if (!initializedFeatures && Object.keys(features).length === 0) {
      const initialFeatures = featureOptions.reduce((acc, feature) => {
        acc[feature.id] = { selected: false, priority: 'nice-to-have' };
        return acc;
      }, {} as Record<string, { selected: boolean, priority: string }>);
      
      updateFeatures(initialFeatures);
      setInitializedFeatures(true);
    }
  }, [features, updateFeatures, initializedFeatures]);

  const toggleFeature = (featureId: string) => {
    const newFeatures = { ...features };
    newFeatures[featureId] = {
      selected: !features[featureId]?.selected,
      priority: features[featureId]?.priority || 'nice-to-have'
    };
    updateFeatures(newFeatures);
  };

  const togglePriority = (featureId: string) => {
    const newFeatures = { ...features };
    const currentPriority = features[featureId]?.priority || 'nice-to-have';
    newFeatures[featureId] = {
      selected: features[featureId]?.selected || false,
      priority: currentPriority === 'must-have' ? 'nice-to-have' : 'must-have'
    };
    updateFeatures(newFeatures);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <h3 className="text-xl font-semibold mb-1">What features do you need?</h3>
        <p className="text-muted-foreground mb-4">Toggle features on/off and set their priorities</p>
      </motion.div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 50 }}
        >
          <TabsList className="w-full mb-4 overflow-x-auto flex flex-nowrap justify-start sm:justify-center p-1 bg-muted/60 backdrop-blur-sm border border-border/40 rounded-full">
            <TabsTrigger 
              value="all" 
              className="min-w-[90px] rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-siso-red data-[state=active]:to-siso-orange data-[state=active]:text-white transition-all duration-300"
            >
              All
            </TabsTrigger>
            {categories.map((category, index) => (
              <TabsTrigger 
                key={category} 
                value={category.toLowerCase().replace(/\s+/g, '-')}
                className="min-w-[90px] whitespace-nowrap rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-siso-red data-[state=active]:to-siso-orange data-[state=active]:text-white transition-all duration-300"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>
        
        <TabsContent value="all" className="mt-0 space-y-4">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2 pb-2 features-container"
          >
            {featureOptions.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isSelected={features[feature.id]?.selected || false}
                isPriority={features[feature.id]?.priority === 'must-have'}
                onToggle={() => toggleFeature(feature.id)}
                onPriorityToggle={() => togglePriority(feature.id)}
              />
            ))}
          </motion.div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent 
            key={category} 
            value={category.toLowerCase().replace(/\s+/g, '-')}
            className="mt-0 space-y-4"
          >
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2 pb-2 features-container"
            >
              {featureOptions
                .filter(feature => feature.category === category)
                .map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    isSelected={features[feature.id]?.selected || false}
                    isPriority={features[feature.id]?.priority === 'must-have'}
                    onToggle={() => toggleFeature(feature.id)}
                    onPriorityToggle={() => togglePriority(feature.id)}
                  />
                ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex items-center gap-3"
      >
        <div className="text-sm font-medium flex items-center gap-2">
          <span>Selected:</span> 
          <Badge animated variant="gradient" className="px-3 py-0.5">
            {Object.values(features).filter(f => f.selected).length} of {featureOptions.length}
          </Badge>
        </div>
        
        <motion.div 
          className="h-1 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-siso-red to-siso-orange rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(Object.values(features).filter(f => f.selected).length / featureOptions.length) * 100}%` }}
            transition={{ delay: 1.1, duration: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

interface FeatureCardProps { 
  feature: typeof featureOptions[0], 
  isSelected: boolean, 
  isPriority: boolean,
  onToggle: () => void, 
  onPriorityToggle: () => void 
}

function FeatureCard({ feature, isSelected, isPriority, onToggle, onPriorityToggle }: FeatureCardProps) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ y: 0, scale: 0.98, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card 
        className={`transition-all duration-300 h-full ${
          isSelected 
            ? 'border-primary shadow-md shadow-primary/10' 
            : 'opacity-70 hover:opacity-90 hover:border-muted-foreground/30'
        }`}
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base">{feature.name}</CardTitle>
            <Switch checked={isSelected} onCheckedChange={onToggle} />
          </div>
          <CardDescription className="line-clamp-2 text-xs mt-1">{feature.description}</CardDescription>
        </CardHeader>
        
        <CardFooter 
          className={`p-4 pt-2 border-t flex justify-between items-center transition-opacity duration-300 ${
            isSelected ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-xs text-muted-foreground">Priority:</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div onClick={onPriorityToggle} className="cursor-pointer">
                  <Badge 
                    animated
                    variant={isPriority ? "gradient" : "outline"}
                    className={`${isPriority ? '' : 'hover:bg-primary/10'} px-3 py-1`}
                  >
                    {isPriority ? 'Must-have' : 'Nice-to-have'}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Click to toggle priority</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
