
import { Json } from '@/integrations/supabase/types';

export interface DailySummaryData {
  id: string;
  date: string;
  summary: string;
  key_points: string;
  industry_impacts: string;
  action_recommendations: string;
  sentiment?: string;
  confidence_score?: number;
  categorized_key_points?: Json;
  key_technologies?: Json;
  application_details?: string[];
  impact_severity?: Json;
  impact_trends?: Json;
  analysis_depth?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DailySummaryResponse {
  data: DailySummaryData | null;
  error: any;
}
