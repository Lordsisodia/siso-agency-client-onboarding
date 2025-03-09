
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, ExternalLink } from 'lucide-react';
import { useNetworkingResources } from '@/hooks/useNetworkingResources';
import { NetworkingResource } from '@/types/dashboard';

export const NetworkingGrid = () => {
  const { resources, loading, error } = useNetworkingResources();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-4">
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 border-t flex justify-between items-center">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">Error loading networking resources</p>
        <p className="text-sm text-siso-text/70">{error}</p>
      </div>
    );
  }

  // Group by category
  const resourcesByCategory: Record<string, NetworkingResource[]> = {};
  resources.forEach((resource) => {
    if (!resourcesByCategory[resource.category]) {
      resourcesByCategory[resource.category] = [];
    }
    resourcesByCategory[resource.category].push(resource);
  });

  return (
    <div className="space-y-10 mt-8">
      {Object.entries(resourcesByCategory).map(([category, resources]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold text-siso-text-bold">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center gap-3">
                    {resource.profile_image_url ? (
                      <img 
                        src={resource.profile_image_url} 
                        alt={resource.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-siso-bg-card rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-siso-text" />
                      </div>
                    )}
                    <CardTitle className="text-base">{resource.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-siso-text/80 line-clamp-3">
                    {resource.description || "No description available"}
                  </p>
                </CardContent>
                <CardFooter className="p-4 border-t flex justify-between items-center">
                  <div className="text-xs text-siso-text/60">
                    {resource.member_count ? (
                      <span>{resource.member_count.toLocaleString()} members</span>
                    ) : (
                      <span>Community</span>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(resource.join_url, '_blank')}
                    className="text-xs"
                  >
                    Join
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
