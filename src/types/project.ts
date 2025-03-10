export type ProjectPhaseStatus = 'pending' | 'in-progress' | 'completed';

export interface Phase {
  name: string;
  status: ProjectPhaseStatus;
  progress: number;
}

export interface ProjectTypeInfo {
  name: string;
  description: string;
  timeEstimate: string;
  costEstimate: string;
  icon: string;
  features: string[];
}

export enum ScaleOptionType {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Enterprise = 'enterprise'
}

export const scaleOptions = {
  [ScaleOptionType.Small]: {
    title: 'Small',
    description: 'For small businesses and startups',
    features: ['Basic features', 'Essential integrations']
  },
  [ScaleOptionType.Medium]: {
    title: 'Medium',
    description: 'For growing businesses',
    features: ['Advanced features', 'Priority support']
  },
  [ScaleOptionType.Large]: {
    title: 'Large',
    description: 'For large organizations',
    features: ['Customizable features', 'Dedicated support']
  },
  [ScaleOptionType.Enterprise]: {
    title: 'Enterprise',
    description: 'For enterprise-level solutions',
    features: ['Unlimited features', '24/7 support']
  }
};
