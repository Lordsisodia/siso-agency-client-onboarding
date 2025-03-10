
// Types for daily summary data and operations
export interface DailySummaryData {
  id?: string;
  date: string;
  summary: string;
  key_points: string[];
  practical_applications: string[];
  industry_impacts: Record<string, string>;
  article_count: number;
  created_at: string;
  generated_with: string;
  
  // Enhanced data structure
  sentiment?: string;
  confidence_score?: number;
  categorized_key_points?: Record<string, string[]>;
  key_technologies?: Array<{
    name: string;
    description: string;
    maturity?: string;
    adoption_rate?: number;
  }>;
  application_details?: string[];
  impact_severity?: Record<string, string>;
  impact_trends?: Record<string, string>;
  analysis_depth?: string;
}

export interface UseAiDailySummaryResult {
  summaryData: DailySummaryData | null;
  loading: boolean;
  generating: boolean;
  error: string | null;
  fetchSummary: () => Promise<void>;
  generateSummary: (forceRefresh?: boolean) => Promise<void>;
}
