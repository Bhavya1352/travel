import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile devices and connection quality for image optimization
 */
export function useDeviceOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
    };

    // Detect slow connection
    const checkConnection = () => {
      if ('connection' in navigator) {
        const conn = navigator.connection;
        const slowTypes = ['slow-2g', '2g', '3g'];
        setIsSlowConnection(
          slowTypes.includes(conn.effectiveType) || 
          conn.downlink < 1.5 || 
          conn.saveData
        );
      }
    };

    // Detect WebP support
    const checkWebPSupport = () => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        setSupportsWebP(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    checkMobile();
    checkConnection();
    checkWebPSupport();

    // Listen for window resize to update mobile detection
    window.addEventListener('resize', checkMobile);
    
    // Listen for connection changes
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', checkConnection);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', checkConnection);
      }
    };
  }, []);

  return {
    isMobile,
    isSlowConnection,
    supportsWebP,
    // Helper function to determine optimal image quality
    getOptimalImageParams: () => ({
      quality: isSlowConnection ? 70 : 85,
      format: supportsWebP ? 'webp' : 'jpeg',
      maxWidth: isMobile ? 750 : 1920,
    }),
  };
}

/**
 * Hook for intersection observer based lazy loading
 */
export function useIntersectionObserver(options = {}) {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        rootMargin: '50px', // Load images 50px before they enter viewport
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, hasIntersected, options]);

  return [setRef, isIntersecting, hasIntersected];
}