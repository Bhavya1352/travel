/* eslint-disable react/prop-types */

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Clock3,
  Compass,
  MapPin,
  Navigation,
  Sparkles,
  SunMedium,
  TrainFront,
  TreePine,
  UtensilsCrossed,
  Wallet,
  CloudSun,
  RefreshCw,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import OptimizedImage, { generatePexelsSrcset, generateSizes } from './OptimizedImage';
import { getDestinationById } from '../data/destinations';
import { cn } from '../utils/helpers';

const destination = getDestinationById('kyoto');

const DAYS = [
  {
    day: 1,
    label: 'Day 01',
    title: 'Arrival & first impressions',
    subtitle: 'Temple light and a slower beginning',
    image: destination.gallery[0],
    weather: { temp: 18, condition: 'Partly Cloudy', note: 'Soft light, ideal for walking' },
    budget: { total: 184, delta: '+12', label: 'Balanced' },
    travelTime: '38 min from Kyoto Station to Gion',
    location: 'Gion + Higashiyama',
    morning: 'Arrival coffee, luggage drop, and a quiet riverside walk to ease into the trip.',
    afternoon: 'Kiyomizu-dera and the backstreets of Higashiyama with a slow, photographic pace.',
    evening: 'Lantern-lit dinner in Gion, then a short stroll past tea houses and old machiya.',
    refinement: 'The AI leans into culture-first pacing on Day 1 so the trip feels composed, not rushed.',
    refinedNote: 'Arrival buffers preserved · walking-heavy day',
  },
  {
    day: 2,
    label: 'Day 02',
    title: 'Smarter and cheaper',
    subtitle: 'Nature-first, budget-optimized route',
    image: destination.gallery[1],
    weather: { temp: 20, condition: 'Sunny', note: 'Best day for gardens and open air' },
    budget: { total: 142, delta: '-42', label: 'Optimized' },
    travelTime: '22 min by train between stops',
    location: 'Arashiyama + river path',
    morning: 'Early bamboo grove walk before the crowds, then a minimalist breakfast nearby.',
    afternoon: 'Train instead of taxi, followed by a quieter nature sequence along the river.',
    evening: 'Affordable yakitori near the station and a night view from a local overlook.',
    refinement: 'User prompt: make Day 2 cheaper and add more nature. The route rebalances instantly.',
    refinedNote: 'Taxi removed · river walk + gardens added',
  },
  {
    day: 3,
    label: 'Day 03',
    title: 'Craft, tea, and culture',
    subtitle: 'A slower register through the city',
    image: destination.gallery[2],
    weather: { temp: 19, condition: 'Cloudy', note: 'Muted skies, rich textures' },
    budget: { total: 166, delta: '+4', label: 'Comfort' },
    travelTime: '31 min between neighborhoods',
    location: 'Nishiki + Gion',
    morning: 'Market tastings, a tea ceremony, and a sequence of quiet interiors.',
    afternoon: 'Museum time and a craft-focused detour shaped by your interests.',
    evening: 'A kaiseki dinner, then a late walk through softly lit lanes.',
    refinement: 'The plan slows down here, keeping the experience layered instead of overfilled.',
    refinedNote: 'Craft-heavy day · fewer transfers',
  },
  {
    day: 4,
    label: 'Day 04',
    title: 'Departure without dead time',
    subtitle: 'A clean final day with built-in buffer',
    image: destination.gallery[0],
    weather: { temp: 17, condition: 'Cloudy', note: 'Gentle departure weather' },
    budget: { total: 118, delta: '-18', label: 'Lean' },
    travelTime: '19 min to station · airport transfer included',
    location: 'Central Kyoto',
    morning: 'One final slow breakfast and an optional shrine stop if the flight allows.',
    afternoon: 'Souvenir shopping folded into a route that never backtracks.',
    evening: 'Departure window with a buffer built into the itinerary.',
    refinement: 'Voyara removes friction here, compressing logistics into a clean final day.',
    refinedNote: 'Transport buffer added · no wasted half-day',
  },
];

