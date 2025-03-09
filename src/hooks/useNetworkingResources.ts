
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { NetworkingResource, CategoryStats } from '@/types/dashboard';
import { useToast } from '@/hooks/use-toast';

export const useNetworkingResources = () => {
  const [resources, setResources] = useState<NetworkingResource[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNetworkingResources = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch networking resources
        const { data: resourcesData, error: resourcesError } = await supabase
          .from('networking_resources')
          .select('*');

        if (resourcesError) throw resourcesError;
        
        setResources(resourcesData as NetworkingResource[]);

        // Fetch category stats
        const { data: statsData, error: statsError } = await supabase
          .from('category_stats')
          .select('*');

        if (statsError) throw statsError;
        
        setCategoryStats(statsData as CategoryStats[]);

      } catch (err: any) {
        console.error('Error fetching networking resources:', err);
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error fetching networking resources",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkingResources();
  }, [toast]);

  return {
    resources,
    categoryStats,
    loading,
    error
  };
};
