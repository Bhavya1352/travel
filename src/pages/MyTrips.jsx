import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Users, Wallet, Clock, Trash2, ArrowUpRight, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import EmptyState from '../components/EmptyState';
import ScrollReveal from '../components/ScrollReveal';
import { useSavedTrips } from '../hooks/useSavedTrips';
import { SAVED_TRIPS } from '../data/savedTrips';
import { cn } from '../utils/helpers';

// My Trips page — shows saved trips (from localStorage) and mock previously generated trips.
// Uses a tab filter for status (all, planned, completed, draft).

const STATUS_STYLES = {
  planned: 'bg-[#c8601a]/10 text-[#c8601a]',
  completed: 'bg-[#1a2e22]/10 text-[#1a2e22]',
  draft: 'bg-[#1a2e22]/5 text-[#1a2e22]/40',
};

export default function MyTrips() {
  const { trips: savedTrips, removeTrip } = useSavedTrips();
  const [filter, setFilter] = useState('all');
  const allTrips = [...savedTrips, ...SAVED_TRIPS];

  const filtered = filter === 'all'
    ? allTrips
    : allTrips.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 pb-16 xs:pb-18 sm:pb-20 pt-24 xs:pt-28 sm:pt-32 lg:pt-40 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 xs:mb-8 flex flex-col gap-3 xs:gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-[10px] xs:text-xs font-medium uppercase tracking-[0.2em] text-[#c8601a]">
              Your Journeys
            </span>
            <h1 className="mt-3 font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-[#1a2e22]">
              My Trips
            </h1>
          </div>
          <Link
            to="/planner"
            className="inline-flex items-center gap-1.5 xs:gap-2 rounded-full bg-[#c8601a] px-4 xs:px-5 sm:px-6 py-2 xs:py-3 text-xs xs:text-sm font-medium text-white transition-colors hover:bg-[#e07a35]"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            Plan a new trip
          </Link>
        </motion.div>

        {/* Filter tabs */}
        <div className="mb-6 xs:mb-8 flex gap-1.5 xs:gap-2 overflow-x-auto pb-1">
          {['all', 'planned', 'completed', 'draft'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                'rounded-full px-3 xs:px-4 py-1.5 xs:py-2 text-[11px] xs:text-xs font-light capitalize transition-colors whitespace-nowrap',
                filter === status
                  ? 'bg-[#1a2e22] text-white'
                  : 'border border-[#1a2e22]/10 text-[#1a2e22]/50 hover:bg-[#1a2e22]/5'
              )}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Trips grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No trips yet"
            message="Start planning your first journey and it will appear here."
            action={
              <Link
                to="/planner"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#c8601a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#e07a35]"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
                Plan a trip
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4 xs:gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((trip, i) => (
                <ScrollReveal key={trip.id} delay={i * 0.06}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group overflow-hidden rounded-3xl border border-[#1a2e22]/10 bg-white shadow-sm"
                  >
                    {/* Image */}
                    <div className="relative h-40 xs:h-44 sm:h-48 overflow-hidden">
                      <motion.img
                        src={trip.image}
                        alt={trip.destination}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e]/60 to-transparent" />
                      <span
                        className={cn(
                          "absolute left-3 xs:left-4 top-3 xs:top-4 rounded-full px-2 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs font-medium capitalize backdrop-blur-md",
                          STATUS_STYLES[trip.status] || STATUS_STYLES.draft
                        )}
                      >
                        {trip.status}
                      </span>
                      {savedTrips.some((t) => t.id === trip.id) && (
                        <button
                          onClick={() => removeTrip(trip.id)}
                          className="absolute right-3 xs:right-4 top-3 xs:top-4 flex h-7 xs:h-8 w-7 xs:w-8 items-center justify-center rounded-full bg-black/30 text-white/70 backdrop-blur-md transition-colors hover:bg-red-500/80 hover:text-white"
                        >
                          <Trash2 className="h-3.5 xs:h-4 w-3.5 xs:w-4" strokeWidth={1.5} />
                        </button>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 xs:p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-lg xs:text-xl font-light text-[#1a2e22]">
                            {trip.destination}
                          </h3>
                          <div className="mt-1 flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-xs font-light text-[#1a2e22]/40">
                            <Calendar className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
                            {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            {' – '}
                            {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <Link
                          to={`/itinerary?destination=${encodeURIComponent(trip.destination)}&startDate=${trip.startDate}&endDate=${trip.endDate}&budget=${trip.budget}&travelers=${trip.travelers}&travelStyle=${trip.travelStyle}`}
                          className="flex h-8 xs:h-9 w-8 xs:w-9 items-center justify-center rounded-full bg-[#1a2e22]/5 text-[#1a2e22]/40 transition-colors hover:bg-[#c8601a] hover:text-white"
                        >
                          <ArrowUpRight className="h-3.5 xs:h-4 w-3.5 xs:w-4" strokeWidth={1.5} />
                        </Link>
                      </div>

                      {/* Meta */}
                      <div className="mt-3 xs:mt-4 flex flex-wrap gap-2 xs:gap-3">
                        <span className="flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-xs font-light text-[#1a2e22]/50">
                          <Clock className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
                          {trip.days} days
                        </span>
                        <span className="flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-xs font-light text-[#1a2e22]/50">
                          <Users className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
                          {trip.travelers} travelers
                        </span>
                        <span className="flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-xs font-light text-[#1a2e22]/50">
                          <Wallet className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
                          ${trip.totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
