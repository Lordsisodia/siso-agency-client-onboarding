
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';

export default function Assistants() {
  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
          AI Assistants
        </h1>
        <p className="text-siso-text mb-8">
          Choose from our collection of specialized AI assistants to help with your projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Assistant cards will be rendered here */}
          <div className="p-6 rounded-lg border border-siso-border bg-siso-bg-card">
            <h3 className="font-medium text-xl mb-2">Project Planning Assistant</h3>
            <p className="text-siso-text-muted">Helps you plan and organize your app projects</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
