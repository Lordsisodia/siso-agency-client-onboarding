
import { memo } from 'react';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';

export const VideoSection = memo(() => {
  console.log('[VideoSection] Rendering video section'); // Debug log

  // Replace this with your actual YouTube video ID
  const featuredVideoId = 'dQw4w9WgXcQ';

  return (
    <section id="video-demo" className="py-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-r from-siso-red/10 to-siso-orange/10 rounded-full filter blur-[80px] animate-float-slow" />
      </div>

      <ContainerScroll
        titleComponent={
          <div className="mb-6">
            <GradientHeading variant="sunset" size="lg" className="mb-4">
              See SISO In Action
            </GradientHeading>
            <p className="text-lg text-siso-text/80 max-w-3xl mx-auto">
              Watch how our platform transforms ideas into fully functional apps in record time
            </p>
          </div>
        }
      >
        <YouTubeEmbed videoId={featuredVideoId} />
      </ContainerScroll>
    </section>
  );
});

VideoSection.displayName = 'VideoSection';

export default VideoSection;
