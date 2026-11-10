import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

interface VirtualScrollOptions<T> {
  items: T[];
  itemHeight: number | ((index: number, item: T) => number);
  containerHeight: number;
  overscan?: number;
  scrollElement?: HTMLElement | null;
}

interface VirtualScrollReturn<T> {
  startIndex: number;
  endIndex: number;
  visibleItems: T[];
  totalHeight: number;
  scrollToIndex: (index: number) => void;
  scrollToTop: () => void;
  getItemOffset: (index: number) => number;
}

export const useVirtualScroll = <T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
  scrollElement
}: VirtualScrollOptions<T>): VirtualScrollReturn<T> => {
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeights = useRef<number[]>([]);
  const itemOffsets = useRef<number[]>([]);

  // Calculate item heights and offsets
  const calculateDimensions = useCallback(() => {
    if (items.length === 0) return;

    const heights: number[] = [];
    const offsets: number[] = [];
    let totalOffset = 0;

    for (let i = 0; i < items.length; i++) {
      const height = typeof itemHeight === 'function' 
        ? itemHeight(i, items[i])
        : itemHeight;
      
      heights[i] = height;
      offsets[i] = totalOffset;
      totalOffset += height;
    }

    itemHeights.current = heights;
    itemOffsets.current = offsets;
  }, [items, itemHeight]);

  // Calculate total height
  const totalHeight = useMemo(() => {
    if (items.length === 0) return 0;
    
    calculateDimensions();
    
    if (typeof itemHeight === 'number') {
      return items.length * itemHeight;
    }
    
    return itemOffsets.current[items.length - 1] + 
           (itemHeights.current[items.length - 1] || 0);
  }, [items.length, itemHeight, calculateDimensions]);

  // Binary search for finding start index
  const findStartIndex = useCallback((scrollTop: number): number => {
    if (items.length === 0) return 0;
    
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTop / itemHeight);
    }

    let start = 0;
    let end = items.length - 1;
    
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const offset = itemOffsets.current[mid] || 0;
      
      if (offset === scrollTop) return mid;
      if (offset < scrollTop) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    
    return Math.max(0, Math.min(end, items.length - 1));
  }, [items.length, itemHeight]);

  // Calculate visible range
  const { startIndex, endIndex } = useMemo(() => {
    if (items.length === 0 || containerHeight === 0) {
      return { startIndex: 0, endIndex: 0 };
    }

    const start = Math.max(0, findStartIndex(scrollTop) - overscan);
    
    let end = start;
    let accumulatedHeight = 0;
    
    if (typeof itemHeight === 'number') {
      const visibleCount = Math.ceil(containerHeight / itemHeight);
      end = Math.min(items.length - 1, start + visibleCount + overscan);
    } else {
      for (let i = start; i < items.length; i++) {
        const height = itemHeights.current[i] || 0;
        accumulatedHeight += height;
        
        if (accumulatedHeight >= containerHeight + (overscan * 50)) {
          end = i;
          break;
        }
        end = i;
      }
    }
    
    return {
      startIndex: start,
      endIndex: Math.min(end, items.length - 1)
    };
  }, [scrollTop, items.length, containerHeight, itemHeight, overscan, findStartIndex]);

  // Get visible items
  const visibleItems = useMemo(() => {
    if (items.length === 0) return [];
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  // Get item offset
  const getItemOffset = useCallback((index: number): number => {
    if (index < 0 || index >= items.length) return 0;
    
    if (typeof itemHeight === 'number') {
      return index * itemHeight;
    }
    
    return itemOffsets.current[index] || 0;
  }, [items.length, itemHeight]);

  // Scroll to index
  const scrollToIndex = useCallback((index: number) => {
    if (index < 0 || index >= items.length || !scrollElement) return;
    
    const offset = getItemOffset(index);
    scrollElement.scrollTop = offset;
  }, [items.length, scrollElement, getItemOffset]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    if (scrollElement) {
      scrollElement.scrollTop = 0;
    }
  }, [scrollElement]);

  // Handle scroll events
  useEffect(() => {
    const element = scrollElement || window;
    
    const handleScroll = () => {
      const newScrollTop = scrollElement 
        ? scrollElement.scrollTop 
        : window.pageYOffset || document.documentElement.scrollTop;
      
      setScrollTop(newScrollTop);
    };

    element.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [scrollElement]);

  // Recalculate on items change
  useEffect(() => {
    calculateDimensions();
  }, [calculateDimensions]);

  return {
    startIndex,
    endIndex,
    visibleItems,
    totalHeight,
    scrollToIndex,
    scrollToTop,
    getItemOffset
  };
};