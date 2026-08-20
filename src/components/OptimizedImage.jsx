import { useState } from 'react';
import { motion } from 'framer-motion';

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
  const [hasError, setHasError] = useState(false);

  const loadingAttr = priority ? 'eager' : (loading || 'lazy');
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

  // Also add WebP format and reasonable defaults to main src if it's a Pexels image
  const finalSrc = src?.includes('pexels.com') && !src.includes('fm=webp') 
    ? `${src.split('?')[0]}?auto=compress&cs=tinysrgb&w=${isMobile ? 480 : 800}&fm=webp&q=${isMobile ? 30 : 50}`
    : src;

  const finalSrcset = hasError ? undefined : autoSrcset;

  const imageClassName = `block w-full h-full object-cover ${className}`;

  const imageProps = {
    src: finalSrc,
    srcSet: finalSrcset,
    sizes,
    alt,
    loading: loadingAttr,
    decoding,
    fetchpriority: fetchPriorityAttr,
    className: imageClassName,
    width,
    height,
    onError: () => {
      console.error('Image failed to load:', src);
      setHasError(true);
    },
  };

  const hasMotion =
    motionProps.initial ||
    motionProps.animate ||
    motionProps.whileHover;

  return (
    <picture className="block w-full h-full">
      {srcAVIF && !hasError && (
        <source
          type="image/avif"
          srcSet={srcAVIF}
          sizes={sizes}
        />
      )}

      {autoWebPSrcset && !hasError && (
        <source
          type="image/webp"
          srcSet={autoWebPSrcset}
          sizes={sizes}
        />
      )}

      {hasMotion ? (
        <motion.img
          {...imageProps}
          {...motionProps}
        />
      ) : (
        <img {...imageProps} />
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