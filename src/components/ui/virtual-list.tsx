"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChevronUp, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface VirtualScrollItem {
  id: string | number;
  height?: number;
  data: any;
}

interface VirtualListProps<T extends VirtualScrollItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number | ((item: T, index: number) => number);
  containerHeight: number;
  overscan?: number;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onScroll?: (scrollTop: number) => void;
  className?: string;
  scrollToIndex?: number;
  enableKeyboardNav?: boolean;
}

interface UseVirtualScrollOptions {
  itemCount: number;
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  overscan: number;
  scrollTop: number;
}

interface VirtualScrollResult {
  startIndex: number;
  endIndex: number;
  visibleItems: Array<{
    index: number;
    offsetTop: number;
    height: number;
  }>;
  totalHeight: number;
}

function useVirtualScroll({
  itemCount,
  itemHeight,
  containerHeight,
  overscan,
  scrollTop,
}: UseVirtualScrollOptions): VirtualScrollResult {
  return useMemo(() => {
    if (itemCount === 0) {
      return {
        startIndex: 0,
        endIndex: 0,
        visibleItems: [],
        totalHeight: 0,
      };
    }

    const getItemHeight = (index: number) => {
      return typeof itemHeight === "function" ? itemHeight(index) : itemHeight;
    };

    // Calculate total height and item positions
    const itemOffsets: number[] = [];
    let totalHeight = 0;
    
    for (let i = 0; i < itemCount; i++) {
      itemOffsets[i] = totalHeight;
      totalHeight += getItemHeight(i);
    }

    // Find start index
    let startIndex = 0;
    for (let i = 0; i < itemCount; i++) {
      if (itemOffsets[i] >= scrollTop) {
        startIndex = Math.max(0, i - 1);
        break;
      }
    }

    // Find end index
    let endIndex = startIndex;
    let currentOffset = itemOffsets[startIndex];
    
    while (currentOffset < scrollTop + containerHeight && endIndex < itemCount - 1) {
      endIndex++;
      currentOffset += getItemHeight(endIndex);
    }

    // Apply overscan
    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(itemCount - 1, endIndex + overscan);

    // Generate visible items
    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push({
        index: i,
        offsetTop: itemOffsets[i],
        height: getItemHeight(i),
      });
    }

    return {
      startIndex,
      endIndex,
      visibleItems,
      totalHeight,
    };
  }, [itemCount, itemHeight, containerHeight, overscan, scrollTop]);
}

export const VirtualList = <T extends VirtualScrollItem>({
  items,
  renderItem,
  itemHeight = 50,
  containerHeight,
  overscan = 5,
  loading = false,
  error,
  emptyMessage = "No items to display",
  onLoadMore,
  hasMore = false,
  onScroll,
  className = "",
  scrollToIndex,
  enableKeyboardNav = true,
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const getItemHeight = useCallback(
    (index: number) => {
      const item = items[index];
      if (!item) return typeof itemHeight === "function" ? 50 : itemHeight;
      
      if (typeof itemHeight === "function") {
        return itemHeight(item, index);
      }
      return item.height || itemHeight;
    },
    [items, itemHeight]
  );

  const virtualResult = useVirtualScroll({
    itemCount: items.length,
    itemHeight: getItemHeight,
    containerHeight,
    overscan,
    scrollTop,
  });

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const newScrollTop = e.currentTarget.scrollTop;
      setScrollTop(newScrollTop);
      onScroll?.(newScrollTop);

      // Load more when near bottom
      if (
        onLoadMore &&
        hasMore &&
        !loading &&
        newScrollTop + containerHeight >= virtualResult.totalHeight - 100
      ) {
        onLoadMore();
      }
    },
    [onScroll, onLoadMore, hasMore, loading, containerHeight, virtualResult.totalHeight]
  );

  // Scroll to specific index
  useEffect(() => {
    if (scrollToIndex !== undefined && scrollElementRef.current) {
      let offsetTop = 0;
      for (let i = 0; i < scrollToIndex; i++) {
        offsetTop += getItemHeight(i);
      }
      scrollElementRef.current.scrollTop = offsetTop;
    }
  }, [scrollToIndex, getItemHeight]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enableKeyboardNav || items.length === 0) return;

      const currentIndex = focusedIndex ?? 0;
      let newIndex = currentIndex;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          newIndex = Math.min(items.length - 1, currentIndex + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = items.length - 1;
          break;
        case "PageDown":
          e.preventDefault();
          const itemsPerPage = Math.floor(containerHeight / (typeof itemHeight === "number" ? itemHeight : 50));
          newIndex = Math.min(items.length - 1, currentIndex + itemsPerPage);
          break;
        case "PageUp":
          e.preventDefault();
          const itemsPerPageUp = Math.floor(containerHeight / (typeof itemHeight === "number" ? itemHeight : 50));
          newIndex = Math.max(0, currentIndex - itemsPerPageUp);
          break;
        default:
          return;
      }

      setFocusedIndex(newIndex);
      
      // Scroll to focused item if it's not visible
      const itemRef = itemRefs.current.get(newIndex);
      if (itemRef) {
        itemRef.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    },
    [enableKeyboardNav, items.length, focusedIndex, containerHeight, itemHeight]
  );

  const scrollToTop = () => {
    scrollElementRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    scrollElementRef.current?.scrollTo({ 
      top: virtualResult.totalHeight, 
      behavior: "smooth" 
    });
  };

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center p-8" style={{ height: containerHeight }}>
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-center text-muted-foreground">{error}</p>
      </Card>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8" style={{ height: containerHeight }}>
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Scroll indicators */}
      <div className="absolute right-2 top-2 z-10 flex flex-col gap-1">
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
          onClick={scrollToTop}
          disabled={scrollTop === 0}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
          onClick={scrollToBottom}
          disabled={scrollTop + containerHeight >= virtualResult.totalHeight}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Virtual scroll container */}
      <div
        ref={scrollElementRef}
        className="overflow-auto border rounded-md bg-background"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={enableKeyboardNav ? 0 : -1}
        role="listbox"
        aria-label="Virtual list"
      >
        {/* Spacer for total height */}
        <div style={{ height: virtualResult.totalHeight, position: "relative" }}>
          {/* Render visible items */}
          {virtualResult.visibleItems.map(({ index, offsetTop, height }) => {
            const item = items[index];
            if (!item) return null;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(index, el);
                  } else {
                    itemRefs.current.delete(index);
                  }
                }}
                className={`absolute w-full transition-colors ${
                  focusedIndex === index ? 'bg-accent' : ''
                }`}
                style={{
                  top: offsetTop,
                  height: height,
                }}
                role="option"
                aria-selected={focusedIndex === index}
                tabIndex={focusedIndex === index ? 0 : -1}
                onFocus={() => setFocusedIndex(index)}
              >
                <div className="h-full p-2">
                  {renderItem(item, index)}
                </div>
              </div>
            );
          })}

          {/* Loading skeleton for new items */}
          {loading && (
            <div 
              className="absolute w-full"
              style={{ 
                top: virtualResult.totalHeight,
                height: 200 
              }}
            >
              <div className="p-2 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading indicator at bottom */}
      {loading && hasMore && (
        <div className="flex justify-center items-center py-4 border-t">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">Loading more items...</span>
        </div>
      )}

      {/* Scroll progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{
            width: `${Math.min(100, ((scrollTop + containerHeight) / virtualResult.totalHeight) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
};