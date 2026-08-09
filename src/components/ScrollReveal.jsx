import { motion } from 'framer-motion';
import { useDeviceOptimization } from '../hooks/useDeviceOptimization';

// Scroll-triggered reveal wrapper using Framer Motion's whileInView.
// Supports multiple animation variants for richer scroll experiences.
// Optimized for mobile with reduced animation complexity.
//
// Usage:
//   <ScrollReveal>...</ScrollReveal>                   — default fade-up
//   <ScrollReveal variant="fadeLeft">...</ScrollReveal> — slide from left
//   <ScrollReveal variant="scale">...</ScrollReveal>    — scale up
//   <ScrollReveal variant="stagger" staggerChildren>   — parent for stagger

const VARIANTS = {
  // Default — fade up
  fadeUp: (y, delay, isMobile) => ({
    hidden: { opacity: 0, y: isMobile ? y / 2 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.8, 
        ease: [0.22, 1, 0.36, 1], 
        delay: isMobile ? 0 : delay 
      },
    },
  }),

  // Fade down
  fadeDown: (_, delay, isMobile) => ({
    hidden: { opacity: 0, y: isMobile ? -15 : -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.8, 
        ease: [0.22, 1, 0.36, 1], 
        delay: isMobile ? 0 : delay 
      },
    },
  }),

  // Slide in from left
  fadeLeft: (_, delay, isMobile) => ({
    hidden: { opacity: 0, x: isMobile ? -24 : -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.85, 
        ease: [0.22, 1, 0.36, 1], 
        delay: isMobile ? 0 : delay 
      },
    },
  }),

  // Slide in from right
  fadeRight: (_, delay, isMobile) => ({
    hidden: { opacity: 0, x: isMobile ? 24 : 48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.85, 
        ease: [0.22, 1, 0.36, 1], 
        delay: isMobile ? 0 : delay 
      },
    },
  }),

  // Scale + fade
  scale: (_, delay, isMobile) => ({
    hidden: { opacity: 0, scale: isMobile ? 0.94 : 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: isMobile ? 0.35 : 0.75, 
        ease: [0.22, 1, 0.36, 1], 
        delay: isMobile ? 0 : delay 
      },
    },
  }),

  // Zoom in from slightly smaller
  zoomIn: (_, delay, isMobile) => ({
    hidden: { opacity: 0, scale: isMobile ? 0.97 : 0.94, y: isMobile ? 8 : 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.8, 
        ease: [0.22, 1, 0.36, 1], 
        delay: isMobile ? 0 : delay 
      },
    },
  }),

  // Flip up (simplified on mobile to just fade)
  flipUp: (_, delay, isMobile) => {
    if (isMobile) {
      return {
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0 },
        },
      };
    }
    return {
      hidden: { opacity: 0, rotateX: 20, y: 30 },
      visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
      },
    };
  },

  // Stagger parent — children animate individually
  stagger: (_, delay, isMobile) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: isMobile ? 0 : delay,
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0 : delay,
      },
    },
  }),

  // Plain fade only
  fade: (_, delay, isMobile) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: isMobile ? 0.4 : 0.9, 
        ease: 'easeOut', 
        delay: isMobile ? 0 : delay 
      },
    },
  }),
};

export default function ScrollReveal({
  children,
  delay = 0,
  y = 30,
  className = '',
  once = true,
  variant = 'fadeUp',
  amount = 0.2,
}) {
  const { isMobile } = useDeviceOptimization();
  const variantFn = VARIANTS[variant] ?? VARIANTS.fadeUp;
  const { hidden, visible } = variantFn(y, delay, isMobile);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{ hidden, visible }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Named export for stagger children items
export function RevealItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
