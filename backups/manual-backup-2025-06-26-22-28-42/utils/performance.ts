// Performance Optimization Utilities
// Provides advanced performance features for better user experience

/**
 * Performance monitoring and optimization utilities
 */

// Intersection Observer for lazy loading
export function createLazyLoader(
  selector: string,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Lazy load images with blur placeholder
export function setupLazyImages(): void {
  if (typeof window === 'undefined') return;

  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = createLazyLoader(
    'img[data-src]',
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Preload critical resources
export function preloadCriticalResources(): void {
  if (typeof window === 'undefined') return;

  const criticalResources = [
    '/fonts/space-grotesk.woff2',
    '/fonts/inter.woff2',
    '/api/placeholder/400/250'
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('font') ? 'font' : 'image';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Optimize scroll performance
export function optimizeScroll(): void {
  if (typeof window === 'undefined') return;

  let ticking = false;

  function updateScroll() {
    // Add scroll-based optimizations here
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

// Performance monitoring
export function setupPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
    }
  }
}

// Optimize animations for reduced motion
export function setupReducedMotion(): void {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
  }
}

// Initialize all performance optimizations
export function initializePerformanceOptimizations(): void {
  if (typeof window === 'undefined') return;

  // Setup performance monitoring
  setupPerformanceMonitoring();
  
  // Setup reduced motion support
  setupReducedMotion();
  
  // Optimize scroll performance
  optimizeScroll();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Setup lazy loading
  setupLazyImages();
  
  // Add performance class to body
  document.body.classList.add('performance-optimized');
}

// Memory management utilities
export function cleanupEventListeners(): void {
  if (typeof window === 'undefined') return;

  // Cleanup function for page unload
  window.addEventListener('beforeunload', () => {
    // Cleanup any remaining observers or timers
    const observers = (window as any).__observers || [];
    observers.forEach((observer: IntersectionObserver) => {
      observer.disconnect();
    });
  });
}

// Export for use in components
export default {
  createLazyLoader,
  setupLazyImages,
  debounce,
  throttle,
  preloadCriticalResources,
  optimizeScroll,
  setupPerformanceMonitoring,
  setupReducedMotion,
  initializePerformanceOptimizations,
  cleanupEventListeners
}; 