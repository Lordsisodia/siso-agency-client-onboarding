
import React from 'react';

export function BackgroundSparkles() {
  const generateSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 4 + 1; // 1-5px
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 2 + 2; // 2-4s
      
      sparkles.push(
        <div 
          key={i}
          className="absolute rounded-full bg-siso-orange/20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            top: `${posY}%`,
            animation: `sparkle ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
      );
    }
    return sparkles;
  };

  return (
    <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
      {generateSparkles()}
    </div>
  );
}
