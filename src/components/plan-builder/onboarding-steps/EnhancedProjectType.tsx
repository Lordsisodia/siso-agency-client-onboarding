
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Globe, 
  ShoppingCart, 
  Palette, 
  Code, 
  FilePlus, 
  Info
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProjectTypeProps {
  projectType: string;
  projectScale: string;
  updateProjectData: (key: string, value: any) => void;
  onComplete: () => void;
}

type ProjectTypeInfo = {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  techStack: string[];
  timeEstimate: {
    small: string;
    medium: string;
    large: string;
  };
  costEstimate: {
    small: string;
    medium: string;
    large: string;
  };
};

const projectTypes: Record<string, ProjectTypeInfo> = {
  'mobile-app': {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Mobile App',
    description: 'Native or cross-platform mobile applications for iOS and Android.',
    examples: ['Delivery app', 'Fitness tracker', 'Social media app'],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    timeEstimate: {
      small: '1-2 months',
      medium: '3-5 months',
      large: '6+ months'
    },
    costEstimate: {
      small: '$8,000 - $20,000',
      medium: '$20,000 - $60,000',
      large: '$60,000+'
    }
  },
  'website': {
    icon: <Globe className="h-6 w-6" />,
    title: 'Website',
    description: 'Informational or interactive websites for businesses and organizations.',
    examples: ['Corporate site', 'Portfolio', 'Blog'],
    techStack: ['React', 'Next.js', 'WordPress', 'HTML/CSS/JS'],
    timeEstimate: {
      small: '2-4 weeks',
      medium: '1-3 months',
      large: '3-6 months'
    },
    costEstimate: {
      small: '$5,000 - $15,000',
      medium: '$15,000 - $40,000',
      large: '$40,000+'
    }
  },
  'e-commerce': {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: 'E-commerce',
    description: 'Online stores with product catalogs, shopping carts, and payment processing.',
    examples: ['Retail store', 'Digital products', 'Subscription service'],
    techStack: ['Shopify', 'WooCommerce', 'Custom solutions'],
    timeEstimate: {
      small: '1-2 months',
      medium: '2-4 months',
      large: '4-8 months'
    },
    costEstimate: {
      small: '$10,000 - $25,000',
      medium: '$25,000 - $70,000',
      large: '$70,000+'
    }
  },
  'ui-ux-design': {
    icon: <Palette className="h-6 w-6" />,
    title: 'UI/UX Design',
    description: 'User interface and experience design for digital products.',
    examples: ['App redesign', 'Design system', 'User flow optimization'],
    techStack: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping tools'],
    timeEstimate: {
      small: '2-4 weeks',
      medium: '1-2 months',
      large: '2-4 months'
    },
    costEstimate: {
      small: '$4,000 - $12,000',
      medium: '$12,000 - $30,000',
      large: '$30,000+'
    }
  },
  'software': {
    icon: <Code className="h-6 w-6" />,
    title: 'Software',
    description: 'Custom software applications for specific business needs.',
    examples: ['CRM', 'Internal tools', 'Enterprise software'],
    techStack: ['Various (depends on requirements)'],
    timeEstimate: {
      small: '2-4 months',
      medium: '4-8 months',
      large: '8+ months'
    },
    costEstimate: {
      small: '$15,000 - $40,000',
      medium: '$40,000 - $100,000',
      large: '$100,000+'
    }
  },
  'other': {
    icon: <FilePlus className="h-6 w-6" />,
    title: 'Other',
    description: 'Other digital product types not listed above.',
    examples: ['Custom project', 'Hybrid solution'],
    techStack: ['Various (depends on requirements)'],
    timeEstimate: {
      small: 'Varies',
      medium: 'Varies',
      large: 'Varies'
    },
    costEstimate: {
      small: 'Varies',
      medium: 'Varies',
      large: 'Varies'
    }
  }
};

const scaleOptions = [
  { value: 'small', label: 'Small', description: '1-3 months, basic features' },
  { value: 'medium', label: 'Medium', description: '3-6 months, standard features' },
  { value: 'large', label: 'Large', description: '6+ months, comprehensive solution' },
];

