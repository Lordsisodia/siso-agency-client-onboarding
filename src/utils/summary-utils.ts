
import { DailySummaryData } from '@/types/daily-summary';

/**
 * Check if a summary is a fallback or error placeholder
 */
export function isFallbackSummary(summary: DailySummaryData | null): boolean {
  if (!summary) return false;
  return ['error_fallback', 'placeholder', 'client_fallback', 'empty_placeholder'].includes(summary.generated_with);
}

/**
 * Gets a human-readable label for the summary generation method
 */
export function getSummaryGenerationLabel(summary: DailySummaryData | null): string {
  if (!summary) return 'Not available';
  
  switch (summary.generated_with) {
    case 'openai':
      return 'AI-Generated (OpenAI)';
    case 'error_fallback':
      return 'Basic Summary (API Error)';
    case 'placeholder':
      return 'Basic Summary (Placeholder)';
    case 'client_fallback':
      return 'Basic Summary (API Unavailable)';
    case 'empty_placeholder':
      return 'No Articles Available';
    default:
      return summary.generated_with || 'Unknown';
  }
}

/**
 * Check if a summary has enhanced analysis data
 */
export function hasEnhancedAnalysis(summary: DailySummaryData | null): boolean {
  if (!summary) return false;
  
  return Boolean(
    summary.sentiment && 
    summary.confidence_score && 
    summary.categorized_key_points && 
    Object.keys(summary.categorized_key_points).length > 0
  );
}
