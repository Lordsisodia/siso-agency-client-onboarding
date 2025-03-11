
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NetworkingResource {
  id: string;
  name: string;
  category: string;
  community_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryStat {
  category: string;
  count: number;
}

export interface UseNetworkingResourcesResult {
  resources: NetworkingResource[];
  isLoading: boolean;
  error: Error | null;
  categoryStats: CategoryStat[];
}

export const useNetworkingResources = (): UseNetworkingResourcesResult => {
  const [resources, setResources] = useState<NetworkingResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        
        const { data, error: fetchError } = await supabase
          .from('networking_resources')
          .select('*')
          .order('name');
          
        if (fetchError) {
          throw new Error(fetchError.message);
        }
        
        setResources(data || []);
        
        // Calculate category stats
        const stats: Record<string, number> = {};
        data?.forEach((resource: NetworkingResource) => {
          stats[resource.category] = (stats[resource.category] || 0) + 1;
        });
        
        const categoryStatsArray = Object.entries(stats).map(([category, count]) => ({
          category,
          count
        }));
        
        setCategoryStats(categoryStatsArray);
      } catch (err) {
        console.error('Error fetching networking resources:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);

  return {
    resources,
    isLoading,
    error,
    categoryStats
  };
};
