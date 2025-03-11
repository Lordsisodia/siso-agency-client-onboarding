
import React from 'react';
import { Card } from '@/components/ui/card';
import { NetworkingResource } from '@/types/dashboard';
import { useNetworkingResources } from '@/hooks/useNetworkingResources';
import { NetworkingResourceCard } from './NetworkingResourceCard';
import { Skeleton } from '@/components/ui/skeleton';

export const NetworkingGrid: React.FC = () => {
  const { resources, error, loading } = useNetworkingResources();

  // Render loading skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="p-6 h-64">
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="rounded-xl p-6 bg-red-50 border border-red-200 text-red-800">
        <h3 className="text-lg font-medium mb-2">Error Loading Resources</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <NetworkingResourceCard key={resource.id} resource={resource as NetworkingResource} />
      ))}
    </div>
  );
};
