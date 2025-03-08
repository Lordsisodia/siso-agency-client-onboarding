
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { LearningContent } from '@/components/education/learning/LearningContent';
import { SearchInput } from '@/components/education/layout/header/components/SearchInput';
import { useAuthSession } from '@/hooks/useAuthSession';

export default function SisoEducation() {
  const { session } = useAuthSession();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="p-6 rounded-xl border border-gray-700 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-siso-orange to-siso-red">
                  Education Center
                </h1>
                <p className="text-siso-text/70 mt-2">
                  Discover top educational content from the best creators in the industry
                </p>
              </div>
              
              <div className="w-full md:w-1/2 lg:w-1/3">
                <SearchInput />
              </div>
            </div>
          </div>
          
          <LearningContent />
        </div>
      </div>
    </MainLayout>
  );
}
