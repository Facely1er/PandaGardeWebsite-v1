import React, { useState, useRef, useEffect, useCallback } from 'react';
import { trackPerformance } from '../lib/analytics';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg' | 'jpeg';
  onLoad?: () => void;
  onError?: () => void;
}

// Generate responsive image sources
const generateSrcSet = (src: string, sizes: number[], format: string = 'webp') => {
  return sizes
    .map(size => `${src}?w=${size}&f=${format} ${size}w`)
    .join(', ');
};

// Generate multiple format sources for better browser support
const generateSources = (src: string, sizes: number[]) => {
  const formats = [
    { format: 'avif', type: 'image/avif' },
    { format: 'webp', type: 'image/webp' },
    { format: 'jpg', type: 'image/jpeg' }
  ];

  return formats.map(({ format, type }) => (
    <source
      key={format}
      srcSet={generateSrcSet(src, sizes, format)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      type={type}
    />
  ));
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  placeholder,
  sizes,
  quality = 80,
  format = 'webp',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const imgRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(0);

  // Responsive sizes for different breakpoints
  const responsiveSizes = sizes ? 
    [320, 640, 768, 1024, 1280, 1536] : 
    width ? [width, width * 2] : [320, 640, 1024];

  useEffect(() => {
    if (priority || loading === 'eager') {
      setImageSrc(src);
    }
  }, [src, priority, loading]);

  const handleLoad = () => {
    const loadTime = performance.now() - loadStartTime.current;
    trackPerformance('image_load_time', loadTime);
    
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  };

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting && !isLoaded && !hasError) {
      loadStartTime.current = performance.now();
      setImageSrc(src);
    }
  }, [isLoaded, hasError, src]);

  useEffect(() => {
    if (loading === 'lazy' && !priority) {
      const observer = new IntersectionObserver(handleIntersection, {
        rootMargin: '50px',
        threshold: 0.1,
      });

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [loading, priority, handleIntersection]);

  // Generate optimized image URL with parameters
  const generateOptimizedSrc = (baseSrc: string, targetWidth?: number, targetFormat?: string) => {
    const url = new URL(baseSrc, window.location.origin);
    if (targetWidth) {url.searchParams.set('w', targetWidth.toString());}
    if (targetFormat) {url.searchParams.set('f', targetFormat);}
    url.searchParams.set('q', quality.toString());
    return url.toString();
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <picture className={className}>
      {/* Multiple format sources for better browser support */}
      {generateSources(src, responsiveSizes)}
      
      {/* Fallback image */}
      <img
        ref={imgRef}
        src={generateOptimizedSrc(imageSrc, width, format)}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          style={{ width, height }}
        />
      )}
    </picture>
  );
};

// Hook for image preloading
export const useImagePreload = () => {
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  };

  const preloadImages = async (srcs: string[]): Promise<void[]> => {
    return Promise.all(srcs.map(preloadImage));
  };

  return { preloadImage, preloadImages };
};

// Utility for generating responsive image URLs
export const generateImageUrl = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'png' | 'jpg' | 'jpeg';
  } = {}
) => {
  const { width, height, quality = 80, format = 'webp' } = options;
  const url = new URL(src, window.location.origin);
  
  if (width) {url.searchParams.set('w', width.toString());}
  if (height) {url.searchParams.set('h', height.toString());}
  if (quality) {url.searchParams.set('q', quality.toString());}
  if (format) {url.searchParams.set('f', format);}
  
  return url.toString();
};