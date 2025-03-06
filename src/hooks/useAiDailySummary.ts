
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// [Analysis] Interface for the daily summary data with proper types
export interface DailySummaryData {
  id?: string;
  date: string;
  summary: string;
  key_points: string[];
  practical_applications: string[];
  industry_impacts: Record<string, string>;
  article_count: number;
  created_at: string;
  generated_with: string;
}

export function useAiDailySummary(date: string, isAdmin: boolean = false) {
  const [summaryData, setSummaryData] = useState<DailySummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // [Analysis] Fetch the summary for the given date using a direct query instead of RPC
  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // [Framework] Using direct query instead of RPC to avoid TypeScript issues
      const { data, error: fetchError } = await supabase
        .from('ai_news_daily_summaries')
        .select('*')
        .eq('date', date)
        .maybeSingle();
        
      if (fetchError) {
        if (fetchError.code !== 'PGRST116') { // Not found is expected and not an error to show
          console.error('Error fetching summary:', fetchError);
          setError('Failed to load daily summary');
          toast({
            title: 'Error',
            description: 'Failed to load daily summary. Please try again.',
            variant: 'destructive',
          });
        }
      } else if (data) {
        // Convert industry_impacts from JSON to proper Record type
        const formattedData: DailySummaryData = {
          ...data,
          industry_impacts: data.industry_impacts as Record<string, string>,
          key_points: data.key_points || [],
          practical_applications: data.practical_applications || [],
        };
        
        setSummaryData(formattedData);
        
        // If this was a fallback summary due to API error, show a notification
        if (data.generated_with === 'error_fallback' || data.generated_with === 'placeholder') {
          setError('AI-enhanced summary unavailable. Using basic summary instead.');
          
          if (isAdmin) {
            toast({
              title: 'API Issue Detected',
              description: 'Using fallback summary as AI service encountered an issue. Check edge function logs for details.',
              variant: 'destructive',
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in fetchSummary:', error);
      setError('Failed to load summary data');
    } finally {
      setLoading(false);
    }
  };
  
  // [Analysis] Generate a new summary for the date with improved error handling
  const generateSummary = async (forceRefresh = false) => {
    if (!isAdmin) return;
    
    try {
      setGenerating(true);
      setError(null);
      
      console.log(`Invoking edge function for date: ${date}, forceRefresh: ${forceRefresh}`);
      
      const { data, error: invokeError } = await supabase.functions.invoke('generate-daily-summary', {
        body: { 
          date,
          forceRefresh
        },
      });
      
      if (invokeError) {
        throw new Error(`Edge function error: ${invokeError.message}`);
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate summary');
      }
      
      // Check if this was a fallback/placeholder summary
      if (data.error && data.error.includes('API error')) {
        setError('AI service unavailable. Using basic summary instead.');
        toast({
          title: 'API Issue Detected',
          description: 'Using fallback summary as AI service encountered an issue. Check edge function logs for details.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: forceRefresh 
            ? 'Daily summary has been regenerated' 
            : 'Daily summary has been generated',
        });
      }
      
      // Refetch the summary from the database to get all fields
      await fetchSummary();
      
    } catch (error) {
      console.error('Error generating summary:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate summary');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate summary',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  return {
    summaryData,
    loading,
    generating,
    error,
    fetchSummary,
    generateSummary
  };
}
