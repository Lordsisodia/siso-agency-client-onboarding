import React from 'react';
import { safeJsonArray } from '@/utils/json-helpers';
import { Json } from '@/integrations/supabase/types';

interface VideoSummaryProps {
  summary: string | null;
  key_points: Json | null;
}

interface VideoAnalysisProps {
  videoSummary: VideoSummaryProps | null;
}

export const VideoAnalysis = ({ videoSummary }) => {
  if (!videoSummary) {
    return <div className="p-4 text-center text-gray-500">No analysis available for this video.</div>;
  }

  // Safely parse key_points using our utility
  const keyPoints = safeJsonArray<{ title: string; content: string }>(videoSummary.key_points);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Video Analysis</h2>
      
      {videoSummary.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Summary</h3>
          <p className="text-gray-700">{videoSummary.summary}</p>
        </div>
      )}
      
      {keyPoints.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Key Points</h3>
          <div className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                {point.title && <h4 className="font-medium text-siso-accent">{point.title}</h4>}
                <p className="text-gray-700">{point.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
