
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DailySummaryData } from '@/types/daily-summary';

interface SummaryContentProps {
  data: DailySummaryData;
}

export const SummaryContent: React.FC<SummaryContentProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">No summary available for this date.</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
        <TabsTrigger value="impact">Industry Impact</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="space-y-4">
        <h3 className="text-xl font-semibold">Executive Summary</h3>
        <p className="text-muted-foreground whitespace-pre-line">{data.executive_summary || data.summary}</p>
      </TabsContent>

      <TabsContent value="keyPoints" className="space-y-4">
        <h3 className="text-xl font-semibold">Key Developments</h3>
        <ul className="list-disc list-inside space-y-2">
          {(data.key_developments || data.key_points).map((point, index) => (
            <li key={index} className="text-muted-foreground">{point}</li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="impact" className="space-y-4">
        <h3 className="text-xl font-semibold">Industry Impact</h3>
        {data.industry_impact || data.industry_impacts ? (
          <div className="space-y-4">
            {Object.entries(data.industry_impact || data.industry_impacts).map(([industry, impact], index) => (
              <div key={index} className="bg-card/50 p-4 rounded-lg border border-border">
                <h4 className="font-medium mb-2">{industry}</h4>
                <p className="text-sm text-muted-foreground">{impact as string}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No industry impact data available.</p>
        )}
      </TabsContent>

      <TabsContent value="applications" className="space-y-4">
        <h3 className="text-xl font-semibold">Practical Applications</h3>
        <ul className="list-disc list-inside space-y-2">
          {(data.action_items || data.practical_applications).map((application, index) => (
            <li key={index} className="text-muted-foreground">{application}</li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
};
