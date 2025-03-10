
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DailySummaryData, UseAiDailySummaryResult } from '@/types/daily-summary';

export function useAiDailySummary(initialDate?: Date): UseAiDailySummaryResult {
  const [data, setData] = useState<DailySummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchSummary = useCallback(async (date: Date = new Date()) => {
    try {
      setLoading(true);
      setError(null);

      // Format the date to YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];

      // Query the daily summary for the selected date
      const { data: summaryData, error: fetchError } = await supabase
        .rpc('get_daily_summary', {
          target_date: formattedDate,
        });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      // The summaryData will be an array with one item or empty
      if (summaryData && summaryData.length > 0) {
        setData(summaryData[0]);
      } else {
        setData(null);
      }
    } catch (err) {
      console.error('Error fetching daily summary:', err);
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary(initialDate || new Date());
  }, [fetchSummary, initialDate]);

  return {
    data,
    loading,
    error,
    fetchSummary,
    summaryData: data // For backward compatibility
  };
}
