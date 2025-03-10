
export interface DailySummaryData {
  id: string;
  date: string;
  summary: string;
  key_points: string[];
  practical_applications: string[];
  industry_impacts: Record<string, string>;
  article_count: number;
  created_at: string;
  updated_at: string;
  generated_with?: string;
  sentiment?: string;
  confidence_score?: number;
  categorized_key_points?: Record<string, any>;
  key_technologies?: any[];
  application_details?: string[];
  impact_severity?: Record<string, any>;
  impact_trends?: Record<string, any>;
  analysis_depth?: string;
  executive_summary?: string;
  key_developments?: string[];
  action_items?: string[];
}

export interface UseAiDailySummaryResult {
  summary: DailySummaryData | null;
  isLoading: boolean;
  error: Error | null;
  fetchSummaryForDate: (date: string) => Promise<DailySummaryData | null>;
  generateSummary: (date: string) => Promise<DailySummaryData | null>;
}
