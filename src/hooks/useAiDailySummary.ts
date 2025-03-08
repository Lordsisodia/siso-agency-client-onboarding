
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DailySummaryData, UseAiDailySummaryResult } from '@/types/daily-summary';
import { 
  fetchDailySummaryFromDB, 
  formatSummaryData, 
  generateSummaryWithEdgeFunction,
  saveSummaryToDB
} from '@/services/daily-summary.service';

/**
 * Hook for fetching and generating AI daily summaries
 */
export function useAiDailySummary(date: string, isAdmin: boolean = false): UseAiDailySummaryResult {
  const [summaryData, setSummaryData] = useState<DailySummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch the summary for the given date
  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await fetchDailySummaryFromDB(date);
      
      if (fetchError) {
        if (fetchError.code !== 'PGRST116') { // Not found is expected and not an error to show
          console.error('Error fetching summary:', fetchError);
          setError('Failed to load daily summary');
          toast({
            title: "Error",
            description: "Failed to load daily summary. Please try again.",
            variant: "destructive",
          });
        }
      } else if (data) {
        console.log('Summary data retrieved:', data);
        const formattedData = formatSummaryData(data);
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
      } else {
        console.log('No summary found for date:', date);
      }
    } catch (error) {
      console.error('Error in fetchSummary:', error);
      setError('Failed to load summary data');
    } finally {
      setLoading(false);
    }
  }, [date, toast, isAdmin]);
  
  // Generate a new summary for the date
  const generateSummary = async (forceRefresh = false) => {
    if (!isAdmin) return;
    
    try {
      setGenerating(true);
      setError(null);
      
      try {
        const data = await generateSummaryWithEdgeFunction(date, forceRefresh);
        
        if (!data || !data.success) {
          const errorMsg = data?.error || 'Failed to generate summary';
          console.error("Generate summary error:", errorMsg);
          throw new Error(errorMsg);
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
      } catch (error) {
        console.error("Function invoke error:", error);
        
        // Create a client-side fallback summary
        const placeholderSummary = await saveSummaryToDB(date, {});
        
        setSummaryData(placeholderSummary as DailySummaryData);
        setError('Generated fallback summary due to service issues.');
        
        toast({
          title: 'Summary Generation Issue',
          description: 'Created a temporary summary due to service issues. Please try again later.',
          variant: 'destructive',
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

  // Automatically fetch summary when component mounts or date changes
  useEffect(() => {
    if (date) {
      fetchSummary();
    }
  }, [date, fetchSummary]);

  return {
    summaryData,
    loading,
    generating,
    error,
    fetchSummary,
    generateSummary
  };
}
