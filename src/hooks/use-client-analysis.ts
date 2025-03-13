
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { v4 as uuidv4 } from 'uuid';

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
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClientAnalysisResult | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeClient = async (
    input: string, 
    websiteUrl?: string, 
    responseId?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // Detect if the input might involve web search (contains search terms or analysis request)
      const mightInvolveSearch = /search|find|research|information about|what is|latest|news|analyze/i.test(input);
      if (mightInvolveSearch) {
        setIsSearching(true);
      }

      console.log(`Analyzing client with input: "${input.substring(0, 50)}..."${websiteUrl ? ` and website: ${websiteUrl}` : ''}${responseId ? ` and responseId: ${responseId}` : ''}`);
      
      // If we have a previous conversationId and no explicit responseId, use it
      const effectiveResponseId = responseId || conversationId;
      
      const { data, error } = await supabase.functions.invoke('client-analysis', {
        body: { 
          input, 
          websiteUrl, 
          responseId: effectiveResponseId 
        }
      });

      setIsSearching(false);

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

      // Save the response ID for potential follow-up requests
      if (data.result && data.result.responseId) {
        setConversationId(data.result.responseId);
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

  // Function to clear the current conversation
  const clearConversation = () => {
    setConversationId(null);
    setResult(null);
    setError(null);
  };

  return {
    analyzeClient,
    clearConversation,
    isLoading,
    isSearching,
    error,
    result,
    conversationId
  };
}
