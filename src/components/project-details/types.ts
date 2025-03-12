
export interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: string;
  details?: {
    business_context?: {
      industry?: string;
      companyName?: string;
      scale?: string;
      target_audience?: string[];
    };
    goals?: string;
    features?: {
      core?: string[];
      extras?: string[];
    };
    timeline?: {
      estimated_weeks?: number;
      phases?: {
        name: string;
        duration: string;
        tasks: string[];
      }[];
    };
  };
}
