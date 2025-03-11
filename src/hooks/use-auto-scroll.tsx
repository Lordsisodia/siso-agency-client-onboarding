
import { useEffect, RefObject } from 'react';

export interface UseAutoScrollOptions {
  dependencies: any[];
  behavior?: ScrollBehavior;
  targetRef: RefObject<HTMLElement>;
}

export function useAutoScroll({
  dependencies,
  behavior = 'smooth',
  targetRef
}: UseAutoScrollOptions) {
  useEffect(() => {
    if (targetRef?.current) {
      const scrollElement = targetRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, dependencies);
}
