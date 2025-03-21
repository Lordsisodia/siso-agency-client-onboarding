import { lazy, Suspense, memo, useEffect } from 'react';
import { LoadingFallback } from './sections/LoadingFallback';
import Footer from '@/components/Footer';
import { useViewportLoading } from '@/hooks/useViewportLoading';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { ErrorBoundary } from 'react-error-boundary';
import { HeroSection } from './sections/HeroSection';
import { Waves } from '@/components/ui/waves-background';

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

  const video = useViewportLoading({ threshold: 0.1 });
  const whyChoose = useViewportLoading({ threshold: 0.1 });
  const features = useViewportLoading({ threshold: 0.1 });
  const techStack = useViewportLoading({ threshold: 0.1 });
  const gettingStarted = useViewportLoading({ threshold: 0.1 });
  const pricing = useViewportLoading({ threshold: 0.1 });
  const testimonials = useViewportLoading({ threshold: 0.1 });
  const cta = useViewportLoading({ threshold: 0.1 });

  console.log('[LandingPage] Rendering landing page with enhanced hero section');

  useEffect(() => {
    console.log('[LandingPage] Mounted with all sections');
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-siso-bg to-black overflow-x-hidden">
      <link rel="dns-prefetch" href="https://fzuwsjxjymwcjsbpwfsl.supabase.co" />
      <link rel="preconnect" href="https://fzuwsjxjymwcjsbpwfsl.supabase.co" crossOrigin="anonymous" />
      
      <div className="fixed inset-0 z-0 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationDuration: '1.5s', animationFillMode: 'forwards' }}>
        <Waves 
          lineColor="rgba(255, 87, 34, 0.35)"
          backgroundColor="transparent"
          waveSpeedX={0.05}
          waveSpeedY={0.04}
          waveAmpX={90}
          waveAmpY={70}
          friction={0.94}
          tension={0.015}
          maxCursorMove={170}
          xGap={30}
          yGap={60}
          className="fixed inset-0 pointer-events-none"
        />
      </div>
      
      <ErrorBoundary 
        fallback={<LoadingFallback error={new Error()} />}
        onError={(error) => console.error('[LandingPage] Error in ScrollNav:', error)}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ScrollNav />
        </Suspense>
      </ErrorBoundary>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[300px] md:w-[700px] h-[300px] md:h-[700px] 
          bg-siso-red/20 rounded-full filter blur-[100px] md:blur-[140px] 
          animate-float-slow transform-gpu will-change-transform"
        />
        <div className="absolute bottom-1/4 -right-1/4 w-[300px] md:w-[700px] h-[300px] md:h-[700px] 
          bg-siso-orange/20 rounded-full filter blur-[100px] md:blur-[140px] 
          animate-float-slower transform-gpu will-change-transform"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[400px] md:w-[1200px] h-[400px] md:h-[1200px] 
          bg-siso-red/10 rounded-full filter blur-[120px] md:blur-[180px] transform-gpu will-change-transform"
        />
      </div>

      <div className="relative z-10 px-4 md:px-0 space-y-12 md:space-y-24">
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
          <section id="video" ref={video.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(video.isVisible || video.isLoaded) && <VideoSection />}
            </Suspense>
          </section>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<LoadingFallback error={new Error()} />}
          onError={(error) => console.error('[LandingPage] Error in other sections:', error)}
        >
          <section id="why-choose" ref={whyChoose.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(whyChoose.isVisible || whyChoose.isLoaded) && <WhyChooseSection />}
            </Suspense>
          </section>

          <section id="features" ref={features.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(features.isVisible || features.isLoaded) && <FeaturesSection />}
            </Suspense>
          </section>
          
          <section id="tech-stack" ref={techStack.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(techStack.isVisible || techStack.isLoaded) && <TechStackSection />}
            </Suspense>
          </section>

          <section id="getting-started" ref={gettingStarted.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(gettingStarted.isVisible || gettingStarted.isLoaded) && <GettingStartedSection />}
            </Suspense>
          </section>

          <section id="pricing" ref={pricing.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(pricing.isVisible || pricing.isLoaded) && <PricingSection />}
            </Suspense>
          </section>

          <section id="testimonials" ref={testimonials.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(testimonials.isVisible || testimonials.isLoaded) && <TestimonialsSection />}
            </Suspense>
          </section>

          <section id="cta" ref={cta.elementRef}>
            <Suspense fallback={<LoadingFallback />}>
              {(cta.isVisible || cta.isLoaded) && <CallToActionSection />}
            </Suspense>
          </section>
        </ErrorBoundary>

        <Footer />
      </div>
    </div>
  );
};

export default memo(LandingPage);
