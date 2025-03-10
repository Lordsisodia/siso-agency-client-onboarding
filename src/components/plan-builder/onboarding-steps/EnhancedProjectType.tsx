
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LayoutGrid, ListIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projectTypes = [
  {
    id: 'website',
    name: 'Website',
    description: 'Build a responsive website for your business or personal use.',
    icon: 'internet',
  },
  {
    id: 'webapp',
    name: 'Web Application',
    description: 'Create an interactive web application with user accounts and advanced features.',
    icon: 'application',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'Develop a native or cross-platform mobile application.',
    icon: 'mobile',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Build an online store with product listings, cart, and checkout.',
    icon: 'shop',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Create a data visualization dashboard with charts and analytics.',
    icon: 'chart',
  },
  {
    id: 'crm',
    name: 'CRM System',
    description: 'Develop a customer relationship management system.',
    icon: 'users',
  }
];

const scales = [
  { value: 'small', label: 'Small', description: '1-3 pages, basic functionality' },
  { value: 'medium', label: 'Medium', description: '4-10 pages, standard features' },
  { value: 'large', label: 'Large', description: '10+ pages, complex functionality' },
  { value: 'enterprise', label: 'Enterprise', description: 'Multi-module system with extensive features' },
];

export interface EnhancedProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (key: string, value: any) => void;
}

export const EnhancedProjectType: React.FC<EnhancedProjectTypeProps> = ({
  projectType,
  projectScale,
  updateProjectData
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<string>(projectType || '');
  const [selectedScale, setSelectedScale] = useState<string>(projectScale || 'medium');

  // Update parent component when selections change
  useEffect(() => {
    updateProjectData('projectType', selectedType);
  }, [selectedType, updateProjectData]);

  useEffect(() => {
    updateProjectData('projectScale', selectedScale);
  }, [selectedScale, updateProjectData]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Project Type</h2>
        <p className="text-muted-foreground">
          Select the type of project you want to build and its scale
        </p>
      </div>

      {/* View Mode Switcher */}
      <div className="flex items-center justify-end">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')} className="w-auto">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list" aria-label="List view">
              <ListIcon className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Project Type Selection */}
      <div>
        <h3 className="text-lg font-medium mb-3">Select Project Type</h3>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projectTypes.map((type) => (
              <Card
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`cursor-pointer transition-all ${
                  selectedType === type.id
                    ? 'border-primary shadow-md ring-1 ring-primary'
                    : 'hover:border-muted-foreground/20 hover:shadow-sm'
                }`}
              >
                <CardContent className="p-4">
                  <div className="mb-2">
                    {/* Icon placeholder - would be better to use actual icons */}
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {type.icon.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <h4 className="font-medium">{type.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <RadioGroup value={selectedType} onValueChange={setSelectedType}>
              {projectTypes.map((type) => (
                <div
                  key={type.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                    selectedType === type.id ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}
                >
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                    <span className="font-medium block">{type.name}</span>
                    <span className="text-sm text-muted-foreground">{type.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>

      {/* Project Scale Selection */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Project Scale</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {scales.map((scale) => (
            <motion.div
              key={scale.value}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setSelectedScale(scale.value)}
              className={`p-4 rounded-lg border cursor-pointer ${
                selectedScale === scale.value
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-muted'
              }`}
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem
                  value={scale.value}
                  id={`scale-${scale.value}`}
                  checked={selectedScale === scale.value}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label
                    htmlFor={`scale-${scale.value}`}
                    className="font-medium cursor-pointer"
                  >
                    {scale.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{scale.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Options Preview */}
      {selectedType && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-2">Your selection:</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-background">
              {projectTypes.find(t => t.id === selectedType)?.name || selectedType}
            </Badge>
            <Badge variant="outline" className="bg-background">
              {scales.find(s => s.value === selectedScale)?.label || selectedScale} scale
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};
