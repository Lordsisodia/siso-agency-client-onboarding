
import React from 'react';
import { DailySummaryData } from '@/types/daily-summary';

export interface SummaryContentProps {
  summaryData: DailySummaryData | null;
  loading?: boolean;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const SummaryContent: React.FC<SummaryContentProps> = ({
  summaryData,
  loading = false,
  activeTab,
  setActiveTab
}) => {
  if (loading) {
    return <div className="p-4 text-center">Loading summary data...</div>;
  }

  if (!summaryData) {
    return <div className="p-4 text-center">No summary data available.</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Executive Summary</h3>
            <p className="text-muted-foreground">{summaryData.executive_summary || summaryData.summary}</p>
          </div>
        );
      case 'key_developments':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Key Developments</h3>
            <ul className="list-disc pl-5 space-y-2">
              {(summaryData.key_developments || []).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        );
      case 'impact':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Industry Impact</h3>
            <div>{JSON.stringify(summaryData.industry_impacts || {}, null, 2)}</div>
          </div>
        );
      case 'action':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Action Items</h3>
            <ul className="list-disc pl-5 space-y-2">
              {(summaryData.action_items || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Summary</h3>
            <p className="text-muted-foreground">{summaryData.executive_summary || summaryData.summary}</p>
            
            {summaryData.key_points && summaryData.key_points.length > 0 && (
              <>
                <h3 className="text-lg font-medium mt-6">Key Points</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {summaryData.key_points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </>
            )}
            
            {summaryData.practical_applications && summaryData.practical_applications.length > 0 && (
              <>
                <h3 className="text-lg font-medium mt-6">Practical Applications</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {summaryData.practical_applications.map((app, index) => (
                    <li key={index}>{app}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-2 mb-4 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'summary' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'key_developments' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('key_developments')}
        >
          Key Developments
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'impact' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('impact')}
        >
          Impact
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'action' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('action')}
        >
          Action Items
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};
