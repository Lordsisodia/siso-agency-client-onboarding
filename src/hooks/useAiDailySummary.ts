
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DailySummaryData, UseAiDailySummaryResult } from '@/types/daily-summary';
import { useToast } from '@/components/ui/use-toast';

export function useAiDailySummary(initialDate?: string): UseAiDailySummaryResult {
  const [dailySummary, setDailySummary] = useState<DailySummaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  };

  const fetchSummary = useCallback(async (date?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Format date parameter or use current date
      const queryDate = date ? formatDate(date) : formatDate(new Date());
      
      // Use the get_daily_summary function if it exists
      try {
        const { data, error } = await supabase
          .rpc('get_daily_summary', { target_date: queryDate });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setDailySummary(data[0] as DailySummaryData);
          return;
        }
      } catch (functionError) {
        console.warn('Function get_daily_summary not available, falling back to direct query:', functionError);
      }

      // Fallback to direct query if function doesn't exist
      const { data, error: queryError } = await supabase
        .from('ai_news_daily_summaries')
        .select('*')
        .eq('date', queryDate)
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          // No data found for this date
          setDailySummary(null);
          return;
        }
        throw queryError;
      }

      setDailySummary(data as DailySummaryData);
    } catch (err) {
      console.error('Error fetching daily summary:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch daily summary'));
      
      toast({
        title: "Error fetching summary",
        description: err instanceof Error ? err.message : 'Failed to fetch summary',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const refreshSummary = useCallback(async () => {
    if (dailySummary) {
      await fetchSummary(dailySummary.date);
    } else {
      await fetchSummary();
    }
  }, [dailySummary, fetchSummary]);

  useEffect(() => {
    fetchSummary(initialDate);
  }, [initialDate, fetchSummary]);

  return {
    dailySummary,
    isLoading,
    error,
    fetchSummary,
    refreshSummary,
    // Support for older components that expect 'loading' and 'summaryData'
    summaryData: dailySummary,
    loading: isLoading
  };
}
