
import React from 'react';
import { Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNetworkingResources } from '@/hooks/useNetworkingResources';

export const NetworkingHeader = () => {
  const { categoryStats, loading } = useNetworkingResources();
  
  const totalCommunities = !loading 
    ? categoryStats.reduce((sum, stat) => sum + stat.community_count, 0)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-siso-text-bold mb-2">Networking</h1>
          <p className="text-siso-text/70 max-w-xl">
            Connect with AI professionals, join communities, and expand your network
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-siso-text/50" />
            <Input
              placeholder="Search communities..."
              className="pl-10 bg-siso-bg-card border-siso-border w-full md:w-64"
            />
          </div>
          <Button size="sm" className="whitespace-nowrap">
            <Users className="h-4 w-4 mr-2" />
            Join New
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="bg-siso-bg-card/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-siso-border">
          <div className="text-xl font-semibold text-siso-text-bold">{totalCommunities}</div>
          <div className="text-xs text-siso-text/60">Communities</div>
        </div>
        
        {!loading && categoryStats.map((stat) => (
          <div key={stat.category} className="bg-siso-bg-card/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-siso-border/50">
            <div className="text-xl font-semibold text-siso-text-bold">{stat.community_count}</div>
            <div className="text-xs text-siso-text/60">{stat.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
