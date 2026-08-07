// Lightweight class-name combiner — avoids pulling in clsx for a single helper.
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Format a Date object as a short readable string (e.g. "Mar 14").
export function formatDateShort(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// Clamp a number between min and max.
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
