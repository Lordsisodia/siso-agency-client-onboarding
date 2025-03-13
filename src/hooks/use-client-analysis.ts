
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface WebSearchResult {
  id: string;
  status: string;
}

export interface MessageAnnotation {
  index: number | null;
  title: string;
  type: string;
  url: string;
}

export interface Message {
  type: string;
  content: string;
  annotations?: MessageAnnotation[];
}

export interface ClientAnalysisResult {
  responseId: string;
  messages: Message[];
  webSearchResults: WebSearchResult[];
}

export function useClientAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClientAnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeClient = async (
    input: string, 
    websiteUrl?: string, 
    responseId?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Analyzing client with input: "${input.substring(0, 50)}..."${websiteUrl ? ` and website: ${websiteUrl}` : ''}`);
      
      const { data, error } = await supabase.functions.invoke('client-analysis', {
        body: { input, websiteUrl, responseId }
      });

      if (error) {
        console.error('Error invoking client-analysis function:', error);
        setError(`Failed to analyze client: ${error.message}`);
        toast({
          title: 'Analysis failed',
          description: 'There was a problem analyzing the client information.',
          variant: 'destructive',
        });
        return null;
      }

      if (!data.success) {
        console.error('Client analysis returned an error:', data.error);
        setError(`Analysis error: ${data.error}`);
        toast({
          title: 'Analysis error',
          description: data.error || 'An unexpected error occurred',
          variant: 'destructive',
        });
        return null;
      }

      console.log('Client analysis result:', data.result);
      setResult(data.result);
      return data.result;
    } catch (err: any) {
      console.error('Exception in analyzeClient:', err);
      setError(`Unexpected error: ${err.message}`);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during analysis.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeClient,
    isLoading,
    error,
    result
  };
}
