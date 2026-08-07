import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '../utils/helpers';

// Reusable favorite toggle button.
// Works for both destinations and trips.

export default function FavoriteButton({
  isFavorite,
  onToggle,
  className = '',
  size = 'md',
}) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const btnSize = size === 'sm' ? 'p-2' : 'p-2.5';

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'rounded-full backdrop-blur-md transition-colors duration-300',
        isFavorite
          ? 'bg-[#c8601a]/90 text-white'
          : 'bg-black/30 text-white/70 hover:bg-black/40 hover:text-white',
        btnSize,
        className
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn(iconSize, isFavorite && 'fill-current')}
        strokeWidth={1.5}
      />
    </motion.button>
  );
}
