
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';

export const LoadingState = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center">
          <div className="animate-pulse h-8 w-36 bg-siso-bg-alt/50 rounded mb-6"></div>
          <div className="animate-pulse h-4 w-64 bg-siso-bg-alt/40 rounded mb-8"></div>
          <div className="w-full max-w-4xl">
            <div className="animate-pulse h-24 bg-siso-bg-alt/30 rounded-lg mb-4"></div>
            <div className="animate-pulse h-24 bg-siso-bg-alt/30 rounded-lg mb-4"></div>
            <div className="animate-pulse h-24 bg-siso-bg-alt/30 rounded-lg"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
