
export interface DailySummaryData {
  id: string;
  date: string;
  summary: string;
  key_points?: string[];
  practical_applications?: string[];
  industry_impacts?: any;
  article_count?: number;
  generated_with?: string;
  created_at?: string;
  updated_at?: string;
  executive_summary?: string;
  key_developments?: string[];
  action_items?: string[];
  sentiment?: string;
  confidence_score?: number;
  categorized_key_points?: any;
  key_technologies?: any[];
  application_details?: string[];
  impact_severity?: any;
  impact_trends?: any;
  analysis_depth?: string;
}

export interface UseAiDailySummaryResult {
  data: DailySummaryData | null;
  loading: boolean;
  error: any;
  fetchSummary: (date: Date) => Promise<void>;
  summaryData: DailySummaryData | null; // Adding this for backward compatibility
}
