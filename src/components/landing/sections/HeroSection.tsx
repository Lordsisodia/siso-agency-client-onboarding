
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@/components/ui/animated-hero';

export const HeroSection = memo(() => {
  console.log('[HeroSection] Rendering hero section'); // Debug log
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex items-center justify-center h-full pt-16 pb-24">
        <Hero />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
