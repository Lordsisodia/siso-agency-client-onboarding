
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Assistant } from '../types';

export const useAssistants = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('assistant_metadata')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Map database records to Assistant interface
          const mappedAssistants: Assistant[] = data.map(item => {
            // Extract metadata values or use defaults
            const metadata = item.metadata || {};
            
            return {
              id: item.id,
              name: item.name,
              assistant_id: item.assistant_id,
              instructions: item.instructions,
              model: item.model,
              tools: item.tools,
              created_at: item.created_at,
              updated_at: item.updated_at,
              
              // Properties from metadata with fallbacks
              description: metadata.description || null,
              category: metadata.category || null,
              assistant_type: metadata.assistant_type || null,
              prompt_template: metadata.prompt_template || null,
              use_cases: metadata.use_cases || null,
              input_variables: metadata.input_variables || null,
              model_type: metadata.model_type || null,
              response_format: metadata.response_format || null,
              rating: metadata.rating || null,
              likes_count: metadata.likes_count || null,
              downloads_count: metadata.downloads_count || null,
              website_url: metadata.website_url || null,
              gpt_url: metadata.gpt_url || null,
              review_average: metadata.review_average || null,
              review_count: metadata.review_count || null,
              num_conversations_str: metadata.num_conversations_str || null
            };
          });

          setAssistants(mappedAssistants);
        }
      } catch (err) {
        console.error('Error fetching assistants:', err);
        setError(err.message || 'Failed to fetch assistants');
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  return { assistants, loading, error };
};
