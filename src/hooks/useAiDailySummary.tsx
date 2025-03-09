
import { useState, useCallback } from 'react';
import { DailySummaryData } from '@/types/daily-summary';

export function useAiDailySummary(date?: string) {
  const [summaryData, setSummaryData] = useState<DailySummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    // Simplified version that doesn't actually fetch from database
    setLoading(true);
    try {
      // Return placeholder data instead of actual fetch
      setSummaryData(null);
      setError(null);
    } catch (err) {
      setError("Could not fetch summary data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [date]);

  const generateSummary = useCallback(async (forceRefresh = false) => {
    // Simplified version
    setGenerating(true);
    try {
      // No actual generation happens
      setError(null);
    } catch (err) {
      setError("Could not generate summary");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }, [date]);

  return {
    summaryData,
    loading,
    generating,
    error,
    fetchSummary,
    generateSummary
  };
}

export { type DailySummaryData };
