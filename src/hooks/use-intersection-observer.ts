import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  triggerOnce?: boolean
  skip?: boolean
}

export interface UseIntersectionObserverResult {
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

export const useIntersectionObserver = <T extends Element = Element>(
  targetRef: React.RefObject<T>,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult => {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    triggerOnce = false,
    skip = false,
    ...restOptions
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasTriggeredRef = useRef(false)

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [observerEntry] = entries
      
      if (observerEntry) {
        setEntry(observerEntry)
        setIsIntersecting(observerEntry.isIntersecting)

        if (observerEntry.isIntersecting && triggerOnce) {
          hasTriggeredRef.current = true
          // Disconnect observer if triggerOnce is true
          if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
          }
        }
      }
    },
    [triggerOnce]
  )

  useEffect(() => {
    // Skip if explicitly told to skip or if we've already triggered once
    if (skip || (triggerOnce && hasTriggeredRef.current)) {
      return
    }

    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: assume element is visible if IntersectionObserver is not supported
      setIsIntersecting(true)
      setEntry(null)
      return
    }

    const target = targetRef.current
    if (!target) {
      return
    }

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer
    const observerOptions: IntersectionObserverInit = {
      threshold,
      rootMargin,
      root,
      ...restOptions,
    }

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions)
    observerRef.current.observe(target)

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [
    targetRef,
    threshold,
    rootMargin,
    root,
    skip,
    triggerOnce,
    observerCallback,
    restOptions,
  ])

  // Reset state when skip changes from true to false
  useEffect(() => {
    if (!skip && triggerOnce) {
      hasTriggeredRef.current = false
    }
  }, [skip, triggerOnce])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [])

  return {
    isIntersecting,
    entry,
  }
}