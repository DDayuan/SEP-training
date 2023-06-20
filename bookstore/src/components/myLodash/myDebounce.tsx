import { useRef, useCallback } from 'react';

function useDebounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    const debouncedFunc = useCallback((...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, wait);
    }, [func, wait]);
  
    return debouncedFunc as T;
  }

export default useDebounce;