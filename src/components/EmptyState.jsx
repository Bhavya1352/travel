import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

// Empty state component for when there's no data to display.

export default function EmptyState({ title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1a2e22]/5">
        <Compass className="h-10 w-10 text-[#1a2e22]/30" strokeWidth={1} />
      </div>
      <h3 className="font-serif text-2xl font-light text-[#1a2e22]">{title}</h3>
      <p className="max-w-md text-sm font-light leading-relaxed text-[#1a2e22]/50">
        {message}
      </p>
      {action}
    </motion.div>
  );
}
