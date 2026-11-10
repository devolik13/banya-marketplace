import { useCallback, useMemo, useRef, useEffect, useState } from 'react';

// Type definitions for performance utilities
export type MemoizedFunction<T extends (...args: any[]) => any> = T & { clear?: () => void };
export type DebouncedFunction<T extends (...args: any[]) => any> = T & { cancel: () => void };
export type ThrottledFunction<T extends (...args: any[]) => any> = T & { cancel: () => void };

export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  delta: number;
  entries: PerformanceEntry[];
  id: string;
}

export interface PerformanceMetrics {
  timestamp: number;
  url: string;
  userAgent: string;
  connectionType?: string;
  metrics: Record<string, number>;
}

export interface IntersectionObserverEntry extends globalThis.IntersectionObserverEntry {}
export interface IntersectionObserverOptions extends globalThis.IntersectionObserverInit {}

export interface LazyComponentProps {
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  children: React.ReactNode;
}

// 1. Memoization helpers for expensive computations
export const createMemoizer = <T extends (...args: any[]) => any>(
  fn: T,
  keyGenerator?: (...args: Parameters<T>) => string
): MemoizedFunction<T> => {
  const cache = new Map<string, ReturnType<T>>();
  
  const generateKey = keyGenerator || ((...args: Parameters<T>) => JSON.stringify(args));
  
  const memoizedFn = ((...args: Parameters<T>): ReturnType<T> => {
    const key = generateKey(...args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    // Limit cache size to prevent memory leaks
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  }) as MemoizedFunction<T>;
  
  memoizedFn.clear = () => cache.clear();
  
  return memoizedFn;
};

export const useMemoizedValue = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return useMemo(factory, deps);
};

export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

// 2. Function debouncing and throttling utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: NodeJS.Timeout;
  
  const debouncedFunction = ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as DebouncedFunction<T>;
  
  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };
  
  return debouncedFunction;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ThrottledFunction<T> => {
  let inThrottle: boolean;
  let timeoutId: NodeJS.Timeout;
  
  const throttledFunction = ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  }) as ThrottledFunction<T>;
  
  throttledFunction.cancel = () => {
    clearTimeout(timeoutId);
    inThrottle = false;
  };
  
  return throttledFunction;
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// 3. Image preloading functions for better UX
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (urls: string[]): Promise<HTMLImageElement[]> => {
  try {
    const promises = urls.map(preloadImage);
    return await Promise.all(promises);
  } catch (error) {
    console.warn('Failed to preload some images:', error);
    return [];
  }
};

export const useImagePreloader = (urls: string[]) => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState<HTMLImageElement[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (urls.length === 0) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    preloadImages(urls)
      .then((images) => {
        setLoaded(images);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [urls]);
  
  return { loading, loaded, error };
};

// 4. Lazy loading utilities for components
export const useLazyComponent = <T extends React.ComponentType<any>>(
  importFunction: () => Promise<{ default: T } | T>
) => {
  const [Component, setComponent] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const loadComponent = useCallback(async () => {
    if (Component) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const module = await importFunction();
      const ImportedComponent = 'default' in module ? module.default : module;
      setComponent(() => ImportedComponent);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load component'));
    } finally {
      setLoading(false);
    }
  }, [importFunction, Component]);
  
  return { Component, loading, error, loadComponent };
};

export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  fallback = <div className="animate-pulse bg-muted h-32 rounded-md" />,
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useIntersectionObserver(
    ref,
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold, rootMargin }
  );
  
  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};

// 5. Web Vitals tracking helpers
export const trackWebVitals = (onMetric: (metric: WebVitalsMetric) => void) => {
  if (typeof window === 'undefined') return;
  
  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        onMetric({
          name: 'LCP',
          value: entry.startTime,
          delta: entry.startTime,
          entries: [entry],
          id: generateId()
        });
      }
      
      if (entry.entryType === 'first-input') {
        const fid = entry as PerformanceEventTiming;
        onMetric({
          name: 'FID',
          value: fid.processingStart - fid.startTime,
          delta: fid.processingStart - fid.startTime,
          entries: [entry],
          id: generateId()
        });
      }
      
      if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
        const cls = entry as PerformanceEntry & { value: number };
        onMetric({
          name: 'CLS',
          value: cls.value,
          delta: cls.value,
          entries: [entry],
          id: generateId()
        });
      }
    }
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  
  return () => observer.disconnect();
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useWebVitals = (onMetric?: (metric: WebVitalsMetric) => void) => {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);
  
  useEffect(() => {
    const handleMetric = (metric: WebVitalsMetric) => {
      setMetrics(prev => [...prev, metric]);
      onMetric?.(metric);
    };
    
    const cleanup = trackWebVitals(handleMetric);
    return cleanup;
  }, [onMetric]);
  
  return metrics;
};

