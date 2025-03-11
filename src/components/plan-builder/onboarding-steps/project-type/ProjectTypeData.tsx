
import { 
  LucideIcon, 
  Store, 
  BarChart3, 
  Bookmark,
  GalleryHorizontal,
  ShoppingBag, 
  Globe,
  Hammer, 
  Layout, 
  Share2
} from 'lucide-react';

export interface ProjectTypeInfo {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  timeline: string;
  budget: string;
  timeEstimate?: string;
  costEstimate?: string;
}

export const projectTypes: ProjectTypeInfo[] = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Sell products or services online',
    icon: Store,
    features: ['Product catalog', 'Shopping cart', 'Payment processing'],
    timeline: '2-3 months',
    budget: '$5,000 - $15,000',
    timeEstimate: '2-3 months',
    costEstimate: '$5,000 - $15,000'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work and skills',
    icon: GalleryHorizontal,
    features: ['Project gallery', 'About section', 'Contact form'],
    timeline: '2-4 weeks',
    budget: '$1,000 - $3,000',
    timeEstimate: '2-4 weeks',
    costEstimate: '$1,000 - $3,000'
  },
  {
    id: 'business',
    name: 'Business Website',
    description: 'Professional online presence',
    icon: Globe,
    features: ['Company info', 'Services', 'Team profiles'],
    timeline: '1-2 months',
    budget: '$3,000 - $8,000',
    timeEstimate: '1-2 months',
    costEstimate: '$3,000 - $8,000'
  },
  {
    id: 'saas',
    name: 'SaaS Application',
    description: 'Subscription-based software',
    icon: BarChart3,
    features: ['User accounts', 'Subscriptions', 'Core functionality'],
    timeline: '3-6 months',
    budget: '$15,000 - $50,000+',
    timeEstimate: '3-6 months',
    costEstimate: '$15,000 - $50,000+'
  }
];

export interface ScaleOptionType {
  id: string;
  name: string;
  description: string;
  features: string[];
  timeline: string;
  budget: string;
}

export const scaleOptions: ScaleOptionType[] = [
  {
    id: 'mvp',
    name: 'MVP',
    description: 'Minimal viable product with core features only',
    features: ['Core functionality', 'Basic design', 'Essential features'],
    timeline: 'Shortest',
    budget: 'Lowest'
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Complete solution with standard features',
    features: ['Full functionality', 'Professional design', 'Standard features'],
    timeline: 'Medium',
    budget: 'Average'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Comprehensive solution with advanced features',
    features: ['Full functionality', 'Premium design', 'Advanced features', 'Integrations'],
    timeline: 'Longest',
    budget: 'Highest'
  }
];
