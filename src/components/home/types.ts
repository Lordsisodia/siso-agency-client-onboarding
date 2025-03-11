
export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  url?: string;
}

export interface HomeMessage {
  role: "user" | "assistant";
  content: string;
  assistantType?: string;
  isLoading?: boolean;
}
