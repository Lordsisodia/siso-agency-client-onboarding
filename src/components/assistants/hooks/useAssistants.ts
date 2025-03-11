
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Assistant } from '@/components/assistants/types';

export function useAssistants() {
  return useQuery({
    queryKey: ['assistants'],
    queryFn: async () => {
      console.log('Fetching assistants...');
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .or('category.eq.assistant,category.eq.gpt builder');
      
      if (error) {
        console.error('Error fetching assistants:', error);
        throw error;
      }
      
      console.log('Fetched assistants:', data);
      
      // Type casting to Assistant[] with proper type conversion
      return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        assistant_type: item.assistant_type || null,
        prompt_template: item.prompt_template || null,
        use_cases: item.use_cases || null,
        input_variables: item.input_variables || null,
        model_type: item.model_type || null,
        response_format: item.response_format || null,
        rating: item.rating || null,
        likes_count: item.likes_count || null,
        downloads_count: item.downloads_count || null,
        website_url: item.website_url || null,
        gpt_url: item.gpt_url || null,
        review_average: item.review_average || null,
        review_count: item.review_count || null,
        num_conversations_str: item.num_conversations_str || null
      })) as Assistant[];
    },
  });
}
