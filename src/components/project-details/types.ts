
import { Database } from '@/integrations/supabase/types';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  details?: {
    business_context?: {
      industry: string;
      companyName: string;
      scale: string;
      target_audience: string[];
    };
    goals?: string;
    features?: {
      core: string[];
      extras: string[];
    };
    timeline?: {
      estimated_weeks: number;
      phases: {
        name: string;
        duration: string;
        tasks: string[];
      }[];
    };
    resources?: {
      id: string;
      name: string;
      type: string;
      url: string;
    }[];
  };
}
