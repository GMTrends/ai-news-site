// Enhanced Image Optimization Utilities
// Provides advanced image optimization features for better performance and SEO

import type { ImageMetadata } from 'astro';

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  position?: 'top' | 'right top' | 'right' | 'right bottom' | 'bottom' | 'left bottom' | 'left' | 'left top' | 'center';
}

export interface ResponsiveImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  large: number;
}

/**
 * Generate optimized WebP URL with advanced options
 */
export function generateWebPUrl(
  imageUrl: string, 
  width: number = 1200, 
  height?: number,
  options: Partial<ImageOptimizationOptions> = {}
): string {
  const baseUrl = imageUrl.startsWith('http') ? imageUrl : `${import.meta.env.SITE || 'http://localhost:4321'}${imageUrl}`;
  
  // If it's already an external URL with optimization parameters, return as is
  if (baseUrl.includes('?') || baseUrl.includes('fm=')) {
    return baseUrl;
  }

  const params = new URLSearchParams();
  
  // Basic optimization
  params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', (options.quality || 85).toString());
  params.set('fm', options.format || 'webp');
  
  // Advanced options
  if (options.fit) params.set('fit', options.fit);
  if (options.position) params.set('position', options.position);
  
  // Performance optimizations
  params.set('auto', 'format,compress');
  params.set('fit', 'max');
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate responsive srcset for multiple breakpoints
 */
export function generateResponsiveSrcSet(
  imageUrl: string, 
  sizes: number[] = [400, 800, 1200, 1600],
  options: Partial<ImageOptimizationOptions> = {}
): string {
  return sizes
    .map(size => {
      const optimizedUrl = generateWebPUrl(imageUrl, size, undefined, options);
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
}

/**
 * Generate picture element sources for different formats
 */
export function generatePictureSources(
  imageUrl: string,
  width: number = 1200,
  height?: number,
  options: Partial<ImageOptimizationOptions> = {}
): {
  webp: string;
  avif: string;
  fallback: string;
} {
  return {
    webp: generateWebPUrl(imageUrl, width, height, { ...options, format: 'webp' }),
    avif: generateWebPUrl(imageUrl, width, height, { ...options, format: 'avif' }),
    fallback: generateWebPUrl(imageUrl, width, height, { ...options, format: 'jpeg' })
  };
}

/**
 * Generate optimized image with lazy loading attributes
 */
export function generateLazyImage(
  imageUrl: string,
  alt: string,
  width: number = 1200,
  height?: number,
  options: Partial<ImageOptimizationOptions> = {}
): {
  src: string;
  srcset: string;
  sizes: string;
  loading: 'lazy';
  decoding: 'async';
  alt: string;
} {
  return {
    src: generateWebPUrl(imageUrl, width, height, options),
    srcset: generateResponsiveSrcSet(imageUrl, [400, 800, 1200, 1600], options),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
    loading: 'lazy',
    decoding: 'async',
    alt
  };
}

/**
 * Generate hero image with high priority loading
 */
export function generateHeroImage(
  imageUrl: string,
  alt: string,
  width: number = 1200,
  height: number = 630,
  options: Partial<ImageOptimizationOptions> = {}
): {
  src: string;
  srcset: string;
  sizes: string;
  loading: 'eager';
  fetchpriority: 'high';
  decoding: 'async';
  alt: string;
} {
  return {
    src: generateWebPUrl(imageUrl, width, height, options),
    srcset: generateResponsiveSrcSet(imageUrl, [800, 1200, 1600], options),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
    loading: 'eager',
    fetchpriority: 'high',
    decoding: 'async',
    alt
  };
}

/**
 * Generate thumbnail image for cards and lists
 */
export function generateThumbnail(
  imageUrl: string,
  alt: string,
  width: number = 400,
  height: number = 250,
  options: Partial<ImageOptimizationOptions> = {}
): {
  src: string;
  srcset: string;
  sizes: string;
  loading: 'lazy';
  decoding: 'async';
  alt: string;
} {
  return {
    src: generateWebPUrl(imageUrl, width, height, { ...options, fit: 'cover' }),
    srcset: generateResponsiveSrcSet(imageUrl, [300, 400, 600], { ...options, fit: 'cover' }),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
    loading: 'lazy',
    decoding: 'async',
    alt
  };
}

/**
 * Generate avatar image for authors
 */
export function generateAvatar(
  imageUrl: string,
  alt: string,
  size: number = 100,
  options: Partial<ImageOptimizationOptions> = {}
): {
  src: string;
  width: string;
  height: string;
  loading: 'lazy';
  decoding: 'async';
  alt: string;
} {
  return {
    src: generateWebPUrl(imageUrl, size, size, { ...options, fit: 'cover', format: 'webp' }),
    width: size.toString(),
    height: size.toString(),
    loading: 'lazy',
    decoding: 'async',
    alt
  };
}

/**
 * Calculate optimal image dimensions based on aspect ratio
 */
export function calculateImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = maxWidth;
  let height = Math.round(maxWidth / aspectRatio);
  
  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = Math.round(maxHeight * aspectRatio);
  }
  
  return { width, height };
}

/**
 * Generate blur placeholder for progressive loading
 */
export function generateBlurPlaceholder(
  imageUrl: string,
  width: number = 20,
  height?: number
): string {
  return generateWebPUrl(imageUrl, width, height, {
    quality: 10,
    format: 'webp',
    fit: 'cover'
  });
}

/**
 * Check if image is already optimized
 */
export function isOptimizedImage(imageUrl: string): boolean {
  return imageUrl.includes('?') || 
         imageUrl.includes('fm=') || 
         imageUrl.includes('w=') ||
         imageUrl.startsWith('data:') ||
         imageUrl.startsWith('blob:');
}

/**
 * Get image format from URL
 */
export function getImageFormat(imageUrl: string): string {
  const extension = imageUrl.split('.').pop()?.toLowerCase();
  const formatMap: Record<string, string> = {
    'jpg': 'jpeg',
    'jpeg': 'jpeg',
    'png': 'png',
    'webp': 'webp',
    'avif': 'avif',
    'gif': 'gif',
    'svg': 'svg'
  };
  return formatMap[extension || ''] || 'jpeg';
}

/**
 * Generate image optimization options for different use cases
 */
export const imageOptimizationPresets = {
  hero: {
    quality: 90,
    format: 'webp' as const,
    fit: 'cover' as const,
    position: 'center' as const
  },
  thumbnail: {
    quality: 80,
    format: 'webp' as const,
    fit: 'cover' as const,
    position: 'center' as const
  },
  avatar: {
    quality: 85,
    format: 'webp' as const,
    fit: 'cover' as const,
    position: 'center' as const
  },
  content: {
    quality: 85,
    format: 'webp' as const,
    fit: 'max' as const
  }
};

// Preload critical images
export function preloadImage(src: string): void {
  if (typeof window !== 'undefined' && src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = generateWebPUrl(src);
    document.head.appendChild(link);
  }
}

// Intersection Observer for lazy loading
export function setupLazyLoading(): void {
  if (typeof window === 'undefined') return;
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const dataSrc = img.dataset.src;
        
        if (dataSrc) {
          img.src = dataSrc;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

export function getImageMetadata(image: ImageMetadata) {
  return {
    src: image.src,
    width: image.width,
    height: image.height,
    format: image.format,
  };
} 