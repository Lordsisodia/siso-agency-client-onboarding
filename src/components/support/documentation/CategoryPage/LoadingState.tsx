
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { GradientText } from '@/components/ui/gradient-text';

export const LoadingState = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          <div className="w-full text-center mb-8">
            <GradientText 
              colors={["#9b87f5", "#D946EF", "#F97316"]} 
              className="text-4xl sm:text-5xl font-bold mb-3"
            >
              <div className="animate-pulse h-10 w-64 bg-siso-bg-alt/50 rounded-lg mx-auto"></div>
            </GradientText>
            <div className="animate-pulse h-4 w-96 bg-siso-bg-alt/40 rounded mx-auto mt-4"></div>
          </div>
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-siso-border rounded-lg overflow-hidden bg-siso-bg-alt/20 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="animate-pulse h-12 w-12 bg-siso-bg-alt/30 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="animate-pulse h-5 w-36 bg-siso-bg-alt/40 rounded mb-3"></div>
                      <div className="animate-pulse h-3 w-full bg-siso-bg-alt/30 rounded mb-2"></div>
                      <div className="animate-pulse h-3 w-5/6 bg-siso-bg-alt/30 rounded mb-4"></div>
                      <div className="animate-pulse h-4 w-24 bg-siso-bg-alt/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
