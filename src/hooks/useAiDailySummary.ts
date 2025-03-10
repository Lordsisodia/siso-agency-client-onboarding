
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DailySummaryData, UseAiDailySummaryResult } from '@/types/daily-summary';

export function useAiDailySummary(): UseAiDailySummaryResult {
  const [data, setData] = useState<DailySummaryData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummary = async (date: string): Promise<DailySummaryData> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: summary, error } = await supabase
        .from('ai_news_daily_summaries')
        .select('*')
        .eq('date', date)
        .single();

      if (error) throw new Error(error.message);
      if (!summary) throw new Error('No summary found for this date');

      setData(summary);
      return summary;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    fetchSummary
  };
}
