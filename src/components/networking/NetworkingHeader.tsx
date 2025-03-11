
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useNetworkingResources } from '@/hooks/useNetworkingResources';
import { Skeleton } from '@/components/ui/skeleton';

export const NetworkingHeader: React.FC = () => {
  const { categories, loading } = useNetworkingResources();

  if (loading) {
    return (
      <div className="mb-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-siso-text-bold mb-2">Networking Resources</h1>
      <p className="text-siso-text/70">
        Connect with communities and resources to grow your network and knowledge
      </p>
      
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <Badge key={cat.category} variant="secondary" className="px-3 py-1">
              {cat.category} 
              <span className="ml-2 bg-siso-bg-card/50 px-1.5 py-0.5 rounded-full text-xs">
                {cat.community_count}
              </span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
