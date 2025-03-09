
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Trash2, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FeatureSelectionProps {
  features: Record<string, { selected: boolean; priority: string }>;
  projectType: string;
  updateFeatures: (features: Record<string, { selected: boolean; priority: string }>) => void;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  recommendedFor: string[];
}

// Common features for different project types
const featuresList: Feature[] = [
  {
    id: 'user-auth',
    name: 'User Authentication',
    description: 'Allow users to register, login, and manage their accounts.',
    category: 'Core',
    recommendedFor: ['mobile-app', 'website', 'e-commerce', 'software']
  },
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    description: 'Ensure the interface adapts to different screen sizes and devices.',
    category: 'UI/UX',
    recommendedFor: ['website', 'e-commerce', 'ui-ux-design']
  },
  {
    id: 'payment-processing',
    name: 'Payment Processing',
    description: 'Integrate payment gateways for online transactions.',
    category: 'E-commerce',
    recommendedFor: ['e-commerce', 'mobile-app']
  },
  {
    id: 'search-filter',
    name: 'Search & Filtering',
    description: 'Allow users to search and filter content or products.',
    category: 'Core',
    recommendedFor: ['website', 'e-commerce', 'software', 'mobile-app']
  },
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard',
    description: 'Backend interface for content and user management.',
    category: 'Administration',
    recommendedFor: ['website', 'e-commerce', 'software']
  },
  {
    id: 'analytics',
    name: 'Analytics Integration',
    description: 'Track user behavior and monitor performance metrics.',
    category: 'Analytics',
    recommendedFor: ['website', 'e-commerce', 'mobile-app', 'software']
  },
  {
    id: 'notifications',
    name: 'Push Notifications',
    description: 'Send alerts and updates to users.',
    category: 'Engagement',
    recommendedFor: ['mobile-app', 'software']
  },
  {
    id: 'social-sharing',
    name: 'Social Media Integration',
    description: 'Allow content sharing and social media login.',
    category: 'Engagement',
    recommendedFor: ['website', 'e-commerce', 'mobile-app']
  },
  {
    id: 'offline-mode',
    name: 'Offline Functionality',
    description: 'Allow app to function with limited or no internet connection.',
    category: 'Technical',
    recommendedFor: ['mobile-app', 'software']
  },
  {
    id: 'multi-language',
    name: 'Multi-language Support',
    description: 'Provide content in multiple languages.',
    category: 'Accessibility',
    recommendedFor: ['website', 'e-commerce', 'mobile-app', 'software']
  },
  {
    id: 'product-catalog',
    name: 'Product Catalog',
    description: 'Organized display of products with details and images.',
    category: 'E-commerce',
    recommendedFor: ['e-commerce']
  },
  {
    id: 'checkout-flow',
    name: 'Streamlined Checkout',
    description: 'Simple and efficient purchase process.',
    category: 'E-commerce',
    recommendedFor: ['e-commerce']
  },
  {
    id: 'interactive-prototype',
    name: 'Interactive Prototype',
    description: 'Clickable prototype showing user flows and interactions.',
    category: 'UI/UX',
    recommendedFor: ['ui-ux-design']
  },
  {
    id: 'design-system',
    name: 'Design System Creation',
    description: 'Comprehensive set of design standards and components.',
    category: 'UI/UX',
    recommendedFor: ['ui-ux-design']
  },
  {
    id: 'user-testing',
    name: 'User Testing',
    description: 'Evaluating designs with real users for feedback.',
    category: 'UI/UX',
    recommendedFor: ['ui-ux-design', 'mobile-app', 'website', 'e-commerce']
  }
];

