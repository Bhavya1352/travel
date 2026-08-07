/**
 * Critical Performance Optimizations
 * These functions help improve Core Web Vitals scores
 */

// Preload critical images for faster LCP
export function preloadCriticalImages() {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth < 768;
  const heroImageUrl = `https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? '750' : '1920'}&q=80`;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = heroImageUrl;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

// Optimize main thread by deferring non-critical work
export function deferNonCriticalWork(callback, delay = 0) {
  if ('scheduler' in window && 'postTask' in window.scheduler) {
    // Use Scheduler API if available (Chrome 94+)
    window.scheduler.postTask(callback, { priority: 'background' });
  } else if ('requestIdleCallback' in window) {
    // Fallback to requestIdleCallback
    window.requestIdleCallback(callback, { timeout: delay || 5000 });
  } else {
    // Final fallback to setTimeout
    setTimeout(callback, delay || 16);
  }
}

// Measure and report Core Web Vitals
export function reportWebVitals() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Measure LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', Math.round(lastEntry.startTime), 'ms');
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Measure FID (First Input Delay) 
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
      });
    }).observe({ type: 'first-input', buffered: true });

    // Measure CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', Math.round(clsValue * 1000) / 1000);
        }
      });
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.warn('Web Vitals measurement failed:', error);
  }
}

// Optimize images for performance
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Add intersection observer polyfill support only if needed
  if (!('IntersectionObserver' in window)) {
    // For production, we'll assume modern browsers have IntersectionObserver
    console.warn('IntersectionObserver not supported');
  }

  // Preconnect to image CDN
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://images.pexels.com';
  preconnect.crossOrigin = 'anonymous';
  document.head.appendChild(preconnect);
}

// Prevent layout shift by setting image dimensions early
export function preventLayoutShift() {
  if (typeof window === 'undefined') return;

  // Add CSS to prevent layout shift
  const style = document.createElement('style');
  style.textContent = `
    img[loading="lazy"] {
      min-height: 200px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .hero-container img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }
  `;
  document.head.appendChild(style);
}

// Initialize all performance optimizations
export function initPerformanceOptimizations() {
  // Run immediately for critical resources
  preloadCriticalImages();
  optimizeImageLoading();
  preventLayoutShift();

  // Defer non-critical work
  deferNonCriticalWork(() => {
    reportWebVitals();
  });
}