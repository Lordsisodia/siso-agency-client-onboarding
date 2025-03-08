
import React from 'react';
import { useEducatorsList } from '@/hooks/education';
import { EducatorCard } from '../EducatorCard';
import { LearningProgress } from './LearningProgress';
import { Skeleton } from '@/components/ui/skeleton';

export const LearningContent = () => {
  const { educators, loading } = useEducatorsList();

  if (loading) {
    return (
      <div className="space-y-8">
        <LearningProgress />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <LearningProgress />
      
      <h2 className="text-2xl font-bold text-white">Top Educators</h2>
      
      {educators && educators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educators.map((educator) => (
            <EducatorCard key={educator.id} educator={educator} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-800/30 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-gray-200">No educators found</h3>
          <p className="text-gray-400 mt-2">Check back later for educational content.</p>
        </div>
      )}
    </div>
  );
};
