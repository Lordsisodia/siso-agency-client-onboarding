
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters';
import { 
  Check, 
  Info, 
  Lock, 
  Server, 
  Smartphone, 
  Globe, 
  MessageSquare, 
  Zap, 
  CreditCard, 
  Bell, 
  BarChart3, 
  Search
} from 'lucide-react';

interface FeaturesFormProps {
  onNext: (data: FeaturesData) => void;
  onBack: () => void;
  initialData?: FeaturesData;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  baseCost: number;
  selected: boolean;
  icon: string;
}

export interface FeaturesData {
  selectedFeatures: Feature[];
  totalCost: number;
}

// Mock feature data - in a real app, this would come from the database
const mockFeatures: Feature[] = [
  {
    id: '1',
    name: 'User Authentication',
    description: 'Secure login and registration system with email verification',
    category: 'Core',
    baseCost: 1200,
    selected: true,
    icon: 'Lock'
  },
  {
    id: '2',
    name: 'Database & API Setup',
    description: 'Backend infrastructure with RESTful API endpoints',
    category: 'Core',
    baseCost: 2500,
    selected: true,
    icon: 'Server'
  },
  {
    id: '3',
    name: 'Mobile Responsive Design',
    description: 'Optimized interface for all screen sizes and devices',
    category: 'Frontend',
    baseCost: 1800,
    selected: true,
    icon: 'Smartphone'
  },
  {
    id: '4',
    name: 'Admin Dashboard',
    description: 'Control panel for managing users, content, and settings',
    category: 'Admin',
    baseCost: 2200,
    selected: false,
    icon: 'BarChart3'
  },
  {
    id: '5',
    name: 'Payment Processing',
    description: 'Integration with Stripe, PayPal, or other payment gateways',
    category: 'E-commerce',
    baseCost: 1500,
    selected: false,
    icon: 'CreditCard'
  },
  {
    id: '6',
    name: 'Social Media Integration',
    description: 'Login with social accounts and sharing capabilities',
    category: 'Integration',
    baseCost: 900,
    selected: false,
    icon: 'Globe'
  },
  {
    id: '7',
    name: 'Real-time Chat',
    description: 'Instant messaging between users or with support',
    category: 'Communication',
    baseCost: 2800,
    selected: false,
    icon: 'MessageSquare'
  },
  {
    id: '8',
    name: 'Push Notifications',
    description: 'Real-time alerts and updates to engage users',
    category: 'Engagement',
    baseCost: 1200,
    selected: false,
    icon: 'Bell'
  },
  {
    id: '9',
    name: 'Search Functionality',
    description: 'Advanced search with filters and autocompletion',
    category: 'Utility',
    baseCost: 1600,
    selected: false,
    icon: 'Search'
  },
  {
    id: '10',
    name: 'Performance Optimization',
    description: 'Code and asset optimization for faster loading',
    category: 'Performance',
    baseCost: 1800,
    selected: false,
    icon: 'Zap'
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Lock': return <Lock size={20} />;
    case 'Server': return <Server size={20} />;
    case 'Smartphone': return <Smartphone size={20} />;
    case 'Globe': return <Globe size={20} />;
    case 'MessageSquare': return <MessageSquare size={20} />;
    case 'Zap': return <Zap size={20} />;
    case 'CreditCard': return <CreditCard size={20} />;
    case 'Bell': return <Bell size={20} />;
    case 'BarChart3': return <BarChart3 size={20} />;
    case 'Search': return <Search size={20} />;
    default: return <Info size={20} />;
  }
};

const categories = Array.from(new Set(mockFeatures.map(feature => feature.category)));

