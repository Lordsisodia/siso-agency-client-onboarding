
import React from 'react';

export function OnboardingStyles() {
  return (
    <style jsx global>{`
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
      
      .progress-indicator {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      
      .progress-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        flex: 1;
      }
      
      .progress-step:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 14px;
        left: calc(50% + 15px);
        width: calc(100% - 30px);
        height: 2px;
        background-color: rgba(var(--muted), 0.3);
        z-index: -1;
      }
      
      .progress-step.active:not(:last-child)::after,
      .progress-step.completed:not(:last-child)::after {
        background: linear-gradient(to right, #FF5722, #FFA000);
      }
      
      .step-circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(var(--muted), 0.2);
        color: var(--muted-foreground);
        font-size: 14px;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
      }
      
      .active .step-circle {
        background: linear-gradient(135deg, #FF5722, #FFA000);
        color: white;
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(255, 87, 34, 0.4);
      }
      
      .completed .step-circle {
        background: linear-gradient(135deg, #FF5722, #FFA000);
        color: white;
      }
      
      .step-label {
        font-size: 12px;
        color: var(--muted-foreground);
        transition: all 0.3s ease;
      }
      
      .active .step-label,
      .completed .step-label {
        color: var(--foreground);
        font-weight: 500;
      }
      
      /* For the features container */
      .features-container::-webkit-scrollbar {
        width: 6px;
      }
      
      .features-container::-webkit-scrollbar-track {
        background: rgba(var(--muted), 0.1);
        border-radius: 10px;
      }
      
      .features-container::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #FF5722, #FFA000);
        border-radius: 10px;
      }
    `}</style>
  );
}
