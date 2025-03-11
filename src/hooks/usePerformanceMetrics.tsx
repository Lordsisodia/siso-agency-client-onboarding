
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PerformanceMetric {
  id: string;
  page_url: string;
  ttfb: number;
  created_at?: string;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPerformanceMetrics = async () => {
      try {
        setIsLoading(true);
        const { data, error: fetchError } = await supabase
          .from('performance_metrics')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw new Error(`Error fetching performance metrics: ${fetchError.message}`);
        }

        setMetrics(data || []);
      } catch (err) {
        console.error('Error in usePerformanceMetrics:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformanceMetrics();
  }, []);

  const recordPagePerformance = async (pageUrl: string) => {
    try {
      // Basic performance measurement
      const ttfb = performance.getEntriesByType('navigation')[0] 
        ? Math.round((performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).responseStart)
        : 0;

      const { error } = await supabase
        .from('performance_metrics')
        .insert({
          page_url: pageUrl,
          ttfb
        });

      if (error) {
        throw new Error(`Error recording performance: ${error.message}`);
      }
    } catch (err) {
      console.error('Error recording performance metric:', err);
    }
  };

  return {
    metrics,
    isLoading,
    error,
    recordPagePerformance
  };
};