export function EnhancedFeatureSelection({ 
  features, 
  projectType,
  updateFeatures 
}: FeatureSelectionProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, { selected: boolean; priority: string }>>(
    features || {}
  );
  const [customFeature, setCustomFeature] = useState('');
  const [customFeatures, setCustomFeatures] = useState<{ id: string; name: string; priority: string }[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  
  // Get recommended features for the selected project type
  const getRecommendedFeatures = () => {
    return featuresList.filter(feature => feature.recommendedFor.includes(projectType));
  };
  
  const allCategories = Array.from(new Set(featuresList.map(feature => feature.category)));
  
  // Filter features by category if one is selected
  const getFilteredFeatures = () => {
    let filteredFeatures = projectType 
      ? [...getRecommendedFeatures(), ...featuresList.filter(f => !f.recommendedFor.includes(projectType))]
      : featuresList;
      
    if (filteredCategory) {
      filteredFeatures = filteredFeatures.filter(f => f.category === filteredCategory);
    }
    
    return filteredFeatures;
  };
  
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => {
      const updatedFeatures = { ...prev };
      
      if (updatedFeatures[featureId]) {
        updatedFeatures[featureId] = {
          ...updatedFeatures[featureId],
          selected: !updatedFeatures[featureId].selected
        };
      } else {
        updatedFeatures[featureId] = {
          selected: true,
          priority: 'medium'
        };
      }
      
      return updatedFeatures;
    });
  };
  
  const updatePriority = (featureId: string, priority: string) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        priority
      }
    }));
  };
  
  const addCustomFeature = () => {
    if (customFeature.trim()) {
      const newFeatureId = `custom-${Date.now()}`;
      
      // Add to local state
      setCustomFeatures(prev => [
        ...prev, 
        { 
          id: newFeatureId, 
          name: customFeature.trim(),
          priority: 'medium' 
        }
      ]);
      
      // Add to selected features
      setSelectedFeatures(prev => ({
        ...prev,
        [newFeatureId]: {
          selected: true,
          priority: 'medium'
        }
      }));
      
      setCustomFeature('');
    }
  };
  
  const removeCustomFeature = (featureId: string) => {
    setCustomFeatures(prev => prev.filter(f => f.id !== featureId));
    
    setSelectedFeatures(prev => {
      const updated = { ...prev };
      delete updated[featureId];
      return updated;
    });
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  // Count selected features
  const selectedCount = Object.values(selectedFeatures).filter(f => f.selected).length;
  
  // Update parent component when selections change
  useEffect(() => {
    updateFeatures(selectedFeatures);
  }, [selectedFeatures]);
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold">Select Project Features</h2>
          <Badge className="ml-2">{selectedCount} selected</Badge>
        </div>
        <p className="text-muted-foreground mt-1">
          Choose the features you want to include in your project.
          {projectType && (
            <span className="ml-1">We've highlighted those recommended for {projectType.split('-').join(' ')} projects.</span>
          )}
        </p>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={filteredCategory === null ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/80"
          onClick={() => setFilteredCategory(null)}
        >
          All
        </Badge>
        {allCategories.map(category => (
          <Badge 
            key={category}
            variant={filteredCategory === category ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80"
            onClick={() => setFilteredCategory(category === filteredCategory ? null : category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      {/* Features list */}
      <div className="max-h-[300px] overflow-y-auto pr-2 features-container">
        <motion.div
          className="grid grid-cols-1 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {getFilteredFeatures().map((feature) => {
            const isRecommended = projectType && feature.recommendedFor.includes(projectType);
            const isSelected = selectedFeatures[feature.id]?.selected;
            const priority = selectedFeatures[feature.id]?.priority || 'medium';
            
            return (
              <motion.div 
                key={feature.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ type: "spring" }}
              >
                <Card 
                  className={`transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary/50 bg-primary/5'
                      : 'hover:border-primary/30'
                  } ${
                    isRecommended && !isSelected
                      ? 'border-dashed border-yellow-400/50 bg-yellow-50/10'
                      : ''
                  }`}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          <Checkbox 
                            checked={isSelected} 
                            onCheckedChange={() => toggleFeature(feature.id)}
                            className={isSelected ? 'text-primary' : ''}
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className={`font-medium ${isSelected ? 'text-primary' : ''}`}>
                              {feature.name}
                            </h3>
                            {isRecommended && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">Recommended</Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Recommended for {projectType.split('-').join(' ')} projects</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge className={getPriorityColor(priority)}>
                                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>Set priority level</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                    
                    {/* Priority selector (only shows when selected) */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 ml-8"
                        >
                          <RadioGroup 
                            value={priority} 
                            onValueChange={(value) => updatePriority(feature.id, value)}
                            className="flex space-x-3"
                          >
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="low" id={`${feature.id}-low`} />
                              <Label htmlFor={`${feature.id}-low`} className="text-xs cursor-pointer">Low</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="medium" id={`${feature.id}-medium`} />
                              <Label htmlFor={`${feature.id}-medium`} className="text-xs cursor-pointer">Medium</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="high" id={`${feature.id}-high`} />
                              <Label htmlFor={`${feature.id}-high`} className="text-xs cursor-pointer">High</Label>
                            </div>
                          </RadioGroup>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
          
          {/* Custom features section */}
          {customFeatures.map((feature) => {
            const isSelected = selectedFeatures[feature.id]?.selected;
            const priority = selectedFeatures[feature.id]?.priority || 'medium';
            
            return (
              <motion.div 
                key={feature.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Card 
                  className={`border-dashed ${
                    isSelected 
                      ? 'border-primary/50 bg-primary/5'
                      : 'hover:border-primary/30'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          <Checkbox 
                            checked={isSelected} 
                            onCheckedChange={() => toggleFeature(feature.id)} 
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{feature.name}</h3>
                            <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">Custom</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {isSelected && (
                          <Badge className={getPriorityColor(priority)}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </Badge>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => removeCustomFeature(feature.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Priority selector */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 ml-8"
                        >
                          <RadioGroup 
                            value={priority} 
                            onValueChange={(value) => updatePriority(feature.id, value)}
                            className="flex space-x-3"
                          >
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="low" id={`${feature.id}-low`} />
                              <Label htmlFor={`${feature.id}-low`} className="text-xs">Low</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="medium" id={`${feature.id}-medium`} />
                              <Label htmlFor={`${feature.id}-medium`} className="text-xs">Medium</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="high" id={`${feature.id}-high`} />
                              <Label htmlFor={`${feature.id}-high`} className="text-xs">High</Label>
                            </div>
                          </RadioGroup>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Add custom feature */}
      <div className="flex items-center mt-4">
        <Input
          placeholder="Add custom feature..."
          value={customFeature}
          onChange={(e) => setCustomFeature(e.target.value)}
          className="mr-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addCustomFeature();
            }
          }}
        />
        <Button 
          onClick={addCustomFeature} 
          disabled={!customFeature.trim()} 
          size="sm"
          className="shrink-0"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      
      {/* Quick tips */}
      <div className="text-sm bg-muted/20 p-3 rounded-lg border border-muted">
        <h4 className="font-medium flex items-center">
          <Info className="h-4 w-4 mr-1" /> Quick Tips
        </h4>
        <ul className="list-disc list-inside text-xs text-muted-foreground mt-1 space-y-1">
          <li>Set higher priorities for must-have features</li>
          <li>Balance feature set with your budget and timeline</li>
          <li>Consider starting with core features for MVP (Minimum Viable Product)</li>
        </ul>
      </div>
    </div>
  );
}
