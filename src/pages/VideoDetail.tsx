
import React from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';

export default function VideoDetail() {
  const { videoId } = useParams();

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-siso-text">Video Details</h1>
          <p className="text-siso-text-muted mt-1">
            Video ID: {videoId}
          </p>
        </div>

        <div className="bg-siso-bg-card/20 backdrop-blur-md border border-siso-border rounded-xl p-6 shadow-xl">
          <div className="text-center p-8">
            <p className="text-siso-text-muted">
              This video content is currently unavailable or still loading.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
