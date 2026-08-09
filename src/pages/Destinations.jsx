import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import FavoriteButton from '../components/FavoriteButton';
import ScrollReveal from '../components/ScrollReveal';
import OptimizedImage, { generatePexelsSrcset, generateSizes } from '../components/OptimizedImage';
import { getAllDestinations } from '../services/placesService';
import { useFavorites } from '../hooks/useFavorites';
import { useState } from 'react';

// Destinations listing page — editorial grid with search.

// Card container animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.07,
    },
  }),
};

export default function Destinations() {
  const [query, setQuery] = useState('');
  const { isFavoriteDestination, toggleDestination } = useFavorites();

  const {
    data: destinations,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: getAllDestinations,
  });

  const filtered = destinations?.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase()) ||
      d.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 pb-16 xs:pb-18 sm:pb-20 pt-24 xs:pt-28 sm:pt-32 lg:pt-40 overflow-hidden">

        {/* Header — slide up on mount */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] xs:text-xs font-medium uppercase tracking-[0.2em] text-[#c8601a]"
          >
            Explore
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-3 font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-[#1a2e22]"
          >
            All destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="mt-3 max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg text-xs xs:text-sm sm:text-base font-light leading-relaxed text-[#1a2e22]/50"
          >
            Browse our curated collection of destinations, each with AI-ready itineraries.
          </motion.p>
        </motion.div>

        {/* Search bar — fade in */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative mb-8 xs:mb-10 sm:mb-12 max-w-xs xs:max-w-sm sm:max-w-md"
        >
          <Search className="absolute left-3 xs:left-4 top-1/2 h-3.5 xs:h-4 w-3.5 xs:w-4 -translate-y-1/2 text-[#1a2e22]/30" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations..."
            aria-label="Search destinations by name, country or region"
            className="w-full rounded-full border border-[#1a2e22]/10 bg-white py-2 xs:py-3 pl-10 xs:pl-12 pr-3 xs:pr-4 text-xs xs:text-sm font-light text-[#1a2e22] placeholder-[#1a2e22]/30 focus:border-[#c8601a] focus:outline-none transition-colors duration-200"
          />
        </motion.div>

        {/* Content */}
        {isLoading && <Loader label="Loading destinations..." />}
        {error && <ErrorState message={error.message} onRetry={refetch} />}
        {filtered && filtered.length === 0 && (
          <EmptyState
            title="No destinations found"
            message="Try a different search term."
          />
        )}

        {filtered && filtered.length > 0 && (
          <div className="grid gap-4 xs:gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((dest, i) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                index={i}
                isFavorite={isFavoriteDestination(dest.id)}
                onToggleFavorite={() => toggleDestination(dest.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Destination Card ─────────────────────────────────────────────────────────
function DestinationCard({ dest, index, isFavorite, onToggleFavorite }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <Link
        to={`/destination/${dest.id}`}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8601a] rounded-3xl"
        aria-label={`View ${dest.name}, ${dest.country}`}
      >
        {/* ── Card shell — shadow lifts on hover ── */}
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            boxShadow: '0 2px 16px 0 rgba(26,46,34,0.06)',
          }}
          whileFocus={{ y: -6 }}
        >
          {/* Image wrapper — clip + zoom */}
          <div className="relative h-56 xs:h-64 sm:h-72 overflow-hidden rounded-3xl">

            {/* Image — zoom on hover */}
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <OptimizedImage
                src={dest.image}
                srcset={undefined}
                sizes="100vw"
                alt={`${dest.name}, ${dest.country} - ${dest.tagline}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Base gradient — always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e]/80 via-[#1c1c1e]/10 to-transparent" />

            {/* Hover overlay — darkens + tints on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#1a2e22]/70 via-[#1a2e22]/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Shimmer sweep on hover */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* Favorite button */}
            <div className="absolute right-4 top-4 z-10">
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
              />
            </div>

            {/* Region badge — slides in from top on hover */}
            <motion.div
              className="absolute left-4 top-4 z-10"
              initial={{ opacity: 0, y: -8 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="rounded-full border border-white/20 bg-black/30 px-2 xs:px-3 py-0.5 xs:py-1 text-[9px] xs:text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                {dest.region}
              </span>
            </motion.div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-5 sm:p-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] xs:text-xs font-medium uppercase tracking-widest text-white/60">
                    {dest.country}
                  </p>
                  <h3 className="mt-1 font-serif text-xl xs:text-2xl font-light text-white leading-tight">
                    {dest.name}
                  </h3>
                  {/* Tagline slides up on hover */}
                  <motion.p
                    className="text-xs xs:text-sm font-light text-white/70 overflow-hidden"
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    whileHover={{ height: 'auto', opacity: 1, marginTop: 4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {dest.tagline}
                  </motion.p>
                </div>

                {/* Arrow button — spins + fills on hover */}
                <motion.div
                  className="flex h-8 xs:h-10 w-8 xs:w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md"
                  whileHover={{
                    backgroundColor: 'rgba(200,96,26,1)',
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowUpRight className="h-4 xs:h-5 w-4 xs:w-5" strokeWidth={1.5} />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