// 6. Memory leak prevention utilities
export const createCleanupTracker = () => {
  const cleanupFunctions: (() => void)[] = [];
  
  const addCleanup = (cleanup: () => void) => {
    cleanupFunctions.push(cleanup);
  };
  
  const cleanup = () => {
    cleanupFunctions.forEach(fn => {
      try {
        fn();
      } catch (error) {
        console.warn('Cleanup function failed:', error);
      }
    });
    cleanupFunctions.length = 0;
  };
  
  return { addCleanup, cleanup };
};

export const useCleanup = (cleanup: () => void, deps: React.DependencyList = []) => {
  useEffect(() => {
    return cleanup;
  }, deps);
};

export const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: Element | Window | null,
  options?: boolean | AddEventListenerOptions
) => {
  const savedHandler = useRef<(event: WindowEventMap[K]) => void>();
  
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    const targetElement = element ?? window;
    if (!targetElement?.addEventListener) return;
    
    const eventListener: typeof handler = (event) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };
    
    targetElement.addEventListener(eventName, eventListener as EventListener, options);
    
    return () => {
      targetElement.removeEventListener(eventName, eventListener as EventListener, options);
    };
  }, [eventName, element, options]);
};

// 7. Intersection Observer helpers
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
  options?: IntersectionObserverOptions
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [callback, options]);
};

export const useInView = (
  options?: IntersectionObserverOptions
): [React.RefObject<HTMLDivElement>, boolean] => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useIntersectionObserver(
    ref,
    ([entry]) => {
      setInView(entry.isIntersecting);
    },
    options
  );
  
  return [ref, inView];
};

// 8. Performance monitoring functions
export const measurePerformance = <T extends (...args: any[]) => any>(
  name: string,
  fn: T
): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    console.log(`Performance [${name}]: ${end - start}ms`);
    
    if (performance.mark && performance.measure) {
      performance.mark(`${name}-start`);
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    }
    
    return result;
  }) as T;
};

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  
  const recordMetric = useCallback((name: string, value: number) => {
    const metric: PerformanceMetrics = {
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      connectionType: typeof navigator !== 'undefined' && 'connection' in navigator 
        ? (navigator.connection as any)?.effectiveType 
        : undefined,
      metrics: { [name]: value }
    };
    
    setMetrics(prev => [...prev.slice(-99), metric]); // Keep last 100 metrics
  }, []);
  
  const measureAsync = useCallback(async <T>(
    name: string,
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    const start = performance.now();
    try {
      const result = await asyncFn();
      const duration = performance.now() - start;
      recordMetric(name, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      recordMetric(`${name}-error`, duration);
      throw error;
    }
  }, [recordMetric]);
  
  const clearMetrics = useCallback(() => {
    setMetrics([]);
  }, []);
  
  return { metrics, recordMetric, measureAsync, clearMetrics };
};

export const createPerformanceTracker = () => {
  const metrics = new Map<string, number[]>();
  
  const track = (name: string, value: number) => {
    if (!metrics.has(name)) {
      metrics.set(name, []);
    }
    const values = metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements per metric
    if (values.length > 100) {
      values.shift();
    }
  };
  
  const getStats = (name: string) => {
    const values = metrics.get(name) || [];
    if (values.length === 0) return null;
    
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
    
    return { count: values.length, avg, min, max, median };
  };
  
  const getAllStats = () => {
    const stats: Record<string, ReturnType<typeof getStats>> = {};
    for (const [name] of metrics) {
      stats[name] = getStats(name);
    }
    return stats;
  };
  
  return { track, getStats, getAllStats };
};