
import { useEffect, RefObject } from 'react';

export interface UseAutoScrollOptions {
  dependencies: any[];
  targetRef: RefObject<HTMLElement>;
}

export function useAutoScroll({
  dependencies,
  targetRef
}: UseAutoScrollOptions) {
  useEffect(() => {
    if (targetRef?.current) {
      const scrollElement = targetRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, dependencies);
}
