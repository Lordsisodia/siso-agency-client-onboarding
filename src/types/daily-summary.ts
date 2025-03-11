
export interface DailySummaryData {
  id: string;
  date: string;
  title: string;
  summary: string;
  key_points?: string[];
  practical_applications?: string[];
  created_at?: string;
}
