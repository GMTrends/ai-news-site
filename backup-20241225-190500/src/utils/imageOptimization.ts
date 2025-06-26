// Image optimization utilities for WebP, responsive sizing, and lazy loading

export interface OptimizedImageOptions {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export function generateWebPUrl(url: string, width?: number, height?: number): string {
  if (!url) return '';
  
  // Handle Sanity CMS images
  if (url.includes('cdn.sanity.io')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('fit', 'crop');
    params.append('auto', 'format');
    params.append('fm', 'webp');
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  // Handle other image URLs
  const urlObj = new URL(url);
  if (width) urlObj.searchParams.set('w', width.toString());
  if (height) urlObj.searchParams.set('h', height.toString());
  urlObj.searchParams.set('fm', 'webp');
  
  return urlObj.toString();
}

export function generateResponsiveSrcSet(url: string, sizes: number[]): string {
  if (!url) return '';
  
  return sizes
    .map(size => `${generateWebPUrl(url, size)} ${size}w`)
    .join(', ');
}

export function generatePictureElement(options: OptimizedImageOptions): string {
  const { src, alt, width, height, sizes, className, loading = 'lazy', priority } = options;
  
  if (!src) return '';
  
  // Generate WebP version
  const webpSrc = generateWebPUrl(src, width, height);
  
  // Generate responsive srcset
  const responsiveSizes = [400, 800, 1200, 1600];
  const srcSet = generateResponsiveSrcSet(src, responsiveSizes);
  const webpSrcSet = generateResponsiveSrcSet(src, responsiveSizes);
  
  const defaultSizes = sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  
  return `
    <picture>
      <source srcset="${webpSrcSet}" type="image/webp" sizes="${defaultSizes}">
      <source srcset="${srcSet}" type="image/jpeg" sizes="${defaultSizes}">
      <img 
        src="${webpSrc || src}" 
        alt="${alt}"
        ${width ? `width="${width}"` : ''}
        ${height ? `height="${height}"` : ''}
        ${className ? `class="${className}"` : ''}
        loading="${loading}"
        ${priority ? 'fetchpriority="high"' : ''}
        decoding="async"
      >
    </picture>
  `;
}

export function createOptimizedImage(options: OptimizedImageOptions): string {
  const { src, alt, width, height, className, loading = 'lazy', priority } = options;
  
  if (!src) return '';
  
  // Generate WebP URL
  const webpSrc = generateWebPUrl(src, width, height);
  
  return `
    <img 
      src="${webpSrc || src}" 
      alt="${alt}"
      ${width ? `width="${width}"` : ''}
      ${height ? `height="${height}"` : ''}
      ${className ? `class="${className}"` : ''}
      loading="${loading}"
      ${priority ? 'fetchpriority="high"' : ''}
      decoding="async"
    >
  `;
}

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