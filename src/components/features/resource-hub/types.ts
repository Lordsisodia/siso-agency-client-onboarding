
import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

export interface ResourceTabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ResourceTab {
  value: string;
  icon: ReactElement;
  label: string;
  content: ResourceTabContent;
}

export interface ResourceHubProps {
  badge?: string;
  heading?: string;
  description?: string;
  tabs: ResourceTab[];
}

// Added missing types that were referenced in other files
export interface Tab {
  value: string;
  icon: ReactElement;
  label: string;
  content: ResourceTabContent;
}

export interface CardStats {
  label: string;
  value: string | number;
}

export interface EventCardProps {
  title: string;
  date: string;
  description?: string;
  importance?: 'high' | 'medium' | 'low';
  type?: string;
  category?: string;
}

export interface ProjectTypeInfoProps {
  selectedType?: string;
  selectedScale?: string;
}

export interface SummaryContentProps {
  summaryData: any;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
