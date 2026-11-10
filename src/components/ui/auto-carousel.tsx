"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AutoCarouselProps {
  images: { src: string; alt: string }[];
  autoRotateInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  className?: string;
  width?: string;
  height?: string;
}

export const AutoCarousel: React.FC<AutoCarouselProps> = ({
  images,
  autoRotateInterval = 3000,
  showArrows = true,
  showIndicators = true,
  className = "",
  width = "w-full",
  height = "h-96"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setAutoRotate(false);
    setLastInteraction(Date.now());
  }, []);

  const handleArrowClick = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
    setAutoRotate(false);
    setLastInteraction(Date.now());
  }, [nextSlide, prevSlide]);

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(nextSlide, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotate, isHovered, nextSlide, autoRotateInterval]);

  // Restart auto-rotate after 10 seconds of inactivity
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      if (!autoRotate && Date.now() - lastInteraction > 10000) {
        setAutoRotate(true);
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [autoRotate, lastInteraction]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleArrowClick('prev');
      } else if (e.key === 'ArrowRight') {
        handleArrowClick('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleArrowClick]);

  if (!images.length) return null;

  return (
    <div 
      className={`relative ${width} ${height} overflow-hidden rounded-lg bg-accent shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Image carousel"
    >
      {/* Main image container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:scale-110"
            onClick={() => handleArrowClick('prev')}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:scale-110"
            onClick={() => handleArrowClick('next')}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dot indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-background/60 hover:bg-background/80'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-rotate indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            autoRotate && !isHovered ? 'bg-primary animate-pulse' : 'bg-muted'
          }`}
          aria-hidden="true"
        />
        <span className="text-xs text-background/80 bg-foreground/20 px-2 py-1 rounded backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Progress bar for auto-rotate */}
      {autoRotate && !isHovered && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-background/30">
          <div 
            className="h-full bg-primary animate-[progress_var(--duration)_linear_infinite]"
            style={{ 
              '--duration': `${autoRotateInterval}ms`,
              animationDuration: `${autoRotateInterval}ms`
            } as React.CSSProperties}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};