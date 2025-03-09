
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [video, setVideo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch video details from your API
        // For now, we'll just simulate a delay and set mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setVideo({
          id: id,
          title: "How to Build a Responsive Website",
          description: "Learn how to create beautiful, responsive websites that work on all devices using modern CSS and HTML techniques.",
          thumbnailUrl: "https://placehold.co/1280x720/333/white?text=Video+Thumbnail",
          publishedAt: "2023-05-15",
          duration: "15:30",
          views: 12500,
          creator: {
            name: "Web Dev Mastery",
            profileImage: "https://placehold.co/100/orange/white?text=WDM"
          }
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video details. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container px-4 py-8 mx-auto max-w-5xl">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[540px] w-full rounded-lg" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-3 mt-4">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container px-4 py-8 mx-auto max-w-5xl">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 py-8 mx-auto max-w-5xl">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        {video && (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="relative aspect-video bg-black/80 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-80"
              />
              <Button 
                className="absolute inset-0 m-auto h-16 w-16 rounded-full"
                size="icon"
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
            
            {/* Video Info */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <div className="flex items-center gap-2 text-siso-text/60 text-sm">
                <span>{video.views.toLocaleString()} views</span>
                <span>•</span>
                <span>{video.publishedAt}</span>
                <span>•</span>
                <span>{video.duration}</span>
              </div>
            </div>
            
            {/* Creator Info */}
            <div className="flex items-center gap-3 pb-4 border-b border-siso-border">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img 
                  src={video.creator.profileImage} 
                  alt={video.creator.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{video.creator.name}</h3>
              </div>
            </div>
            
            {/* Description */}
            <div className="pt-2">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-siso-text/80 whitespace-pre-line">
                {video.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
