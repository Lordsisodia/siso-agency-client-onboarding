
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideIn, FadeIn } from '@/components/ui/animations';
import { Spotlight } from '@/components/ui/spotlight';
import { EnhancedHero } from '@/components/ui/enhanced-hero';

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
      
      <SlideIn 
        direction="up" 
        delay={0.1} 
        duration={0.8}
        className="relative z-10 flex items-center justify-center h-full pt-16 pb-12 md:pb-16"
      >
        <EnhancedHero />
      </SlideIn>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
