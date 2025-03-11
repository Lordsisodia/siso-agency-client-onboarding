
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
      
      // Cast data to unknown first, then to Assistant[] to avoid type conversion errors
      return (data as unknown[]).map(item => {
        const toolItem = item as any;
        return {
          id: toolItem.id,
          name: toolItem.name,
          description: toolItem.description,
          category: toolItem.category,
          assistant_type: toolItem.assistant_type || null,
          prompt_template: toolItem.prompt_template || null,
          use_cases: toolItem.use_cases || null,
          input_variables: toolItem.input_variables || null,
          model_type: toolItem.model_type || null,
          response_format: toolItem.response_format || null,
          rating: toolItem.rating || null,
          likes_count: toolItem.likes_count || null,
          downloads_count: toolItem.downloads_count || null,
          website_url: toolItem.website_url || null,
          gpt_url: toolItem.gpt_url || null,
          review_average: toolItem.review_average || null,
          review_count: toolItem.review_count || null,
          num_conversations_str: toolItem.num_conversations_str || null
        } as Assistant;
      });
    },
  });
}
