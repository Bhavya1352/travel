import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Error state component with retry option.

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="h-10 w-10 text-red-400" strokeWidth={1} />
      </div>
      <h3 className="font-serif text-2xl font-light text-[#1a2e22]">An error occurred</h3>
      <p className="max-w-md text-sm font-light leading-relaxed text-[#1a2e22]/50">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-2 rounded-full border border-[#1a2e22]/15 px-6 py-2.5 text-sm font-medium text-[#1a2e22] transition-colors hover:bg-[#1a2e22]/5"
        >
          <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
          Try again
        </button>
      )}
    </motion.div>
  );
}
