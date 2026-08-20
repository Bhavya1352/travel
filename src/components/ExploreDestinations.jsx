import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import OptimizedImage from './OptimizedImage';
import { useDeviceOptimization } from '../hooks/useDeviceOptimization';
import { DESTINATIONS } from '../data/destinations';

const FEATURED = DESTINATIONS.slice(0, 4);

const METADATA = [
  { index: '01', season: 'Apr – Oct', budget: '~€220/day' },
  { index: '02', season: 'Mar – May', budget: '~¥18,000/day' },
  { index: '03', season: 'Oct – Apr', budget: '~MAD 1,200/day' },
  { index: '04', season: 'Jun – Sep', budget: '~C$200/day' },
];

export default function ExploreDestinations() {
  const { isMobile, isSlowConnection } = useDeviceOptimization();
  
  return (
    <section id="destinations" className="bg-[#faf8f5] py-8 xs:py-12 sm:py-16 md:py-20 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">

        {/* Section header */}
        <div className="mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20 flex flex-col gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal variant="fadeLeft">
            <p className="mb-1.5 xs:mb-2 sm:mb-3 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.28em] text-[#c8601a]">
              Curated Destinations
            </p>
            <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] text-[#1a2e22]">
              Destinations worth
              <br />
              <em>the journey.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeRight" delay={0.1}>
            <p className="max-w-[200px] xs:max-w-xs sm:max-w-sm md:max-w-md text-[10px] xs:text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#1a2e22]/55 lg:text-right">
              Chosen for atmosphere, timing, and a genuine sense of place —
              not just the most-searched cities on a map.
            </p>
          </ScrollReveal>
        </div>

        {/* Mosaic grid - changed to simple circular card layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">

          {/* 01 — Santorini */}
          <ScrollReveal delay={0} variant="fadeUp">
            <CircularCard dest={FEATURED[0]} meta={METADATA[0]} />
          </ScrollReveal>

          {/* 02 — Kyoto */}
          <ScrollReveal delay={0.08} variant="fadeUp">
            <CircularCard dest={FEATURED[1]} meta={METADATA[1]} />
          </ScrollReveal>

          {/* 03 — Marrakech */}
          <ScrollReveal delay={0.14} variant="fadeUp">
            <CircularCard dest={FEATURED[2]} meta={METADATA[2]} />
          </ScrollReveal>

          {/* 04 — Banff */}
          <ScrollReveal delay={0.2} variant="fadeUp">
            <CircularCard dest={FEATURED[3]} meta={METADATA[3]} />
          </ScrollReveal>

        </div>

        {/* Bottom link */}
        <ScrollReveal delay={0.1} variant="fade">
          <div className="mt-8 xs:mt-12 sm:mt-16 md:mt-20 flex items-center gap-3 xs:gap-4">
            <div className="h-px flex-1 bg-[#1a2e22]/15" />
            <Link
              to="/destinations"
              className="group flex items-center gap-2 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#1a2e22]/50 transition-colors duration-300 hover:text-[#c8601a]"
            >
              Explore all destinations
              <ArrowUpRight className="h-3 xs:h-3.5 sm:h-4 w-3 xs:w-3.5 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

// ─── Circular Card Component ──────────────────────────────────────────────────────
function CircularCard({ dest, meta }) {
  const { isMobile } = useDeviceOptimization();
  
  return (
    <Link
      to={`/destination/${dest.id}`}
      className="group flex flex-col items-center text-center"
    >
      {/* Circular Image */}
      <div className="relative w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 aspect-square overflow-hidden rounded-full border-2 border-[#1a2e22]/10 group-hover:border-[#c8601a]/50 transition-all duration-300 shadow-lg group-hover:shadow-xl">
        <OptimizedImage
          src={dest.image}
          alt={`${dest.name}, ${dest.country}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          isMobile={isMobile}
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 18rem, (min-width: 640px) 16rem, 12rem"
          width={384}
          height={384}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#c8601a]/0 group-hover:bg-[#c8601a]/20 transition-colors duration-300" />
      </div>

      {/* Destination Info */}
      <div className="mt-2.5 xs:mt-3 sm:mt-4">
        <h3 className="font-serif text-sm xs:text-base sm:text-lg md:text-xl font-light text-[#1a2e22] group-hover:text-[#c8601a] transition-colors duration-300">
          {dest.name}
        </h3>
        <p className="text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#1a2e22]/40 mt-0.5">
          {dest.country}
        </p>
        <div className="mt-1.5 xs:mt-2 flex items-center justify-center gap-1.5 xs:gap-2">
          <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8601a]">
            {meta.index}
          </span>
          <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-light text-[#1a2e22]/50">
            {meta.season}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Mosaic Card (kept for reference but not used) ────────────────────────────────
function MosaicImage({ dest, meta, size, isFeatured = false }) {
  const { isMobile } = useDeviceOptimization();
  
  const heightClass =
    size === 'large'
      ? 'h-[12rem] xs:h-[14rem] sm:h-[16rem] md:h-[18rem] lg:h-[24rem] xl:h-[28rem]'
      : size === 'tall'
      ? 'h-[16rem] xs:h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[44rem] xl:h-[54rem]'
      : 'h-[10rem] xs:h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[20rem] xl:h-[22rem]';

  // Use responsive sizes for better performance
  const sizes = size === 'large' ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

  return (
    <div className="group relative flex flex-col">

      {/* Card shell — lifts on hover */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to={`/destination/${dest.id}`}
          className="relative block overflow-hidden rounded-2xl border border-[#1a2e22]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8601a]"
          aria-label={`View details for ${dest.name}, ${dest.country}`}
        >
          {/* Shadow ring that grows on hover */}
          <motion.div
            className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
            initial={{ boxShadow: '0 2px 12px 0 rgba(26,46,34,0.06)' }}
            whileHover={{ boxShadow: '0 20px 60px -8px rgba(26,46,34,0.28)' }}
            transition={{ duration: 0.4 }}
          />

          <div className={`relative overflow-hidden ${heightClass}`}>

            {/* Image — zoom on hover */}
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <OptimizedImage
                src={dest.image}
                sizes={sizes}
                alt={`${dest.name}, ${dest.country} - ${dest.tagline}`}
                className="h-full w-full object-cover"
                loading="lazy"
                isMobile={isMobile}
              />
            </motion.div>

            {/* Base vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

            {/* Colour overlay — subtle tint on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#1a2e22]/0 to-[#1a2e22]/40"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            />

            {/* Shimmer sweep */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
            />

            {/* Featured badge */}
            {isFeatured && (
              <motion.span
                className="absolute left-5 top-5 z-10 rounded-full bg-[#faf8f5] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8601a] shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                ✦ Highlighted Cover
              </motion.span>
            )}

            {/* Region tag — appears on hover */}
            <motion.div
              className="absolute left-5 bottom-5 z-10"
              initial={{ opacity: 0, y: 8 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!isFeatured && (
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                  {dest.country}
                </span>
              )}
            </motion.div>

            {/* Arrow button — top right, spins on hover */}
            <motion.div
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#1a2e22]/80 text-white backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1, backgroundColor: 'rgba(200,96,26,0.9)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.25 }}
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

          </div>
        </Link>
      </motion.div>

      {/* Metadata below card — slides up slightly on group hover */}
      <motion.div
        className="mt-2 xs:mt-3 sm:mt-4 md:mt-5 flex flex-col xs:flex-row items-start justify-between gap-2 xs:gap-3 sm:gap-4 px-1 xs:px-2"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex gap-2 xs:gap-3 sm:gap-4">
          <span className="mt-0.5 text-[9px] xs:text-[10px] sm:text-xs font-bold text-[#c8601a]">{meta.index}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-light text-[#1a2e22] group-hover:text-[#c8601a] transition-colors duration-300 truncate">
              {dest.name}
            </h3>
            <p className="mt-1 xs:mt-1.5 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#1a2e22]/40">
              {dest.country}
            </p>
            <p className="mt-1 xs:mt-1.5 sm:mt-2 text-[9px] xs:text-[10px] sm:text-xs font-light italic leading-relaxed text-[#1a2e22]/60 line-clamp-2">
              {dest.tagline}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right shrink-0">
          <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a2e22]/35 bg-[#1a2e22]/5 px-1 xs:px-1.5 sm:px-2 py-0.5 rounded">
            {meta.season}
          </span>
          <span className="text-[9px] xs:text-[10px] sm:text-xs font-light text-[#1a2e22]/50 mt-1">
            {meta.budget}
          </span>
        </div>
      </motion.div>

    </div>
  );
}