export function FeaturesForm({ onNext, onBack, initialData }: FeaturesFormProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [totalCost, setTotalCost] = useState(0);
  
  useEffect(() => {
    // Initialize with either provided data or mock data
    if (initialData && initialData.selectedFeatures.length > 0) {
      // Create a map of previously selected features
      const selectedMap = new Map(
        initialData.selectedFeatures.map(feature => [feature.id, true])
      );
      
      // Apply selection status to the mock features
      const initializedFeatures = mockFeatures.map(feature => ({
        ...feature,
        selected: selectedMap.has(feature.id) || feature.selected
      }));
      
      setFeatures(initializedFeatures);
    } else {
      setFeatures(mockFeatures);
    }
  }, [initialData]);
  
  useEffect(() => {
    // Calculate total cost whenever features change
    const newTotal = features
      .filter(feature => feature.selected)
      .reduce((sum, feature) => sum + feature.baseCost, 0);
    
    setTotalCost(newTotal);
  }, [features]);
  
  const toggleFeature = (id: string) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === id 
          ? { ...feature, selected: !feature.selected } 
          : feature
      )
    );
  };
  
  const handleSubmit = () => {
    const selectedFeatures = features.filter(feature => feature.selected);
    onNext({
      selectedFeatures,
      totalCost
    });
  };
  
  const filteredFeatures = selectedCategory === 'All'
    ? features
    : features.filter(feature => feature.category === selectedCategory);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-siso-text-bold mb-2">Select Features & Functionality</h2>
        <p className="text-siso-text/70">Choose the features that best fit your project needs</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {/* Category filter */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge
              onClick={() => setSelectedCategory('All')}
              className={`cursor-pointer py-1 px-3 ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-siso-red to-siso-orange'
                  : 'bg-siso-bg hover:bg-siso-border'
              }`}
            >
              All
            </Badge>
            {categories.map(category => (
              <Badge
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer py-1 px-3 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-siso-red to-siso-orange'
                    : 'bg-siso-bg hover:bg-siso-border'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {/* Features grid */}
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFeatures.map(feature => (
                <motion.div
                  key={feature.id}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ 
                    scale: feature.selected ? 1 : 0.95,
                    opacity: feature.selected ? 1 : 0.8
                  }}
                  transition={{ duration: 0.2 }}
                  className={`relative p-4 rounded-lg border ${
                    feature.selected
                      ? 'border-siso-orange/40 bg-gradient-to-br from-siso-red/10 to-siso-orange/5'
                      : 'border-siso-border/40 bg-siso-bg/30'
                  } hover:border-siso-orange/30 transition-all cursor-pointer`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  {feature.selected && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-siso-red to-siso-orange rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md ${
                      feature.selected 
                        ? 'bg-gradient-to-br from-siso-red/20 to-siso-orange/20 text-siso-orange' 
                        : 'bg-siso-bg/50 text-siso-text/70'
                    }`}>
                      {getIconComponent(feature.icon)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold ${feature.selected ? 'text-siso-text-bold' : 'text-siso-text'}`}>
                        {feature.name}
                      </h3>
                      <p className="text-xs text-siso-text/70 mt-1">{feature.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-[10px] py-0 h-4">
                          {feature.category}
                        </Badge>
                        <span className={`text-sm font-semibold ${feature.selected ? 'text-siso-orange' : 'text-siso-text/70'}`}>
                          {formatCurrency(feature.baseCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Cost summary sidebar */}
        <div className="lg:w-80 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm rounded-lg border border-siso-border/30 p-4">
          <h3 className="text-lg font-semibold text-siso-text-bold mb-4">Cost Summary</h3>
          
          <div className="space-y-3 mb-6">
            {features.filter(f => f.selected).map(feature => (
              <div key={feature.id} className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <Checkbox 
                    checked={feature.selected} 
                    onCheckedChange={() => toggleFeature(feature.id)}
                    className="mr-2 border-siso-border"
                  />
                  {feature.name}
                </span>
                <span className="font-medium">{formatCurrency(feature.baseCost)}</span>
              </div>
            ))}
            
            {features.filter(f => f.selected).length === 0 && (
              <p className="text-siso-text/50 text-sm italic">No features selected yet</p>
            )}
          </div>
          
          <div className="pt-4 border-t border-siso-border/30">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-siso-text/70">Selected Features:</span>
              <span className="font-medium">{features.filter(f => f.selected).length}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-semibold">Estimated Total:</span>
              <span className="text-xl font-bold text-siso-orange">{formatCurrency(totalCost)}</span>
            </div>
            
            <p className="text-xs text-siso-text/50 mb-4">
              * This is an initial estimate. The final cost may vary based on specific requirements and customizations.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-8 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="border-siso-border text-siso-text"
        >
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-siso-red to-siso-orange hover:from-siso-red/90 hover:to-siso-orange/90"
        >
          Continue to Specifications
        </Button>
      </div>
    </motion.div>
  );
}
