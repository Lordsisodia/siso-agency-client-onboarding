
// Export the main hook and related utilities from a single file
export { useAiDailySummary } from '../useAiDailySummary';
export { 
  isFallbackSummary, 
  getSummaryGenerationLabel,
  hasEnhancedAnalysis
} from '@/utils/summary-utils';
export type { DailySummaryData } from '@/types/daily-summary';
