
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { NetworkingResource, CategoryStats, UseNetworkingResourcesResult } from '@/types/dashboard';

export const useNetworkingResources = (): UseNetworkingResourcesResult => {
  const [resources, setResources] = useState<NetworkingResource[]>([]);
  const [categories, setCategories] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        
        // Fetch networking resources
        const { data: resourcesData, error: resourcesError } = await supabase
          .from('networking_resources')
          .select('*')
          .order('name', { ascending: true });
          
        if (resourcesError) throw resourcesError;
        
        // Fetch category stats
        const { data: categoryData, error: categoryError } = await supabase
          .from('resource_categories')
          .select('category, community_count')
          .order('community_count', { ascending: false });
          
        if (categoryError) throw categoryError;
        
        // Transform the data to match the expected interfaces
        const transformedResources = resourcesData.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          platform: item.platform,
          profile_image_url: item.profile_image_url,
          member_count: item.member_count,
          join_url: item.join_url,
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        
        const transformedCategories = categoryData.map(item => ({
          category: item.category,
          community_count: item.community_count
        }));
        
        setResources(transformedResources);
        setCategories(transformedCategories);
      } catch (err) {
        console.error('Error fetching networking resources:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  return { resources, categories, loading, error };
};
