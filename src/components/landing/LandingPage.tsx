
import { lazy, Suspense, memo, useEffect, useState } from 'react';
import { LoadingFallback } from './sections/LoadingFallback';
import Footer from '@/components/Footer';
import { useViewportLoading } from '@/hooks/useViewportLoading';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { ErrorBoundary } from 'react-error-boundary';
import { HeroSection } from './sections/HeroSection';
import { Waves } from '@/components/ui/waves-background';

// Preload critical sections
const VideoSection = lazy(() => import('./sections/VideoSection').then(m => ({ 
  default: memo(m.VideoSection) 
})));
const WhyChooseSection = lazy(() => import('./sections/WhyChooseSection').then(m => ({ 
  default: memo(m.WhyChooseSection) 
})));
const FeaturesSection = lazy(() => import('./sections/FeaturesSection').then(m => ({ 
  default: memo(m.FeaturesSection) 
})));
const TechStackSection = lazy(() => import('./sections/TechStackSection').then(m => ({ 
  default: memo(m.TechStackSection) 
})));
const GettingStartedSection = lazy(() => import('./sections/GettingStartedSection').then(m => ({ 
  default: memo(m.GettingStartedSection) 
})));
const PricingSection = lazy(() => import('./sections/PricingSection').then(m => ({ 
  default: memo(m.PricingSection) 
})));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection').then(m => ({ 
  default: memo(m.TestimonialsSection) 
})));
const CallToActionSection = lazy(() => import('./sections/CallToActionSection').then(m => ({ 
  default: memo(m.CallToActionSection) 
})));
const ScrollNav = lazy(() => import('@/components/ui/scroll-nav.tsx').then(m => ({ 
  default: memo(m.ScrollNav) 
})));

