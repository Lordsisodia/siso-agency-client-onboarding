
import { supabase } from '@/integrations/supabase/client';
import { DailySummaryData } from '@/types/daily-summary';

/**
 * Fetches daily summary data for the given date
 */
export async function fetchDailySummaryFromDB(date: string) {
  try {
    console.log(`Fetching summary for date: ${date}`);
    
    const { data, error: fetchError } = await supabase
      .from('ai_news_daily_summaries')
      .select('*')
      .eq('date', date)
      .maybeSingle();
    
    return { data, error: fetchError };
  } catch (error) {
    console.error('Error in fetchDailySummaryFromDB:', error);
    throw error;
  }
}

/**
 * Formats raw data into the expected DailySummaryData format
 */
export function formatSummaryData(data: any): DailySummaryData {
  // Convert industry_impacts from JSON to proper Record type
  return {
    ...data,
    industry_impacts: data.industry_impacts as Record<string, string>,
    key_points: data.key_points || [],
    practical_applications: data.practical_applications || [],
    
    // Handle enhanced data fields
    sentiment: data.sentiment,
    confidence_score: data.confidence_score,
    categorized_key_points: data.categorized_key_points,
    key_technologies: data.key_technologies,
    application_details: data.application_details,
    impact_severity: data.impact_severity,
    impact_trends: data.impact_trends,
    analysis_depth: data.analysis_depth || 'standard',
  };
}

/**
 * Generates a summary using the edge function
 */
export async function generateSummaryWithEdgeFunction(date: string, forceRefresh: boolean = false) {
  console.log(`Invoking edge function for date: ${date}, forceRefresh: ${forceRefresh}`);
  
  // Add a timestamp to avoid caching issues with the Edge Function
  const timestamp = new Date().getTime();
  
  const { data, error: invokeError } = await supabase.functions.invoke('generate-daily-summary', {
    body: { 
      date,
      forceRefresh,
      enhancedAnalysis: true, // Always send flag to enable enhanced analysis
      timestamp, // Add timestamp to avoid caching
    },
  });
  
  console.log("Edge function response received:", data);
  
  if (invokeError) {
    console.error("Edge function invoke error:", invokeError);
    throw new Error(`Edge function error: ${invokeError.message}`);
  }
  
  return data;
}

/**
 * Creates or updates a daily summary in the database
 */
export async function saveSummaryToDB(date: string, summaryData: Partial<DailySummaryData>) {
  try {
    // If the edge function fails, create a placeholder summary client-side
    const placeholderSummary = {
      date,
      summary: `Daily summary for ${date}. We're experiencing issues with our AI service. Please try again later.`,
      key_points: [
        "Summary temporarily unavailable",
        "Please try refreshing in a few minutes",
        "Our team has been notified of the issue"
      ],
      practical_applications: [
        "Check back later for the full summary"
      ],
      industry_impacts: {
        "general": "Impact analysis will be available when service is restored"
      },
      article_count: 0,
      created_at: new Date().toISOString(),
      generated_with: "client_fallback",
      ...summaryData
    };
    
    const { error } = await supabase
      .from('ai_news_daily_summaries')
      .insert(placeholderSummary);
      
    if (error) {
      console.error("Error saving summary:", error);
      throw error;
    }
    
    return placeholderSummary;
  } catch (error) {
    console.error('Error in saveSummaryToDB:', error);
    throw error;
  }
}
