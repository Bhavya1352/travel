import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Footer from '../components/Footer';

// Root layout — wraps all pages with page transitions and the footer.
// The footer is hidden on the home page (it has its own CTA section).

export default function RootLayout() {
  const location = useLocation();
  const showFooter = location.pathname !== '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      {showFooter && <Footer />}
    </div>
  );
}
