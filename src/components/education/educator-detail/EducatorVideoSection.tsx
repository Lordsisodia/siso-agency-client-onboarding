import React from 'react';
import { useEducatorVideos } from '@/hooks/use-education-queries';
import { VideoGrid } from '../video-library/VideoGrid';
import { VideoPagination } from '../video-library/VideoPagination';
import { Skeleton } from '@/components/ui/skeleton';
import { usePagination } from '@/hooks/use-pagination';

interface EducatorVideoSectionProps {
  educatorId: string;
  featuredVideos?: any[];
}

export const EducatorVideoSection: React.FC<EducatorVideoSectionProps> = ({
  educatorId,
  featuredVideos = []
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: videos, isLoading } = useEducatorVideos(educatorId, currentPage);

  // Calculate pagination values using the usePagination hook
  const totalPages = Math.ceil((videos?.length || 0) / 12);
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 5
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  // Display featured videos if available, otherwise show all videos
  const displayVideos = featuredVideos?.length > 0 ? featuredVideos : videos;

  return (
    <div className="space-y-6">
      {featuredVideos?.length > 0 && (
        <h3 className="text-2xl font-semibold">Featured Videos</h3>
      )}
      <VideoGrid 
        videos={displayVideos || []} 
        featuredVideos={featuredVideos || []}
        isLoading={isLoading} 
      />
      {!featuredVideos?.length && videos?.length > 0 && (
        <VideoPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          pages={pages}
          showLeftEllipsis={showLeftEllipsis}
          showRightEllipsis={showRightEllipsis}
        />
      )}
    </div>
  );
};