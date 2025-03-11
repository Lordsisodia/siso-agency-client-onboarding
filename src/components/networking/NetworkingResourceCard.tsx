
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Users } from 'lucide-react';
import { NetworkingResource } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';

interface NetworkingResourceCardProps {
  resource: NetworkingResource;
}

export const NetworkingResourceCard: React.FC<NetworkingResourceCardProps> = ({ resource }) => {
  const handleJoin = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md border border-siso-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize font-normal">
            {resource.category}
          </Badge>
          {resource.platform && (
            <Badge variant="secondary" className="capitalize">
              {resource.platform}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl mt-3">{resource.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {resource.description && <p className="text-siso-text/80">{resource.description}</p>}
        
        {resource.member_count && (
          <div className="flex items-center mt-3 text-sm text-siso-text/70">
            <Users size={16} className="mr-1" />
            <span>{resource.member_count.toLocaleString()} members</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-siso-border/30 pt-3">
        {resource.join_url ? (
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => handleJoin(resource.join_url)}
          >
            <span>Join Community</span>
            <ExternalLink size={16} />
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
