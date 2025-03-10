
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DailySummaryData } from '@/types/daily-summary'; 
import { Skeleton } from '@/components/ui/skeleton';

export interface SummaryContentProps {
  summaryData: DailySummaryData;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
}

export const SummaryContent: React.FC<SummaryContentProps> = ({ 
  summaryData,
  activeTab,
  setActiveTab,
  loading = false
}) => {
  // Helper function to render tabs
  const renderTabs = () => {
    const tabs = [
      { id: 'summary', label: 'Summary' },
      { id: 'key-points', label: 'Key Points' },
      { id: 'impacts', label: 'Industry Impact' },
      { id: 'applications', label: 'Applications' }
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  // Render content based on active tab
  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>
      );
    }

    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-4">
            {summaryData.executive_summary || summaryData.summary ? (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {summaryData.executive_summary || summaryData.summary}
              </p>
            ) : (
              <p className="text-gray-500 italic">
                No summary available for this date.
              </p>
            )}
          </div>
        );
      
      case 'key-points':
        return (
          <div className="space-y-4">
            {summaryData.key_developments?.length > 0 || summaryData.key_points?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {(summaryData.key_developments || summaryData.key_points)?.map((point, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300">
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">
                No key points available for this date.
              </p>
            )}
          </div>
        );
      
      case 'impacts':
        return (
          <div className="space-y-4">
            {summaryData.industry_impacts && 
             Object.keys(summaryData.industry_impacts).length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(summaryData.industry_impacts).map(([industry, impact]) => (
                  <Card key={industry}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{industry}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {impact}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No industry impact data available for this date.
              </p>
            )}
          </div>
        );
      
      case 'applications':
        return (
          <div className="space-y-4">
            {summaryData.action_items?.length > 0 || summaryData.practical_applications?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {(summaryData.action_items || summaryData.practical_applications)?.map((item, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">
                No practical applications available for this date.
              </p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderTabs()}
      <div className="p-2">
        {renderContent()}
      </div>
    </div>
  );
};
