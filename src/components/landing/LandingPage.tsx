
import { lazy, Suspense, memo, useEffect } from 'react';
import { LoadingFallback } from './sections/LoadingFallback';
import Footer from '@/components/Footer';
import { useViewportLoading } from '@/hooks/useViewportLoading';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { ErrorBoundary } from 'react-error-boundary';
import { HeroSection } from './sections/HeroSection';
import { Waves } from '@/components/ui/waves-background';

// [Analysis] Only lazy load non-critical sections
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
  // Initialize performance monitoring
  usePerformanceMetrics();

  // Setup viewport loading for each section
  const whyChoose = useViewportLoading({ threshold: 0.1 });
  const features = useViewportLoading({ threshold: 0.1 });
  const techStack = useViewportLoading({ threshold: 0.1 });
  const gettingStarted = useViewportLoading({ threshold: 0.1 });
  const pricing = useViewportLoading({ threshold: 0.1 });
  const testimonials = useViewportLoading({ threshold: 0.1 });
  const cta = useViewportLoading({ threshold: 0.1 });

  console.log('[LandingPage] Rendering landing page with updated sections'); // Updated debug log

  // Force a re-render on initial load
  useEffect(() => {
    console.log('[LandingPage] Mounted with all sections');
    // Force layout recalculation
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-siso-bg to-black overflow-x-hidden">
      {/* DNS prefetch and preconnect optimizations */}
      <link rel="dns-prefetch" href="https://fzuwsjxjymwcjsbpwfsl.supabase.co" />
      <link rel="preconnect" href="https://fzuwsjxjymwcjsbpwfsl.supabase.co" crossOrigin="anonymous" />
      
      {/* Global wave background that covers the entire page */}
      <div className="fixed inset-0 z-0 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationDuration: '1.5s', animationFillMode: 'forwards' }}>
        <Waves 
          lineColor="rgba(255, 87, 34, 0.3)" // Increased opacity for better visibility
          backgroundColor="transparent"
          waveSpeedX={0.04} // Increased speed
          waveSpeedY={0.03} // Increased speed
          waveAmpX={70} // Increased amplitude
          waveAmpY={50} // Increased amplitude 
          friction={0.92}
          tension={0.01}
          maxCursorMove={150}
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
      
      {/* Optimized background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[250px] md:w-[600px] h-[250px] md:h-[600px] 
          bg-siso-red/15 rounded-full filter blur-[80px] md:blur-[120px] 
          animate-float-slow transform-gpu will-change-transform"
        />
        <div className="absolute bottom-1/4 -right-1/4 w-[250px] md:w-[600px] h-[250px] md:h-[600px] 
          bg-siso-orange/15 rounded-full filter blur-[80px] md:blur-[120px] 
          animate-float-slower transform-gpu will-change-transform"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[350px] md:w-[1000px] h-[350px] md:h-[1000px] 
          bg-siso-red/8 rounded-full filter blur-[100px] md:blur-[150px] transform-gpu will-change-transform"
        />
      </div>

      {/* Progressive section loading */}
      <div className="relative z-10 px-4 md:px-0 space-y-12 md:space-y-24">
        <ErrorBoundary
          fallback={<LoadingFallback error={new Error()} />}
          onError={(error) => console.error('[LandingPage] Error in HeroSection:', error)}
        >
          <HeroSection />
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
