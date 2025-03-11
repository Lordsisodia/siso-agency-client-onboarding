
import { ReactNode } from 'react';

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
  url?: string;
}

export interface HomeMessage {
  role: "user" | "assistant";
  content: string;
  assistantType?: string;
  isLoading?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType; // Changed from ReactNode to ElementType for proper component rendering
  link?: string;
}
