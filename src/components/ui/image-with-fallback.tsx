"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fallbackSrc?: string;
  className?: string;
  sizes?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  loading?: "eager" | "lazy";
  unoptimized?: boolean;
  [key: string]: any;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 75,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+JNqoH2gA/Sxcc0TmBZubFjAOVMJJECDXJJ8rJqmk5yLsuhLHLt4uNpk4V8sdo0oJg6KD9nEwlh3v5hFGGk7F3xmOKdCJW4MDqM1v8vdm+aAH9LqAw2LfdrKWkxAKYW7QPecJ0Vp2Q7Wrk+ggn+IfI4+zlJpna0pKUchuOjklDOMU6wxCOqswMTlPZNqDhBJNbUp+rJ1XF5qG6hlzok9MC6srO7i5mpo0b5bz0k/z4BwiHdCHKfQ7dQk7X1fhH2I5g/ljrtWCKAqZdrZ3VXMPJUWqo3PlVHz5el8+0KlOCp7fPZqc8n8Nr/Qe7wRu9tqnjlxFi/3YfjhI9zw+dJfjy+WEddAMXVtv/Z",
  fallbackSrc = "/placeholder-image.jpg",
  className,
  sizes,
  style,
  onLoad,
  onError,
  loading = "lazy",
  unoptimized = false,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    onError?.();
  };

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (
    fill
      ? "100vw"
      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div
      className={cn(
        "animate-pulse bg-muted flex items-center justify-center",
        fill ? "absolute inset-0" : "",
        className
      )}
      style={fill ? undefined : { width, height, ...style }}
      role="img"
      aria-label={`Loading ${alt}`}
    >
      <ImageIcon className="h-8 w-8 text-muted-foreground opacity-50" />
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div
      className={cn(
        "bg-muted border-2 border-dashed border-border flex items-center justify-center text-muted-foreground",
        fill ? "absolute inset-0" : "rounded-md",
        className
      )}
      style={fill ? undefined : { width, height, ...style }}
      role="img"
      aria-label={`Failed to load ${alt}`}
    >
      <div className="text-center p-4">
        <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm font-medium">Image unavailable</p>
      </div>
    </div>
  );

  // Container for the image with loading and error states
  return (
    <div className={cn("relative overflow-hidden", !fill && "inline-block")}>
      {isLoading && <LoadingSkeleton />}
      
      {hasError && imageSrc === fallbackSrc ? (
        <ErrorState />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={responsiveSizes}
          loading={loading}
          unoptimized={unoptimized}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
};