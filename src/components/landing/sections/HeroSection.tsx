
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideIn, FadeIn } from '@/components/ui/animations';
import { Spotlight } from '@/components/ui/spotlight';
import { EnhancedHero } from '@/components/ui/enhanced-hero';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { GradientHeading } from '@/components/ui/gradient-heading';

export const HeroSection = memo(() => {
  console.log('[HeroSection] Rendering enhanced hero section'); // Debug log
  const navigate = useNavigate();

  useEffect(() => {
    // Force a re-render to ensure animations play properly
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Spotlight className="hidden md:block" size={800} />
      </div>
      
      <div className="relative z-10 pt-16 pb-12 md:pb-0">
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              <GradientHeading variant="sunset" size="lg" className="text-center">
                <span className="text-siso-text-bold">Grow your agency with</span>
              </GradientHeading>
              <p className="text-lg text-siso-text/80 max-w-3xl mx-auto mt-4">
                From vision to MVP in record time with our AI-powered development platform
              </p>
            </div>
          }
        >
          <div className="w-full h-full flex items-center justify-center p-4">
            <EnhancedHero />
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
