
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DailySummaryData } from '@/types/daily-summary';

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
  if (loading) {
    return (
      <div className="animate-pulse space-y-4 mt-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  const summaryContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="prose max-w-none">
            <h3 className="font-semibold">Executive Summary</h3>
            <div dangerouslySetInnerHTML={{ __html: summaryData.summary || '' }} />
          </div>
        );
        
      case 'developments':
        return (
          <div className="prose max-w-none">
            <h3 className="font-semibold">Key Developments</h3>
            <div dangerouslySetInnerHTML={{ __html: summaryData.key_points || '' }} />
          </div>
        );
        
      case 'impacts':
        return (
          <div className="prose max-w-none">
            <h3 className="font-semibold">Industry Impacts</h3>
            <div dangerouslySetInnerHTML={{ __html: summaryData.industry_impacts || '' }} />
          </div>
        );
        
      case 'actions':
        return (
          <div className="prose max-w-none">
            <h3 className="font-semibold">Recommended Actions</h3>
            <div dangerouslySetInnerHTML={{ __html: summaryData.action_recommendations || '' }} />
          </div>
        );
        
      default:
        return (
          <div className="prose max-w-none">
            <h3 className="font-semibold">Executive Summary</h3>
            <div dangerouslySetInnerHTML={{ __html: summaryData.summary || '' }} />
          </div>
        );
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <nav className="flex space-x-4 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
              activeTab === 'summary' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('developments')}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
              activeTab === 'developments' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Key Developments
          </button>
          <button
            onClick={() => setActiveTab('impacts')}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
              activeTab === 'impacts' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Industry Impacts
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
              activeTab === 'actions' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Recommended Actions
          </button>
        </nav>
        
        {summaryContent()}
      </CardContent>
    </Card>
  );
};
