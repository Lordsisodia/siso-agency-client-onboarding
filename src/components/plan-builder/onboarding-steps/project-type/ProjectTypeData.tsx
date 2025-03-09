
import { Building, ShoppingCart, Smartphone, Globe, Brush, Terminal, LayoutGrid } from 'lucide-react';
import { ReactNode } from 'react';

export interface ProjectTypeInfo {
  name: string;
  icon: ReactNode;
  description: string;
  timeEstimate: Record<string, string>;
  costEstimate: Record<string, string>;
  examples: string[];
}

export interface ScaleOptionType {
  value: string;
  name: string;
  description: string;
}

export const projectTypes: Record<string, ProjectTypeInfo> = {
  mobile: {
    name: 'Mobile App',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Create a native or cross-platform mobile application',
    timeEstimate: {
      small: '1-2 months',
      medium: '3-6 months',
      large: '6+ months'
    },
    costEstimate: {
      small: '$5,000 - $15,000',
      medium: '$15,000 - $50,000',
      large: '$50,000+'
    },
    examples: ['Food delivery app', 'Fitness tracker', 'Mobile banking']
  },
  web: {
    name: 'Website',
    icon: <Globe className="w-6 h-6" />,
    description: 'Build a responsive website for your business or personal brand',
    timeEstimate: {
      small: '2-4 weeks',
      medium: '1-3 months',
      large: '3+ months'
    },
    costEstimate: {
      small: '$3,000 - $10,000',
      medium: '$10,000 - $30,000',
      large: '$30,000+'
    },
    examples: ['Corporate website', 'Portfolio site', 'Blog platform']
  },
  ecommerce: {
    name: 'E-commerce',
    icon: <ShoppingCart className="w-6 h-6" />,
    description: 'Create an online store with product listings and checkout',
    timeEstimate: {
      small: '1-2 months',
      medium: '2-4 months',
      large: '4+ months'
    },
    costEstimate: {
      small: '$5,000 - $15,000',
      medium: '$15,000 - $50,000',
      large: '$50,000+'
    },
    examples: ['Online boutique', 'Digital product store', 'Subscription service']
  },
  design: {
    name: 'UI/UX Design',
    icon: <Brush className="w-6 h-6" />,
    description: 'Professional design services for your digital products',
    timeEstimate: {
      small: '2-4 weeks',
      medium: '1-2 months',
      large: '2+ months'
    },
    costEstimate: {
      small: '$2,000 - $8,000',
      medium: '$8,000 - $20,000',
      large: '$20,000+'
    },
    examples: ['Brand redesign', 'App UI design', 'Design system']
  },
  software: {
    name: 'Software',
    icon: <Terminal className="w-6 h-6" />,
    description: 'Custom software solution for your specific needs',
    timeEstimate: {
      small: '1-3 months',
      medium: '3-6 months',
      large: '6+ months'
    },
    costEstimate: {
      small: '$8,000 - $20,000',
      medium: '$20,000 - $60,000',
      large: '$60,000+'
    },
    examples: ['CRM system', 'Inventory management', 'Data analysis tool']
  },
  other: {
    name: 'Other',
    icon: <LayoutGrid className="w-6 h-6" />,
    description: 'Have a unique project in mind? Let us help you plan it',
    timeEstimate: {
      small: 'Varies',
      medium: 'Varies',
      large: 'Varies'
    },
    costEstimate: {
      small: 'Varies',
      medium: 'Varies',
      large: 'Varies'
    },
    examples: ['Custom solution', 'Hybrid project', 'Innovative concept']
  }
};

export const scaleOptions: ScaleOptionType[] = [
  {
    value: 'small',
    name: 'Small',
    description: 'Basic features, less complexity, faster delivery'
  },
  {
    value: 'medium',
    name: 'Medium',
    description: 'More features, moderate complexity, standard timeline'
  },
  {
    value: 'large',
    name: 'Large',
    description: 'Comprehensive features, higher complexity, longer timeline'
  }
];
