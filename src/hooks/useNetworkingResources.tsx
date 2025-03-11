
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { NetworkingResource, CategoryStats } from '@/types/dashboard';

export interface UseNetworkingResourcesResult {
  resources: NetworkingResource[];
  categories: CategoryStats[];
  error: Error | null;
  loading: boolean; // Added missing property
}

export const useNetworkingResources = (): UseNetworkingResourcesResult => {
  const [resources, setResources] = useState<NetworkingResource[]>([]);
  const [categories, setCategories] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNetworkingResources = async () => {
      try {
        const { data, error } = await supabase
          .from('networking_resources')
          .select('*');

        if (error) {
          throw error;
        }

        // Transform data to match NetworkingResource interface
        const transformedResources: NetworkingResource[] = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description || undefined,
          platform: item.platform || undefined,
          profile_image_url: item.profile_image_url || undefined,
          member_count: item.member_count || undefined,
          join_url: item.join_url || undefined,
          created_at: item.created_at,
          updated_at: item.updated_at || item.created_at,
        }));

        setResources(transformedResources);

        // Group by category and count
        const categoryGroups: Record<string, number> = {};
        transformedResources.forEach(resource => {
          const category = resource.category;
          categoryGroups[category] = (categoryGroups[category] || 0) + 1;
        });

        // Create CategoryStats array
        const categoryStats: CategoryStats[] = Object.keys(categoryGroups).map(category => ({
          category,
          community_count: categoryGroups[category]
        }));

        setCategories(categoryStats);
      } catch (err) {
        console.error("Error fetching networking resources:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkingResources();
  }, []);

  return { resources, categories, error, loading };
};
