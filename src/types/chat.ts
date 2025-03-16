
export interface ChatMessage {
  role: "user" | "assistant" | string; // Updated to accept string roles
  content: string;
  timestamp?: Date;
  id?: string;
  loading?: boolean;
  metadata?: {
    web_search?: boolean;
    reasoning?: boolean;
    structured_output?: boolean;
    [key: string]: any;
  };
}

export interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface ChatThreadProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  error?: string | null;
}

export interface CompanyAnalysis {
  company: {
    name: string;
    description: string;
    industry: string;
    founded: string;
    size: string;
    location: string;
    website: string;
  };
  business: {
    products: string[];
    services: string[];
    target_audience: string;
    value_proposition: string;
    competitors: string[];
  };
  online_presence: {
    social_media: {
      platform: string;
      url: string;
      activity_level: string;
    }[];
    content_types: string[];
  };
  application_recommendations: {
    suggested_features: {
      name: string;
      description: string;
      priority: string;
    }[];
    design_recommendations: string[];
    integration_suggestions: string[];
  };
  confidence_score: number;
  data_sources: string[];
}
