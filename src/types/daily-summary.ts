
export interface DailySummaryData {
  id: string;
  date: string;
  summary: string;
  key_points?: string[];
  practical_applications?: string[];
  industry_impacts?: Record<string, any>;
  article_count?: number;
  generated_with?: string;
  executive_summary?: string;
  key_developments?: string[];
  action_items?: string[];
  // New fields for enhanced analytics
  sentiment?: string;
  confidence_score?: number;
  categorized_key_points?: Record<string, any>;
  key_technologies?: any[];
  application_details?: string[];
  impact_severity?: Record<string, any>;
  impact_trends?: Record<string, any>;
  analysis_depth?: string;
}

export interface UseAiDailySummaryResult {
  dailySummary: DailySummaryData | null;
  isLoading: boolean;
  error: Error | null;
  summaryData?: DailySummaryData | null;
  loading?: boolean;
  fetchSummary: (date?: string) => Promise<void>;
  refreshSummary: () => Promise<void>;
}
