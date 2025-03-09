
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, PlayCircle, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const formatViewCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const RelatedVideos = ({ currentVideoId }: { currentVideoId: string }) => {
  const navigate = useNavigate();

  const { data: videos, isLoading, error } = useQuery({
    queryKey: ['relatedVideos', currentVideoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('id, title, duration, thumbnail_url, channel_id, viewcount')
        .neq('id', currentVideoId)
        .limit(4);
      
      if (error) throw error;
      return data;
    }
  });

  const handleVideoClick = (id: string) => {
    navigate(`/video/${id}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-siso-text-bold mb-4">Related Videos</h3>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="flex gap-3">
              <Skeleton className="w-32 h-20 rounded-l-md" />
              <div className="py-2 pr-2 flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !videos) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Failed to load related videos</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-siso-text-bold mb-4">Related Videos</h3>
      {videos.length === 0 ? (
        <p className="text-sm text-siso-text/70 text-center py-4">No related videos found</p>
      ) : (
        videos.map((video) => (
          <Card key={video.id} className="overflow-hidden cursor-pointer hover:bg-siso-bg/30 transition-colors">
            <div className="flex" onClick={() => handleVideoClick(video.id)}>
              <div className="relative w-32 h-20 bg-black">
                <img 
                  src={video.thumbnail_url} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-white/80 opacity-80 group-hover:opacity-100" />
                </div>
              </div>
              <div className="p-3 flex-1">
                <h4 className="text-sm font-medium text-siso-text-bold line-clamp-2 mb-1">{video.title}</h4>
                <div className="flex items-center text-xs text-siso-text/60 gap-3">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{video.duration}</span>
                  </div>
                  {video.viewcount && (
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{formatViewCount(video.viewcount)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
      
      <div className="text-center pt-2">
        <Button variant="outline" size="sm" className="text-xs">
          View More Videos
        </Button>
      </div>
    </div>
  );
};
