
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@/components/ui/animated-hero';
import { Waves } from '@/components/ui/waves-background';

export const HeroSection = memo(() => {
  console.log('[HeroSection] Rendering hero section'); // Debug log
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Waves 
          lineColor="rgba(255, 87, 34, 0.15)"
          backgroundColor="transparent"
          waveSpeedX={0.015}
          waveSpeedY={0.010}
          waveAmpX={50}
          waveAmpY={30}
          friction={0.92}
          tension={0.01}
          maxCursorMove={150}
          xGap={25}
          yGap={50}
          className="absolute inset-0"
        />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full pt-16 pb-24">
        <Hero />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
