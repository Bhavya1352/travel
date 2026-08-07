import { motion } from 'framer-motion';

// Premium loading spinner with a subtle pulsing animation.

export default function Loader({ label = 'Loading...', size = 'md' }) {
  const dimensions = size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-8 w-8' : 'h-12 w-12';

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className={`${dimensions} rounded-full border-2 border-[#1a2e22]/15 border-t-[#c8601a]`}
      />
      <p className="text-sm font-light tracking-wide text-[#1a2e22]/50">{label}</p>
    </div>
  );
}