// AI refinement chips — each simulates an instruction that modifies the active day
const AI_CHIPS = [
  { id: 'slow', label: 'Make tomorrow slower', icon: '🌿' },
  { id: 'nature', label: 'Add more nature', icon: '🏔' },
  { id: 'budget', label: 'Keep Day 2 under €80', icon: '💶' },
  { id: 'quiet', label: 'Find somewhere quieter', icon: '🤫' },
];

// Simulated refined content per chip
const REFINED_OVERRIDES = {
  slow: {
    morning: 'Slow morning with tea, no schedule before 9am. Let the city wake up.',
    afternoon: 'One thoughtful anchor — a garden or a quiet temple — then free time.',
    evening: 'No restaurant reservations. Walk until something feels right.',
    refinedNote: 'Pace softened · margins widened · no rush',
  },
  nature: {
    morning: 'Pre-dawn trail walk at Fushimi Inari before tourists arrive.',
    afternoon: 'Philosopher\'s Path along the canal, then into forest trails behind Ginkaku-ji.',
    evening: 'Riverside dinner, no indoor dining today.',
    refinedNote: 'Outdoor sequence · trail-first route added',
  },
  budget: {
    morning: 'Free shrine walk instead of paid museum entry.',
    afternoon: 'Convenience-store lunch (¥600) + free garden access via seasonal pass.',
    evening: 'Standing ramen bar near Nishiki — ¥850 for a full bowl.',
    refinedNote: 'Spend reduced to €72 · 3 paid venues removed',
  },
  quiet: {
    morning: 'Residential backstreets of Fushimi — zero tourists, local bakeries.',
    afternoon: 'Sekisan-in garden (max 12 visitors at a time).',
    evening: 'Counter seat at an unmarked izakaya — no English menus.',
    refinedNote: 'Crowd-free route · off-guide venues only',
  },
};

