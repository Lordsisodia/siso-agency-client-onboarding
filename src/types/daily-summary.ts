
export interface DailySummaryData {
  id?: string;
  date: string;
  title?: string;
  summary: string;
  key_topics?: string[];
  executive_summary?: string;
  key_developments?: string[];
  industry_impacts?: string[];
  industry_impact?: string; // For backward compatibility
  action_items?: string[];
  sentiment?: string;
  confidence_score?: number;
  categorized_key_points?: Record<string, string[]>;
  key_technologies?: string[];
  application_details?: string[];
  impact_severity?: Record<string, string>;
  impact_trends?: Record<string, string>;
  analysis_depth?: string;
}

export interface UseAiDailySummaryResult {
  data: DailySummaryData | null;
  isLoading: boolean;
  error: any;
  refetch: () => Promise<void>;
}

export interface SummaryContentProps {
  summaryData: UseAiDailySummaryResult;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean; // Added to fix prop mismatch error
}
