
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideIn, FadeIn } from '@/components/ui/animations';
import { Spotlight } from '@/components/ui/spotlight';
import { Hero } from '@/components/ui/animated-hero';

export const HeroSection = memo(() => {
  console.log('[HeroSection] Rendering enhanced hero section'); // Debug log
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Quickly mark the hero as ready to start animations
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 50);
    
    // Force a re-render to ensure animations play properly
    const resizeTimer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => {
      clearTimeout(readyTimer);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden transform-gpu">
      <div className="absolute inset-0 pointer-events-none">
        <Spotlight className="hidden md:block" size={800} />
      </div>
      
      <SlideIn 
        direction="up" 
        delay={0.1} 
        duration={0.5}
        className="relative z-10 flex items-center justify-center h-full pt-16 pb-12 md:pb-16 transform-gpu will-change-transform"
      >
        <Hero />
      </SlideIn>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
