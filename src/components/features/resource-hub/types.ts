
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

// Simplified types for core functionality
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
