
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

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-1">What features do you need?</h3>
        <p className="text-muted-foreground mb-4">Toggle features on/off and set their priorities</p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 overflow-x-auto flex flex-nowrap justify-start sm:justify-center">
          <TabsTrigger value="all" className="min-w-[90px]">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase().replace(/\s+/g, '-')}
              className="min-w-[90px] whitespace-nowrap"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-0 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[340px] overflow-y-auto pr-2 pb-2">
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
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent 
            key={category} 
            value={category.toLowerCase().replace(/\s+/g, '-')}
            className="mt-0 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[340px] overflow-y-auto pr-2 pb-2">
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
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-4 pl-2 text-sm font-medium">
        Selected: {Object.values(features).filter(f => f.selected).length} of {featureOptions.length} features
      </div>
    </div>
  );
}

function FeatureCard({ 
  feature, 
  isSelected, 
  isPriority, 
  onToggle, 
  onPriorityToggle 
}: { 
  feature: typeof featureOptions[0], 
  isSelected: boolean, 
  isPriority: boolean,
  onToggle: () => void, 
  onPriorityToggle: () => void 
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <Card className={`transition-all ${isSelected ? 'border-primary' : 'opacity-70'}`}>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">{feature.name}</CardTitle>
            <Switch checked={isSelected} onCheckedChange={onToggle} />
          </div>
          <CardDescription className="line-clamp-2 text-xs">{feature.description}</CardDescription>
        </CardHeader>
        {isSelected && (
          <CardFooter className="p-4 pt-2 border-t flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Priority:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div onClick={onPriorityToggle} className="cursor-pointer">
                    <Badge 
                      variant={isPriority ? "default" : "outline"}
                      className={`${isPriority ? 'bg-primary' : 'hover:bg-primary/10'}`}
                    >
                      {isPriority ? 'Must-have' : 'Nice-to-have'}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to toggle priority</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
