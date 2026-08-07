import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage component with WebP/AVIF support, responsive images, and lazy loading
 * 
 * @param {string} src - Primary image source (fallback)
 * @param {string} srcWebP - WebP format source
 * @param {string} srcAVIF - AVIF format source (best compression)
 * @param {string} srcset - Responsive image srcset
 * @param {string} sizes - Image sizes for responsive loading
 * @param {string} alt - Accessible alt text (required)
 * @param {string} className - Additional CSS classes
 * @param {boolean} priority - If true, loads immediately (for above-the-fold images)
 * @param {object} motion props - Framer motion animation props
 */
export default function OptimizedImage({
  src,
  srcWebP,
  srcAVIF,
  srcset,
  sizes = '100vw',
  alt,
  className = '',
  priority = false,
  loading,
  decoding = 'async',
  fetchpriority,
  isMobile = false,
  width,
  height,
  ...motionProps
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Determine loading strategy
  const loadingAttr = priority ? 'eager' : (loading || 'lazy');
  const fetchPriorityAttr = priority ? 'high' : (fetchpriority || 'auto');

  // Auto-generate srcsets for Pexels images if not provided
  const autoSrcset = srcset || (src?.includes('pexels.com') ? generatePexelsSrcset(src, isMobile) : undefined);
  const autoWebPSrcset = srcWebP || (src?.includes('pexels.com') ? generatePexelsWebPSrcset(src, isMobile) : undefined);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    console.error('Image failed to load:', src);
    setHasError(true);
  };

  // If srcset fails, fall back to base src only
  const finalSrcset = hasError ? undefined : autoSrcset;

  return (
    <picture>
      {/* AVIF - best compression, modern browsers */}
      {srcAVIF && !hasError && (
        <source
          type="image/avif"
          srcSet={srcAVIF}
          sizes={sizes}
        />
      )}

      {/* WebP - great compression, wide support */}
      {(autoWebPSrcset || srcWebP) && !hasError && (
        <source
          type="image/webp"
          srcSet={autoWebPSrcset || srcWebP}
          sizes={sizes}
        />
      )}

      {/* Fallback - JPEG/PNG */}
      {motionProps.initial || motionProps.animate || motionProps.whileHover ? (
        <motion.img
          src={src}
          srcSet={finalSrcset}
          sizes={sizes}
          alt={alt}
          loading={loadingAttr}
          decoding={decoding}
          fetchpriority={fetchPriorityAttr}
          className={className}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          {...motionProps}
        />
      ) : (
        <img
          src={src}
          srcSet={finalSrcset}
          sizes={sizes}
          alt={alt}
          loading={loadingAttr}
          decoding={decoding}
          fetchpriority={fetchPriorityAttr}
          className={className}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </picture>
  );
}

/**
 * Helper function to generate srcset for Pexels images
 * Pexels provides multiple sizes - we can construct URLs for different widths
 */
export function generatePexelsSrcset(baseUrl, isMobile = false) {
  // Mobile-optimized widths (smaller set for better performance)
  const mobileWidths = [320, 480, 640, 750];
  // Full widths for desktop
  const desktopWidths = [640, 750, 828, 1080, 1200, 1920];
  
  const widths = isMobile ? mobileWidths : desktopWidths;

  // Remove any existing query parameters to avoid conflicts
  const cleanBaseUrl = baseUrl.split('?')[0];

  // Lower quality for mobile (q=40) vs desktop (q=60) - optimized for slow 4G
  const quality = isMobile ? 40 : 60;

  return widths
    .map(w => `${cleanBaseUrl}?auto=compress&cs=tinysrgb&w=${w}&dpr=1&q=${quality} ${w}w`)
    .join(', ');
}

/**
 * Generate WebP srcset for Pexels images
 */
export function generatePexelsWebPSrcset(baseUrl, isMobile = false) {
  const mobileWidths = [320, 480, 640, 750];
  const desktopWidths = [640, 750, 828, 1080, 1200, 1920];
  
  const widths = isMobile ? mobileWidths : desktopWidths;
  const cleanBaseUrl = baseUrl.split('?')[0];

  // Lower quality for mobile (q=40) vs desktop (q=60) - optimized for slow 4G
  const quality = isMobile ? 40 : 60;

  return widths
    .map(w => `${cleanBaseUrl}?auto=compress&cs=tinysrgb&w=${w}&dpr=1&fm=webp&q=${quality} ${w}w`)
    .join(', ');
}

/**
 * Generate sizes attribute based on layout
 */
export function generateSizes(layout = 'default') {
  const sizeConfigs = {
    hero: '100vw',
    card: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
    featured: '(min-width: 1024px) 66vw, 100vw',
    tall: '(min-width: 1024px) 33vw, 100vw',
    testimonial: '(min-width: 1024px) 50vw, 100vw',
    avatar: '(min-width: 640px) 40px, 36px',
  };
  
  return sizeConfigs[layout] || '100vw';
}