export function EnhancedProjectType({ 
  projectType, 
  projectScale, 
  updateProjectData,
  onComplete
}: ProjectTypeProps) {
  const [selectedType, setSelectedType] = useState(projectType);
  const [selectedScale, setSelectedScale] = useState(projectScale);
  const [showDetails, setShowDetails] = useState(false);
  
  // Update completion status when values change
  useEffect(() => {
    if (selectedType) {
      onComplete();
      updateProjectData('projectType', selectedType);
      updateProjectData('projectScale', selectedScale);
    }
  }, [selectedType, selectedScale]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const getSelectedTypeInfo = () => {
    return projectTypes[selectedType] || null;
  };

  const getScaleBadgeColor = (scale: string) => {
    switch (scale) {
      case 'small':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'large':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What type of project are you planning?</h2>
        <p className="text-muted-foreground">
          Select the category that best matches your project goals.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(projectTypes).map(([key, type]) => (
          <motion.div 
            key={key}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`p-4 cursor-pointer h-full relative overflow-hidden transition-all duration-300 ${
                selectedType === key 
                  ? 'border-2 border-siso-red shadow-lg' 
                  : 'border border-border hover:border-siso-red/50'
              }`}
              onClick={() => {
                setSelectedType(key);
                setShowDetails(true);
              }}
            >
              {selectedType === key && (
                <motion.div 
                  className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-siso-red to-siso-orange"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-3 ${
                  selectedType === key 
                    ? 'bg-gradient-to-br from-siso-red/20 to-siso-orange/20' 
                    : 'bg-muted/20'
                }`}>
                  {type.icon}
                </div>
                <h3 className="font-semibold">{type.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{type.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold mb-3">Project Scale</h3>
          <div className="grid grid-cols-3 gap-4">
            {scaleOptions.map((scale) => (
              <motion.div
                key={scale.value}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`p-3 cursor-pointer transition-all duration-300 ${
                    selectedScale === scale.value 
                      ? 'border-2 border-siso-orange shadow-md' 
                      : 'border border-border hover:border-siso-orange/50'
                  }`}
                  onClick={() => setSelectedScale(scale.value)}
                >
                  <h4 className="font-medium text-center">{scale.label}</h4>
                  <p className="text-xs text-muted-foreground text-center mt-1">{scale.description}</p>
                  
                  {getSelectedTypeInfo() && (
                    <div className="mt-2 flex flex-col space-y-1">
                      <div className="text-xs text-center">
                        <span className="text-muted-foreground">Est. Time: </span>
                        <span className="font-medium">{getSelectedTypeInfo()?.timeEstimate[scale.value as keyof typeof getSelectedTypeInfo().timeEstimate]}</span>
                      </div>
                      <div className="text-xs text-center">
                        <span className="text-muted-foreground">Est. Cost: </span>
                        <span className="font-medium">{getSelectedTypeInfo()?.costEstimate[scale.value as keyof typeof getSelectedTypeInfo().costEstimate]}</span>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedType && showDetails && getSelectedTypeInfo() && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="mt-6 bg-muted/20 p-4 rounded-lg border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold flex items-center">
              {getSelectedTypeInfo()?.icon}
              <span className="ml-2">{getSelectedTypeInfo()?.title} Details</span>
            </h3>
            <Badge className={getScaleBadgeColor(selectedScale)}>
              {selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)} Project
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Example Projects</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                {getSelectedTypeInfo()?.examples.map((example, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    {example}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">Common Technologies</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {getSelectedTypeInfo()?.techStack.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Badge variant="outline" className="bg-background/50">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center gap-1 text-xs underline underline-offset-4">
                  <Info className="h-3 w-3" /> How are estimates calculated?
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Estimates are based on industry averages for similar projects. Actual costs and timelines may vary based on specific requirements, team composition, and other factors.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      )}
    </div>
  );
}
