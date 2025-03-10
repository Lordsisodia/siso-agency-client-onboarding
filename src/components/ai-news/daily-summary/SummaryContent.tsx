
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ExternalLinkIcon } from 'lucide-react';
import { DailySummaryData } from '@/types/daily-summary';

interface SummaryContentProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  summaryData: DailySummaryData | null;
}

export const SummaryContent: React.FC<SummaryContentProps> = ({
  activeTab,
  setActiveTab,
  summaryData
}) => {
  if (!summaryData) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>No summary data available for the selected date.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'key-insights':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            {summaryData.key_points && summaryData.key_points.length > 0 ? (
              <ul className="space-y-3">
                {summaryData.key_points.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p>{point}</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No key insights available.</p>
            )}
          </motion.div>
        );
        
      case 'applications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Practical Applications</h3>
            {summaryData.practical_applications && summaryData.practical_applications.length > 0 ? (
              <div className="space-y-4">
                {summaryData.practical_applications.map((app, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="bg-card/30 p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <p>{app}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No practical applications available.</p>
            )}
          </motion.div>
        );
        
      case 'industry-impact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Industry Impact</h3>
            {summaryData.industry_impacts && Object.keys(summaryData.industry_impacts).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(summaryData.industry_impacts).map(([industry, impact], index) => (
                  <motion.div
                    key={industry}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    className="bg-card/30 p-4 rounded-lg border border-border"
                  >
                    <div className="mb-2">
                      <Badge variant="outline" className="bg-primary/10">
                        {industry}
                      </Badge>
                    </div>
                    <p className="text-sm">{String(impact)}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No industry impact data available.</p>
            )}
          </motion.div>
        );
        
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-4">Daily Summary</h3>
              <div className="whitespace-pre-wrap">{summaryData.summary}</div>
              
              {summaryData.generated_with && (
                <div className="mt-6 text-xs text-muted-foreground">
                  <p>Generated with {summaryData.generated_with}</p>
                </div>
              )}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">
          AI Daily Summary
        </h2>
        
        <div className="bg-card/30 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'summary'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('key-insights')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'key-insights'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Key Insights
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'applications'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('industry-impact')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'industry-impact'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Industry
          </button>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};
