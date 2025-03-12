
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';

export const LoadingState = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center">
          <div className="animate-pulse h-8 w-36 bg-siso-bg-alt/50 rounded"></div>
        </div>
      </div>
    </MainLayout>
  );
};
