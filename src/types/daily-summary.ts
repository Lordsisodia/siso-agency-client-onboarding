
export interface DailySummaryData {
  id: string;
  date: Date;
  summary: string;
  generated_with: string;
  executive_summary: string;
  key_developments: string[];
  industry_impacts: Record<string, any>;
  action_items: string[];
  created_at: string;
  updated_at: string;
}

export interface UseAiDailySummaryResult {
  data: DailySummaryData | null;
  error: Error | null;
  isLoading: boolean;
  fetchSummary: (date: string) => Promise<DailySummaryData>;
}
