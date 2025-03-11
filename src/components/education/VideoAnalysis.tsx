
import React from 'react';

interface VideoAnalysisProps {
  videoId: string;
}

const VideoAnalysis = ({ videoId }: VideoAnalysisProps) => {
  return (
    <div className="p-4 bg-black/20 rounded-xl backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-2">Video Analysis</h3>
      <p className="text-sm text-gray-300">
        Analysis for this video is not available yet.
      </p>
    </div>
  );
};

export default VideoAnalysis;
