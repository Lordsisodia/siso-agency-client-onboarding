
/**
 * Interface for AI-generated daily summaries
 */
export interface DailySummaryData {
  id?: string;
  date: string;
  summary: string;
  key_points: string[];
  practical_applications: string[];
  industry_impacts: Record<string, string>;
  article_count: number;
  created_at?: string;
  generated_with?: string;
  
  // Enhanced analysis fields
  sentiment?: 'positive' | 'neutral' | 'negative' | string;
  confidence_score?: number;
  categorized_key_points?: Record<string, string[]>;
  key_technologies?: string[];
  application_details?: Record<string, any>;
  impact_severity?: Record<string, string>;
  impact_trends?: Record<string, any>;
  analysis_depth?: 'standard' | 'enhanced' | string;
}

export interface UseDailySummaryResult {
  dailySummary: DailySummaryData | null;
  isLoading: boolean;
  error: string | null;
  refreshSummary: (forceRefresh?: boolean) => Promise<void>;
}
