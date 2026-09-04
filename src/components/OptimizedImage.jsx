import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// useDeviceOptimization not used here - isMobile is a prop passed from parent components

/**
 * OptimizedImage — drop-in <img> replacement with:
 *   • IntersectionObserver-based lazy loading (with native fallback)
 *   • Blur-up placeholder during load
 *   • Automatic Pexels srcset generation (WebP + AVIF via <picture>)
 *   • Priority / fetchpriority wiring for above-the-fold images
 *   • Graceful error fallback
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
  blurDataURL,
  ...motionProps
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef(null);

  // IntersectionObserver lazy loading — only fetch once the image is near the viewport.
  // Native `loading="lazy"` is unreliable in some browsers and can still trigger full-
  // resolution fetches before the element is actually visible.
  useEffect(() => {
    if (priority) return;
    const el = imgRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries[0].isIntersecting && setInView(true);
      },
      { rootMargin: '200px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  const loadingAttr = inView ? (loading || 'lazy') : 'lazy';
  const fetchPriorityAttr = priority ? 'high' : (fetchpriority || 'auto');

  const autoSrcset =
    srcset ||
    (src?.includes('pexels.com')
      ? generatePexelsSrcset(src, isMobile)
      : undefined);

  const autoWebPSrcset =
    srcWebP ||
    (src?.includes('pexels.com')
      ? generatePexelsWebPSrcset(src, isMobile)
      : undefined);

  const finalSrc = src?.includes('pexels.com') && !src.includes('fm=webp')
    ? `${src.split('?')[0]}?auto=compress&cs=tinysrgb&w=${isMobile ? 480 : 800}&fm=webp&q=${isMobile ? 30 : 50}`
    : src;

  const finalSrcset = hasError || !inView ? undefined : autoSrcset;

  const imageClassName = `block w-full h-full object-cover ${className}`;
  const baseStyle = { opacity: isLoaded ? 1 : 0, transition: 'opacity 0.4s ease' };

  // Shared handlers
  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    console.error('Image failed to load:', src);
    setHasError(true);
    setIsLoaded(true);
  };

  const hasMotion =
    motionProps.initial ||
    motionProps.animate ||
    motionProps.whileHover;

  return (
    <picture className="block w-full h-full">
      {/* Format sources — only render once near viewport so we don't trigger extra requests early */}
      {inView && srcAVIF && !hasError && (
        <source type="image/avif" srcSet={srcAVIF} sizes={sizes} />
      )}

      {inView && autoWebPSrcset && !hasError && (
        <source type="image/webp" srcSet={autoWebPSrcset} sizes={sizes} />
      )}

      {/* Blur-up placeholder — keeps layout stable until the real image loads */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#e8e4de]"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: blurDataURL ? 'blur(12px)' : 'none',
          }}
        />
      )}

      {hasMotion ? (
        <motion.img
          ref={imgRef}
          src={inView ? finalSrc : undefined}
          srcSet={finalSrcset}
          sizes={sizes}
          alt={alt}
          loading={loadingAttr}
          decoding={decoding}
          fetchPriority={fetchPriorityAttr}
          className={imageClassName}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          style={{ ...baseStyle, ...motionProps.style }}
          {...motionProps}
        />
      ) : (
        <img
          ref={imgRef}
          src={inView ? finalSrc : undefined}
          srcSet={finalSrcset}
          sizes={sizes}
          alt={alt}
          loading={loadingAttr}
          decoding={decoding}
          fetchPriority={fetchPriorityAttr}
          className={imageClassName}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          style={baseStyle}
        />
      )}
    </picture>
  );
}

export function generatePexelsSrcset(baseUrl, isMobile = false) {
  const mobileWidths = [320, 480, 640, 750];
  const desktopWidths = [640, 750, 828, 1080, 1200, 1920];

  const widths = isMobile ? mobileWidths : desktopWidths;
  const cleanBaseUrl = baseUrl.split('?')[0];
  const quality = isMobile ? 30 : 60;

  return widths
    .map(
      (w) =>
        `${cleanBaseUrl}?auto=compress&cs=tinysrgb&w=${w}&dpr=1&q=${quality} ${w}w`
    )
    .join(', ');
}

export function generatePexelsWebPSrcset(baseUrl, isMobile = false) {
  const mobileWidths = [320, 480, 640, 750];
  const desktopWidths = [640, 750, 828, 1080, 1200, 1920];

  const widths = isMobile ? mobileWidths : desktopWidths;
  const cleanBaseUrl = baseUrl.split('?')[0];
  const quality = isMobile ? 25 : 55;

  return widths
    .map(
      (w) =>
        `${cleanBaseUrl}?auto=compress&cs=tinysrgb&w=${w}&dpr=1&fm=webp&q=${quality} ${w}w`
    )
    .join(', ');
}

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