const LandingPage = () => {
  usePerformanceMetrics();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Preload the critical components as soon as the hero is rendered
  const video = useViewportLoading({ threshold: 0.05 });
  const whyChoose = useViewportLoading({ threshold: 0.05 });
  const features = useViewportLoading({ threshold: 0.05 });
  const techStack = useViewportLoading({ threshold: 0.05 });
  const gettingStarted = useViewportLoading({ threshold: 0.05 });
  const pricing = useViewportLoading({ threshold: 0.05 });
  const testimonials = useViewportLoading({ threshold: 0.05 });
  const cta = useViewportLoading({ threshold: 0.05 });

  console.log('[LandingPage] Rendering landing page with enhanced hero section');

  // Preload all main sections eagerly but staggered
  useEffect(() => {
    const preloadComponents = async () => {
      // Start preloading important components right away
      const imports = [
        import('./sections/VideoSection'),
        import('./sections/WhyChooseSection')
      ];
      
      try {
        await Promise.all(imports);
        
        // Staggered loading for other components
        setTimeout(async () => {
          await import('./sections/FeaturesSection');
          await import('./sections/TechStackSection');
        }, 100);
        
        setTimeout(async () => {
          await import('./sections/GettingStartedSection');
          await import('./sections/PricingSection');
        }, 200);
        
        setTimeout(async () => {
          await import('./sections/TestimonialsSection');
          await import('./sections/CallToActionSection');
        }, 300);
        
        setIsPageLoaded(true);
      } catch (err) {
        console.error('[LandingPage] Error preloading components:', err);
      }
    };

    preloadComponents();
    window.dispatchEvent(new Event('resize'));
    
    // Preconnect to important domains
    const linkRels = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://fzuwsjxjymwcjsbpwfsl.supabase.co' },
      { rel: 'preconnect', href: 'https://fzuwsjxjymwcjsbpwfsl.supabase.co', crossOrigin: 'anonymous' }
    ];
    
    linkRels.forEach(linkRel => {
      const link = document.createElement('link');
      link.rel = linkRel.rel;
      link.href = linkRel.href;
      if (linkRel.crossOrigin) {
        link.crossOrigin = linkRel.crossOrigin;
      }
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-b from-black via-siso-bg to-black">
      {/* DNS Prefetch and preconnect already handled in useEffect */}
      
      <div className="fixed inset-0 z-0 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationDuration: '1.5s', animationFillMode: 'forwards', transform: 'translateZ(0)', willChange: 'opacity' }}>
        <Waves 
          lineColor="rgba(255, 87, 34, 0.12)"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={25}
          waveAmpY={15}
          friction={0.97}
          tension={0.01}
          maxCursorMove={80}
          xGap={60}
          yGap={90}
          className="fixed inset-0 pointer-events-none"
        />
      </div>
      
      <ErrorBoundary 
        fallback={<LoadingFallback error={new Error()} />}
        onError={(error) => console.error('[LandingPage] Error in ScrollNav:', error)}
      >
        <Suspense fallback={null}>
          <ScrollNav />
        </Suspense>
      </ErrorBoundary>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <div className="absolute top-1/4 -left-1/4 w-[300px] md:w-[700px] h-[300px] md:h-[700px] 
          bg-siso-red/10 rounded-full filter blur-[100px] md:blur-[140px] 
          animate-float-slow transform-gpu will-change-transform"
        />
        <div className="absolute bottom-1/4 -right-1/4 w-[300px] md:w-[700px] h-[300px] md:h-[700px] 
          bg-siso-orange/10 rounded-full filter blur-[100px] md:blur-[140px] 
          animate-float-slower transform-gpu will-change-transform"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[400px] md:w-[1200px] h-[400px] md:h-[1200px] 
          bg-siso-red/5 rounded-full filter blur-[120px] md:blur-[180px] transform-gpu will-change-transform"
        />
      </div>

      <div className="relative z-10 w-full mx-auto space-y-12 md:space-y-24">
        <ErrorBoundary
          fallback={<LoadingFallback error={new Error()} />}
          onError={(error) => console.error('[LandingPage] Error in HeroSection:', error)}
        >
          <HeroSection />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<LoadingFallback error={new Error()} />}
          onError={(error) => console.error('[LandingPage] Error in VideoSection:', error)}
        >
          <section id="video" ref={video.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(video.isVisible || video.isLoaded || isPageLoaded) && <VideoSection />}
            </Suspense>
          </section>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<LoadingFallback error={new Error()} />}
          onError={(error) => console.error('[LandingPage] Error in other sections:', error)}
        >
          <section id="why-choose" ref={whyChoose.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(whyChoose.isVisible || whyChoose.isLoaded || isPageLoaded) && <WhyChooseSection />}
            </Suspense>
          </section>

          <section id="features" ref={features.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(features.isVisible || features.isLoaded || isPageLoaded) && <FeaturesSection />}
            </Suspense>
          </section>
          
          <section id="tech-stack" ref={techStack.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(techStack.isVisible || techStack.isLoaded || isPageLoaded) && <TechStackSection />}
            </Suspense>
          </section>

          <section id="getting-started" ref={gettingStarted.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(gettingStarted.isVisible || gettingStarted.isLoaded || isPageLoaded) && <GettingStartedSection />}
            </Suspense>
          </section>

          <section id="pricing" ref={pricing.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(pricing.isVisible || pricing.isLoaded || isPageLoaded) && <PricingSection />}
            </Suspense>
          </section>

          <section id="testimonials" ref={testimonials.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(testimonials.isVisible || testimonials.isLoaded || isPageLoaded) && <TestimonialsSection />}
            </Suspense>
          </section>

          <section id="cta" ref={cta.elementRef} className="transform-gpu will-change-opacity">
            <Suspense fallback={<LoadingFallback />}>
              {(cta.isVisible || cta.isLoaded || isPageLoaded) && <CallToActionSection />}
            </Suspense>
          </section>
        </ErrorBoundary>

        <Footer />
      </div>
    </div>
  );
};

export default memo(LandingPage);
