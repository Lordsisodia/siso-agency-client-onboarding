
import React from 'react';
import { DailySummaryData } from '@/types/daily-summary';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export interface SummaryContentProps {
  summaryData: DailySummaryData;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean; // Add loading prop
}

export const SummaryContent: React.FC<SummaryContentProps> = ({
  summaryData,
  activeTab,
  setActiveTab,
  loading = false
}) => {
  if (loading) {
    return <SummaryContentSkeleton />;
  }

  const getActiveContent = () => {
    switch (activeTab) {
      case 'executive_summary':
        return summaryData.executive_summary || 'No executive summary available.';
      case 'key_developments':
        return summaryData.key_developments || 'No key developments available.';
      case 'industry_impact':
        return summaryData.industry_impact || 'No industry impact analysis available.';
      case 'action_items':
        return summaryData.action_items || 'No action items available.';
      default:
        return summaryData.executive_summary || 'No summary content available.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-4 text-sm leading-relaxed whitespace-pre-line"
    >
      {getActiveContent()}
    </motion.div>
  );
};

const SummaryContentSkeleton = () => (
  <div className="mt-4 space-y-2">
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-3/4 h-4" />
  </div>
);
