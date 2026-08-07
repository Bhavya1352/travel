import { motion } from 'framer-motion';

// Scroll-triggered reveal wrapper using Framer Motion's whileInView.
// Supports multiple animation variants for richer scroll experiences.
//
// Usage:
//   <ScrollReveal>...</ScrollReveal>                   — default fade-up
//   <ScrollReveal variant="fadeLeft">...</ScrollReveal> — slide from left
//   <ScrollReveal variant="scale">...</ScrollReveal>    — scale up
//   <ScrollReveal variant="stagger" staggerChildren>   — parent for stagger

const VARIANTS = {
  // Default — fade up
  fadeUp: (y, delay) => ({
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  }),

  // Fade down
  fadeDown: (_, delay) => ({
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  }),

  // Slide in from left
  fadeLeft: (_, delay) => ({
    hidden: { opacity: 0, x: -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
    },
  }),

  // Slide in from right
  fadeRight: (_, delay) => ({
    hidden: { opacity: 0, x: 48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
    },
  }),

  // Scale + fade
  scale: (_, delay) => ({
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
    },
  }),

  // Zoom in from slightly smaller
  zoomIn: (_, delay) => ({
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  }),

  // Flip up
  flipUp: (_, delay) => ({
    hidden: { opacity: 0, rotateX: 20, y: 30 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
    },
  }),

  // Stagger parent — children animate individually
  stagger: (_, delay) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }),

  // Plain fade only
  fade: (_, delay) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.9, ease: 'easeOut', delay },
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
  const variantFn = VARIANTS[variant] ?? VARIANTS.fadeUp;
  const { hidden, visible } = variantFn(y, delay);

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
