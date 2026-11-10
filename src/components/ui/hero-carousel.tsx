"use client";

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: CarouselImage[];
  autoRotateInterval?: number;
  className?: string;
  onImageChange?: (index: number) => void;
}

export const HeroCarousel = ({
  images,
  autoRotateInterval = 3000,
  className = "",
  onImageChange
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [userInteractionTimeout, setUserInteractionTimeout] = useState<NodeJS.Timeout | null>(null);

  const nextImage = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  }, [currentIndex, images.length, onImageChange]);

  const previousImage = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  }, [currentIndex, images.length, onImageChange]);

  const handleUserInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    
    if (userInteractionTimeout) {
      clearTimeout(userInteractionTimeout);
    }
    
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000); // Resume auto-play after 5 seconds of inactivity
    
    setUserInteractionTimeout(timeout);
  }, [userInteractionTimeout]);

  const handlePrevious = () => {
    handleUserInteraction();
    previousImage();
  };

  const handleNext = () => {
    handleUserInteraction();
    nextImage();
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying || isPaused || images.length <= 1) return;

    const interval = setInterval(nextImage, autoRotateInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, nextImage, autoRotateInterval, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handlePrevious, handleNext]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (userInteractionTimeout) {
        clearTimeout(userInteractionTimeout);
      }
    };
  }, [userInteractionTimeout]);

  if (images.length === 0) return null;

  return (
    <div 
      className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label={`Image carousel showing ${images[currentIndex].alt}`}
    >
      {/* Image Stack */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          {/* Previous Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 group"
            aria-label="Previous image"
          >
            <ChevronLeft 
              className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200" 
            />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 hover:bg-white/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 group"
            aria-label="Next image"
          >
            <ChevronRight 
              className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200" 
            />
          </button>
        </>
      )}

      {/* Screen reader only status */}
      <div className="sr-only" aria-live="polite">
        Image {currentIndex + 1} of {images.length}: {images[currentIndex].alt}
      </div>
    </div>
  );
};