export default function TripUnfolding() {
  const [activeDay, setActiveDay] = useState(2);
  const [activeChip, setActiveChip] = useState(null);
  const [isRefining, setIsRefining] = useState(false);
  const [refinedData, setRefinedData] = useState(null);

  const selected = useMemo(
    () => DAYS.find((day) => day.day === activeDay) ?? DAYS[0],
    [activeDay]
  );

  // Merge refined overrides on top of selected day
  const displayData = useMemo(() => {
    if (refinedData) return { ...selected, ...refinedData };
    return selected;
  }, [selected, refinedData]);

  const handleChip = (chip) => {
    if (isRefining) return;
    setActiveChip(chip.id);
    setIsRefining(true);
    setRefinedData(null);
    setTimeout(() => {
      setRefinedData(REFINED_OVERRIDES[chip.id]);
      setIsRefining(false);
    }, 1600);
  };

  const handleDayChange = (day) => {
    setActiveDay(day);
    setActiveChip(null);
    setRefinedData(null);
  };

  return (
    <section id="trip-planner" className="bg-[#1a2e22] py-16 xs:py-20 sm:py-24 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">

        {/* Section header */}
        <div className="mb-10 xs:mb-12 sm:mb-14 lg:mb-16 flex flex-col gap-2 xs:gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 xs:mb-3 text-[9px] xs:text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-[#c8601a]">
              Product Preview
            </p>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] text-white">
              A trip,
              <br />
              <em className="text-white/70">unfolding.</em>
            </h2>
          </div>
          <p className="max-w-[200px] xs:max-w-xs sm:max-w-sm text-[10px] xs:text-xs sm:text-sm font-light leading-relaxed text-white/40 lg:text-right">
            A live look at how Voyara turns a simple prompt into a day-by-day plan — with weather,
            budget, map context, and AI refinements built in.
          </p>
        </div>

        <ScrollReveal>
          <div className="grid gap-3 xs:gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-[250px_minmax(0,1.8fr)_320px]">

            {/* ─── LEFT: Day navigation ─── */}
            <aside className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {DAYS.map((day) => {
                const active = day.day === activeDay;
                return (
                  <button
                    key={day.day}
                    onClick={() => handleDayChange(day.day)}
                    className={cn(
                      'group flex min-w-[7rem] xs:min-w-[8rem] sm:min-w-[9.5rem] flex-col gap-1 xs:gap-1.5 sm:gap-2 border-b-2 pb-2 xs:pb-3 sm:pb-4 text-left transition-all duration-300 lg:min-w-0 lg:border-b-0 lg:border-l-2 lg:pb-0 lg:pl-4',
                      active
                        ? 'border-[#c8601a] text-white'
                        : 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/60'
                    )}
                  >
                    <span className={cn(
                      'text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] transition-colors',
                      active ? 'text-[#c8601a]' : 'text-white/30'
                    )}>
                      {day.label}
                    </span>
                    <span className="text-[12px] xs:text-[13px] sm:text-[15px] font-medium leading-tight line-clamp-2">{day.title}</span>
                    <span className={cn(
                      'flex items-center gap-1 xs:gap-1.5 text-[9px] xs:text-[10px] sm:text-xs transition-colors',
                      active ? 'text-white/50' : 'text-white/25'
                    )}>
                      <Clock3 className="h-2.5 xs:h-3 sm:h-3.5 w-2.5 xs:w-3 sm:w-3.5" strokeWidth={1.5} />
                      3-part plan
                    </span>
                  </button>
                );
              })}

              {/* AI Refine chips — inside the left sidebar */}
              <div className="mt-8 hidden lg:block">
                <div className="mb-4 flex items-center gap-2 border-b border-[#c8601a]/25 pb-3 text-xs font-bold uppercase tracking-[0.24em] text-white">
                  <Sparkles className="h-4 w-4 text-[#c8601a]" strokeWidth={2} />
                  ✦ Refine with AI
                </div>
                <div className="flex flex-col gap-2.5">
                  {AI_CHIPS.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleChip(chip)}
                      disabled={isRefining}
                      className={cn(
                        'flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[13px] font-medium transition-all duration-300',
                        activeChip === chip.id && !isRefining
                          ? 'border-[#c8601a] bg-[#c8601a]/15 text-white shadow-lg shadow-[#c8601a]/10'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:bg-white/10 hover:text-white',
                        isRefining && activeChip !== chip.id ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                      )}
                    >
                      <span className="text-lg leading-none">{chip.icon}</span>
                      <span className="leading-tight">{chip.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* ─── CENTER: Day itinerary image + activity blocks ─── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selected.day}-${activeChip}-${isRefining}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl"
                style={{ minHeight: '24rem xs:min-h-[28rem] sm:min-h-[32rem] lg:min-h-[38rem]' }}
              >
                {/* Hero image */}
                <figure className="relative h-[16rem] xs:h-[20rem] sm:h-[24rem] lg:h-[32rem] xl:h-[42rem] overflow-hidden">
                  <OptimizedImage
                    key={selected.image}
                    src={selected.image}
                    srcset={undefined}
                    sizes="100vw"
                    alt={`${destination.name} day ${selected.day} - ${selected.title}: ${displayData.location}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    width={1200}
                    height={800}
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e]/90 via-[#1c1c1e]/20 to-transparent" />

                  {/* Top labels */}
                  <div className="absolute left-3 xs:left-4 sm:left-5 right-3 xs:right-4 sm:right-5 top-3 xs:top-4 sm:top-5 flex items-start justify-between gap-2 xs:gap-3 sm:gap-4 text-white">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 xs:gap-1.5 text-[8px] xs:text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.24em] text-white/50">
                        <MapPin className="h-2 xs:h-2.5 sm:h-3 w-2 xs:w-2.5 sm:w-3 text-[#c8601a]" strokeWidth={1.5} />
                        <span className="truncate">{displayData.location}</span>
                      </div>
                      <h3 className="mt-1 xs:mt-1.5 font-serif text-lg xs:text-xl sm:text-2xl lg:text-3xl font-light leading-tight">
                        {destination.name}, {selected.label.toLowerCase()}
                      </h3>
                      <p className="mt-0.5 xs:mt-1 text-[10px] xs:text-xs sm:text-sm font-light text-white/50 line-clamp-2">{displayData.subtitle}</p>
                    </div>
                    <span className="hidden shrink-0 rounded-full border border-white/15 bg-white/10 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm sm:inline-flex">
                      AI preview
                    </span>
                  </div>

                  {/* AI loading overlay */}
                  <AnimatePresence>
                    {isRefining && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-[#1a2e22]/70 backdrop-blur-sm"
                      >
                        <div className="flex flex-col items-center gap-4 text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <RefreshCw className="h-7 w-7 text-[#c8601a]" strokeWidth={1.5} />
                          </motion.div>
                          <div>
                            <p className="text-sm font-light text-white">Refining itinerary…</p>
                            <p className="mt-1 text-[11px] text-white/40">Voyara is updating Day {activeDay}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom: activity timeline */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-5 lg:p-6">
                    <div className="grid gap-1.5 xs:gap-2 sm:gap-3 sm:grid-cols-3">
                      <ActivitySlot icon={SunMedium} label="Morning" text={displayData.morning} refined={!!refinedData && activeChip} />
                      <ActivitySlot icon={TreePine} label="Afternoon" text={displayData.afternoon} refined={!!refinedData && activeChip} />
                      <ActivitySlot icon={UtensilsCrossed} label="Evening" text={displayData.evening} refined={!!refinedData && activeChip} />
                    </div>
                  </div>
                </figure>

                {/* Refined confirmation banner */}
                <AnimatePresence>
                  {refinedData && !isRefining && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="flex items-center gap-2 border-t border-[#c8601a]/20 bg-[#1a2e22] px-5 py-3"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#c8601a]" strokeWidth={1.5} />
                      <span className="text-[11px] font-light text-white/60">{displayData.refinedNote}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile AI chips */}
                <div className="border-t border-white/10 bg-[#1a2e22] p-2 xs:p-3 sm:p-4 lg:hidden">
                  <div className="mb-1.5 xs:mb-2 sm:mb-3 text-[8px] xs:text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.24em] text-white/25">
                    Refine with AI
                  </div>
                  <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                    {AI_CHIPS.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => handleChip(chip)}
                        disabled={isRefining}
                        className={cn(
                          'flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 rounded-full border px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-1.5 text-[9px] xs:text-[10px] sm:text-xs font-light transition-all duration-300',
                          activeChip === chip.id && !isRefining
                            ? 'border-[#c8601a]/40 bg-[#c8601a]/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/45 hover:border-white/20'
                        )}
                      >
                        <span className="text-xs">{chip.icon}</span>
                        <span className="truncate">{chip.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ─── RIGHT: Open editorial stats ─── */}
            <div className="hidden lg:flex flex-col divide-y divide-white/8">

              {/* Weather */}
              <OpenStat
                icon={CloudSun}
                eyebrow="Weather"
                value={`${displayData.weather.temp}°`}
                label={displayData.weather.condition}
                note={displayData.weather.note}
              />

              {/* Budget */}
              <OpenStat
                icon={Wallet}
                eyebrow="Daily budget"
                value={
                  <motion.span
                    key={displayData.budget.total}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    ${displayData.budget.total}
                  </motion.span>
                }
                label={displayData.budget.label}
                badge={displayData.budget.delta}
                note="Smoothed against your trip style so the itinerary stays realistic."
              />

              {/* Map preview — Static map preview with lazy loading */}
              <div className="py-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  <Navigation className="h-3.5 w-3.5 text-[#c8601a]" strokeWidth={2} />
                  Map preview
                </div>
                <div className="text-xl font-serif font-light text-white">{displayData.location}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/30">{destination.region}</div>
                <div className="relative mt-4 h-48 overflow-hidden rounded-xl border border-white/10 bg-[#1a2e22]">
                  {/* Static map placeholder image - much faster than iframe */}
                  <OptimizedImage
                    src={`https://images.pexels.com/photos/2339009/pexels-photo-2339009.jpeg`}
                    srcset={undefined}
                    sizes="100vw"
                    alt={`Map location of ${displayData.location} in ${destination.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-60"
                    width={400}
                    height={300}
                  />
                  {/* Map overlay label */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1a2e22]/40 backdrop-blur-[2px]">
                    <div className="text-center">
                      <MapPin className="mx-auto h-6 w-6 text-[#c8601a] mb-2" strokeWidth={1.5} />
                      <p className="text-sm font-medium text-white">{destination.name}</p>
                      <p className="text-xs text-white/50 mt-1">
                        {destination.lat.toFixed(4)}°N, {destination.lng.toFixed(4)}°E
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel time */}
              <OpenStat
                icon={TrainFront}
                eyebrow="Travel time"
                value={null}
                label={displayData.travelTime}
                note="Voyara keeps transfers visible so the day stays practical, not just pretty."
              />

              {/* Trip progress */}
              <div className="py-5">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                  <Compass className="h-3 w-3 text-[#c8601a]" strokeWidth={1.5} />
                  Trip progress
                </div>
                <div className="flex gap-1">
                  {DAYS.map((day) => (
                    <div
                      key={day.day}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors duration-500',
                        day.day <= activeDay ? 'bg-[#c8601a]' : 'bg-white/10'
                      )}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-white/30">
                  Day {activeDay} of {DAYS.length}
                </p>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ActivitySlot({ icon: Icon, label, text, refined }) {
  return (
    <motion.div
      key={text}
      initial={refined ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg xs:rounded-xl border border-white/10 bg-[#1c1c1e]/60 p-2 xs:p-3 sm:p-4 backdrop-blur-sm"
    >
      <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        <Icon className="h-2.5 xs:h-3 sm:h-3.5 w-2.5 xs:w-3 sm:w-3.5 text-[#c8601a]" strokeWidth={2} />
        {label}
      </div>
      <p className="mt-1 xs:mt-1.5 sm:mt-2 text-[10px] xs:text-xs sm:text-sm font-light leading-relaxed text-white/85 line-clamp-3">{text}</p>
    </motion.div>
  );
}

function OpenStat({ icon: Icon, eyebrow, value, label, note, badge }) {
  return (
    <div className="py-3 xs:py-4 sm:py-6">
      <div className="mb-1 xs:mb-1.5 sm:mb-2 flex items-center gap-1.5 xs:gap-2 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        <Icon className="h-2.5 xs:h-3 sm:h-3.5 w-2.5 xs:w-3 sm:w-3.5 text-[#c8601a]" strokeWidth={2} />
        {eyebrow}
      </div>
      <div className="flex items-baseline gap-1.5 xs:gap-2 sm:gap-2.5">
        {value && (
          <span className="font-serif text-2xl xs:text-3xl sm:text-4xl font-light text-white">{value}</span>
        )}
        <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-white/60">{label}</span>
        {badge && (
          <span className={cn(
            'ml-auto text-[10px] xs:text-xs sm:text-sm font-semibold',
            badge.startsWith('-') ? 'text-emerald-400' : 'text-white/50'
          )}>
            {badge}
          </span>
        )}
      </div>
      {note && <p className="mt-1 xs:mt-1.5 sm:mt-2 text-[9px] xs:text-[10px] sm:text-xs font-light leading-relaxed text-white/35">{note}</p>}
    </div>
  );
}