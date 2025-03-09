
import React from 'react';
import { 
  Smartphone, 
  Globe, 
  ShoppingCart, 
  Palette, 
  Code, 
  FilePlus,
} from 'lucide-react';
import { ProjectTypeInfo } from './ProjectTypeInfo';

export const projectTypes: Record<string, ProjectTypeInfo> = {
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

export const scaleOptions = [
  { value: 'small', label: 'Small', description: '1-3 months, basic features' },
  { value: 'medium', label: 'Medium', description: '3-6 months, standard features' },
  { value: 'large', label: 'Large', description: '6+ months, comprehensive solution' },
];
