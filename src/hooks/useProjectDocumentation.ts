
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProjectDoc {
  id: string;
  section: string;
  content: string;
  related_components: string[];
  implementation_status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export const useProjectDocumentation = () => {
  const [docs, setDocs] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjectDocs = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('project_documentation')
          .select('*');

        if (fetchError) throw fetchError;
        
        setDocs(data as ProjectDoc[]);
      } catch (err: any) {
        console.error('Error fetching project documentation:', err);
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error fetching project documentation",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDocs();
  }, [toast]);

  return {
    docs,
    loading,
    error
  };
};
