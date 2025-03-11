
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define types
export interface NetworkingResource {
  id: string;
  name: string;
  category: string;
  community_count: number;
  created_at: string;
  updated_at: string;
}

export interface UseNetworkingResourcesResult {
  resources: NetworkingResource[];
  categories: string[];
  isLoading: boolean;
  error: Error | null;
  refreshResources: () => Promise<void>;
}

export const useNetworkingResources = (): UseNetworkingResourcesResult => {
  const [resources, setResources] = useState<NetworkingResource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('networking_resources')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setResources(data || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set((data || []).map(resource => resource.category))
      );
      
      setCategories(uniqueCategories);
    } catch (err: any) {
      console.error('Error fetching networking resources:', err);
      setError(err);
      toast({
        title: "Error",
        description: "Failed to load networking resources",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const refreshResources = async () => {
    await fetchResources();
  };

  return {
    resources,
    categories,
    isLoading,
    error,
    refreshResources
  };
};

export default useNetworkingResources;
