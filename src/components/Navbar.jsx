import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/travelOptions';
import { cn } from '../utils/helpers';

// Navbar — transparent over dark hero, solid dark bar on scroll.
// On light-background pages (non-hero), text is dark when not scrolled.

const DARK_PAGES = ['/', '/planner'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isDarkPage = DARK_PAGES.includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = scrolled || isDarkPage ? 'text-white' : 'text-[#1a2e22]';
  const subTextColor = scrolled || isDarkPage ? 'text-white/70' : 'text-[#1a2e22]/60';

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-white/10 py-3'
          : isDarkPage
            ? 'bg-transparent py-5'
            : 'bg-transparent py-5'
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <span className={cn('font-serif text-lg xs:text-xl sm:text-2xl tracking-widest transition-colors duration-500', textColor)}>
            Voyara
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-[10px] xs:text-[11px] sm:text-xs md:text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#c8601a]',
                subTextColor
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:flex">
          <Link
            to="/planner"
            className="rounded-full bg-[#c8601a] px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-2 md:py-2.5 text-[10px] xs:text-[11px] sm:text-xs md:text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#e07a35] hover:shadow-lg hover:shadow-[#c8601a]/25"
          >
            Plan a Trip
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn('lg:hidden p-1', textColor)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-4 xs:h-5 w-4 xs:w-5" /> : <Menu className="h-4 xs:h-5 w-4 xs:w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden bg-[#1c1c1e]/95 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-5 px-6 py-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-light text-white/70 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/planner"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-[#c8601a] px-6 py-3 text-center text-sm font-medium tracking-wide text-white"
              aria-label="Start planning your trip"
            >
              Plan a Trip
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.nav>
  );
}
