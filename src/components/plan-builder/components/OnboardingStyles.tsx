
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

      @keyframes fadeSlideUp {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes titleTransition {
        0% {
          opacity: 0;
          transform: translateY(-30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes subtleFloat {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      .hero-title-container {
        height: 70px;
        position: relative;
        width: 100%;
        margin: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
      
      .hero-title {
        width: 100%;
        text-align: center;
      }
      
      .hero-content > * {
        opacity: 0;
        animation: fadeSlideUp 0.6s ease-out forwards;
      }
      
      .hero-content > *:nth-child(1) {
        animation-delay: 0.2s;
      }
      
      .hero-content > *:nth-child(2) {
        animation-delay: 0.6s;
      }
      
      .hero-action-buttons {
        opacity: 0;
        animation: fadeSlideUp 0.8s ease-out 1s forwards;
      }
      
      @media (max-width: 768px) {
        .hero-title-container {
          height: 60px;
        }
      }
    `}} />
  );
}
