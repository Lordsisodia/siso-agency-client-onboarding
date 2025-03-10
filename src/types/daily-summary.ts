
export interface DailySummaryData {
  id: string;
  date: string;
  summary: string;
  key_points: string[];
  practical_applications: string[];
  industry_impacts: Record<string, any>;
  article_count: number;
  generated_with?: string;
  created_at: string;
  updated_at: string;
  executive_summary?: string;
  key_developments?: string[];
  industry_impact?: Record<string, any>;
  action_items?: string[];
}
