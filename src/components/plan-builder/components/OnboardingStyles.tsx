
import React from 'react';

export function OnboardingStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes sparkle {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        50% {
          opacity: 0.5;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
    `}} />
  );
}
