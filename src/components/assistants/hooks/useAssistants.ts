
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Assistant {
  id: string;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
  assistant_type?: string;
  prompt_template?: string;
  use_cases?: string[];
  input_variables?: string[];
  model_type?: string;
  response_format?: string;
  rating?: number;
  likes_count?: number;
  downloads_count?: number;
  website_url?: string;
  gpt_url?: string;
  review_average?: number;
  review_count?: number;
  num_conversations_str?: string;
}

export function useAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssistants() {
      try {
        const { data, error } = await supabase
          .from('assistant_metadata')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        // Map the data to the Assistant interface, providing default values for missing properties
        const mappedData = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          created_at: item.created_at,
          updated_at: item.updated_at,
          assistant_type: item.assistant_type || '',
          prompt_template: item.prompt_template || '',
          use_cases: item.use_cases || [],
          input_variables: item.input_variables || [],
          model_type: item.model_type || '',
          response_format: item.response_format || '',
          rating: item.rating || 0,
          likes_count: item.likes_count || 0,
          downloads_count: item.downloads_count || 0,
          website_url: item.website_url || '',
          gpt_url: item.gpt_url || '',
          review_average: item.review_average || 0,
          review_count: item.review_count || 0,
          num_conversations_str: item.num_conversations_str || ''
        })) as Assistant[];

        setAssistants(mappedData);
      } catch (error) {
        console.error("Error fetching assistants:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch assistants');
      } finally {
        setLoading(false);
      }
    }

    fetchAssistants();
  }, []);

  return { assistants, loading, error };
}
