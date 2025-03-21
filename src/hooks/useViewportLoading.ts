
import { useEffect, useRef, useState } from 'react';

export const useViewportLoading = (options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Enable hardware acceleration on the element
    if (element.style) {
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'opacity';
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger state updates if the state actually changes
        if (entry.isIntersecting !== isVisible) {
          setIsVisible(entry.isIntersecting);
        }
        
        if (entry.isIntersecting && !isLoaded) {
          // Add a small delay to stagger loading and prevent CPU spikes
          requestAnimationFrame(() => {
            setIsLoaded(true);
          });
        }
      },
      {
        threshold: options.threshold,
        rootMargin: '500px 0px', // Increased from 300px to 500px for much earlier loading
      }
    );

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options.threshold, isLoaded, isVisible]);

  return { elementRef, isVisible, isLoaded };
};
