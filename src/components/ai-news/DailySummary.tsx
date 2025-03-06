import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { SummaryHeader } from './daily-summary/SummaryHeader';
import { SummaryContent } from './daily-summary/SummaryContent';
import { SummaryFooter } from './daily-summary/SummaryFooter';
import { GeneratePrompt } from './daily-summary/GeneratePrompt';
import { useAiDailySummary } from '@/hooks/useAiDailySummary';
import { Alert, AlertDescription } from '@/components/ui/alert';
interface DailySummaryProps {
  date?: string;
  articleCount?: number;
  refreshSummary?: () => Promise<void>;
  isAdmin?: boolean;
}

// [Analysis] Main component that orchestrates the summary display
export function DailySummary({
  date = new Date().toISOString().split('T')[0],
  articleCount = 0,
  refreshSummary,
  isAdmin = false
}: DailySummaryProps) {
  const [activeTab, setActiveTab] = useState('summary');

  // Format the date for display
  const formattedDate = date ? format(new Date(date), 'MMMM d, yyyy') : 'Today';

  // Use our custom hook
  const {
    summaryData,
    loading,
    generating,
    error,
    fetchSummary,
    generateSummary
  } = useAiDailySummary(date, isAdmin);

  // Fetch summary on mount and when date changes
  useEffect(() => {
    console.log(`DailySummary: Fetching summary for date ${date}`);
    fetchSummary();
  }, [date]);

  // Handle refresh button click
  const handleRefresh = async () => {
    console.log("DailySummary: Refreshing summary data");
    if (refreshSummary) {
      await refreshSummary();
    }
    await fetchSummary();
  };

  // Handle generate summary click
  const handleGenerate = async () => {
    console.log(`DailySummary: Generating summary, exists: ${summaryData !== null}`);
    await generateSummary(summaryData !== null);
  };

  // If there's no summary data and we've finished loading
  const shouldShowGeneratePrompt = !loading && !summaryData;
  return;
}