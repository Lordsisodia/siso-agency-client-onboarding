
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Assistant } from '../types';
import { safeJsonProperty, safeJsonObject } from '@/utils/json-helpers';

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
            // Extract metadata as a safe object
            const metadata = safeJsonObject(item.metadata);
            
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
              description: safeJsonProperty(metadata, 'description', null),
              category: safeJsonProperty(metadata, 'category', null),
              assistant_type: safeJsonProperty(metadata, 'assistant_type', null),
              prompt_template: safeJsonProperty(metadata, 'prompt_template', null),
              use_cases: safeJsonProperty(metadata, 'use_cases', null),
              input_variables: safeJsonProperty(metadata, 'input_variables', null),
              model_type: safeJsonProperty(metadata, 'model_type', null),
              response_format: safeJsonProperty(metadata, 'response_format', null),
              rating: safeJsonProperty(metadata, 'rating', null),
              likes_count: safeJsonProperty(metadata, 'likes_count', null),
              downloads_count: safeJsonProperty(metadata, 'downloads_count', null),
              website_url: safeJsonProperty(metadata, 'website_url', null),
              gpt_url: safeJsonProperty(metadata, 'gpt_url', null),
              review_average: safeJsonProperty(metadata, 'review_average', null),
              review_count: safeJsonProperty(metadata, 'review_count', null),
              num_conversations_str: safeJsonProperty(metadata, 'num_conversations_str', null)
            };
          });

          setAssistants(mappedAssistants);
        }
      } catch (err: any) {
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
