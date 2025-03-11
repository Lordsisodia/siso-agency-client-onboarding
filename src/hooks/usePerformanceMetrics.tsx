
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PerformanceMetric {
  id: string;
  page_url: string;
  ttfb: number;
  created_at: string;
}

interface PerformanceMetricsResult {
  metrics: PerformanceMetric[];
  loading: boolean;
  error: Error | null;
  recordMetric: (url: string, ttfb: number) => Promise<void>;
  getAverageMetrics: () => { avgTtfb: number };
}

export const usePerformanceMetrics = (): PerformanceMetricsResult => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw new Error(error.message);
      setMetrics(data || []);
    } catch (err: any) {
      console.error('Error fetching performance metrics:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const recordMetric = async (url: string, ttfb: number) => {
    try {
      const { error } = await supabase
        .from('performance_metrics')
        .insert({ page_url: url, ttfb });

      if (error) throw new Error(error.message);
      fetchMetrics();
    } catch (err: any) {
      console.error('Error recording performance metric:', err);
      setError(err);
    }
  };

  const getAverageMetrics = () => {
    if (metrics.length === 0) return { avgTtfb: 0 };
    
    const totalTtfb = metrics.reduce((sum, metric) => sum + metric.ttfb, 0);
    return { avgTtfb: totalTtfb / metrics.length };
  };

  return {
    metrics,
    loading,
    error,
    recordMetric,
    getAverageMetrics
  };
};

export default usePerformanceMetrics;
