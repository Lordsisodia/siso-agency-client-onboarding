
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { useParams } from 'react-router-dom';

export default function Assistant() {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
          Assistant Details
        </h1>
        <p className="text-siso-text mb-8">
          Assistant ID: {id}
        </p>
        <div className="p-6 rounded-lg border border-siso-border bg-siso-bg-card">
          <h3 className="font-medium text-xl mb-2">Assistant Content</h3>
          <p className="text-siso-text-muted">This is a placeholder for the assistant details page</p>
        </div>
      </div>
    </MainLayout>
  );
}
