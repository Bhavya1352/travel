import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, DollarSign, Utensils, Camera, Compass, Car, RefreshCw, Waves, Mountain } from 'lucide-react';
import { cn } from '../utils/helpers';
import OptimizedImage from './OptimizedImage';
import { useDeviceOptimization } from '../hooks/useDeviceOptimization';

// Maps activity categories to icons for the timeline.
const CATEGORY_ICONS = {
  Food: Utensils,
  Sightseeing: Camera,
  Experience: Compass,
  Transport: Car,
  Beach: Waves,
  Hike: Mountain,
  Leisure: Compass,
};

// Day-by-day visual timeline for the itinerary results page.
// Each day is a collapsible card with a vertical timeline of activities.

export default function DayTimeline({ days, onRegenerateDay }) {
  const [openDay, setOpenDay] = useState(1);
  const [regenerating, setRegenerating] = useState(null);
  const { isMobile } = useDeviceOptimization();

  const handleRegenerate = async (dayNumber) => {
    setRegenerating(dayNumber);
    await onRegenerateDay?.(dayNumber);
    setRegenerating(null);
  };

  return (
    <div className="flex flex-col gap-3 xs:gap-4">
      {days.map((day) => {
        const isOpen = openDay === day.day;
        return (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: day.day * 0.05 }}
            className="overflow-hidden rounded-2xl xs:rounded-3xl border border-[#1a2e22]/10 bg-white shadow-sm"
          >
            {/* Day header */}
            <button
              onClick={() => setOpenDay(isOpen ? null : day.day)}
              className="flex w-full items-center justify-between px-4 xs:px-5 sm:px-6 py-3 xs:py-4 sm:py-5 text-left transition-colors hover:bg-[#faf8f5]"
            >
              <div className="flex items-center gap-3 xs:gap-4">
                <div className="flex h-10 xs:h-11 sm:h-12 w-10 xs:w-11 sm:w-12 flex-col items-center justify-center rounded-full bg-[#1a2e22] text-white">
                  <span className="text-[9px] xs:text-[10px] font-medium uppercase tracking-wider text-white/50">Day</span>
                  <span className="font-serif text-base xs:text-lg font-light leading-none">{day.day}</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg xs:text-xl font-light text-[#1a2e22]">{day.title}</h3>
                  <p className="text-[10px] xs:text-xs font-light text-[#1a2e22]/40">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} · {day.theme}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 xs:gap-4">
                <span className="hidden text-xs xs:text-sm font-light text-[#1a2e22]/40 sm:block">
                  {day.activities.length} activities
                </span>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-4 xs:h-5 w-4 xs:w-5 text-[#1a2e22]/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </button>

            {/* Activities timeline */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6">
                    <div className="relative ml-5 xs:ml-6 border-l border-[#1a2e22]/10 pl-6 xs:pl-8">
                      {day.activities.map((activity, i) => {
                        const Icon = CATEGORY_ICONS[activity.category] || Compass;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="relative mb-4 xs:mb-5 sm:mb-6 last:mb-0"
                          >
                            {/* Timeline dot */}
                            <div className="absolute -left-[2.2rem] xs:-left-[2.6rem] top-1 flex h-6 xs:h-7 w-6 xs:w-7 items-center justify-center rounded-full border-2 border-[#faf8f5] bg-[#c8601a] text-white">
                              <Icon className="h-3 xs:h-3.5 w-3 xs:w-3.5" strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col gap-2 xs:gap-3 rounded-xl xs:rounded-2xl bg-[#faf8f5] p-3 xs:p-4 sm:flex-row sm:items-start">
                              {/* Activity image */}
                              {activity.image && (
                                <OptimizedImage
                                  src={activity.image}
                                  alt={activity.title}
                                  className="h-24 xs:h-28 sm:h-32 w-full rounded-lg xs:rounded-xl object-cover sm:h-20 sm:w-28 sm:flex-shrink-0"
                                  loading="lazy"
                                  isMobile={isMobile}
                                  sizes="(min-width: 640px) 112px, 100vw"
                                  width={112}
                                  height={80}
                                />
                              )}

                              {/* Activity details */}
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-1.5 xs:gap-2">
                                  <div>
                                    <div className="flex items-center gap-1.5 xs:gap-2">
                                      <span className="flex items-center gap-0.5 xs:gap-1 text-[10px] xs:text-xs font-medium text-[#c8601a]">
                                        <Clock className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
                                        {activity.time}
                                      </span>
                                      <span className="text-[10px] xs:text-xs font-light text-[#1a2e22]/30">·</span>
                                      <span className="text-[10px] xs:text-xs font-light text-[#1a2e22]/40">{activity.duration}</span>
                                    </div>
                                    <h4 className="mt-0.5 xs:mt-1 text-sm xs:text-base font-medium text-[#1a2e22]">{activity.title}</h4>
                                  </div>
                                  {activity.cost > 0 && (
                                    <span className="flex items-center gap-0.5 xs:gap-1 rounded-full bg-[#1a2e22]/5 px-2 xs:px-2.5 py-0.5 xs:py-1 text-[10px] xs:text-xs font-medium text-[#1a2e22]/60">
                                      <DollarSign className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
                                      {activity.cost}
                                    </span>
                                  )}
                                </div>
                                <p className="mt-1 xs:mt-1.5 text-xs xs:text-sm font-light leading-relaxed text-[#1a2e22]/50">
                                  {activity.description}
                                </p>
                                {activity.location && (
                                  <div className="mt-1.5 xs:mt-2 flex items-center gap-0.5 xs:gap-1 text-[10px] xs:text-xs font-light text-[#1a2e22]/30">
                                    <MapPin className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
                                    {activity.location.name}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Regenerate button */}
                    {onRegenerateDay && (
                      <button
                        onClick={() => handleRegenerate(day.day)}
                        disabled={regenerating === day.day}
                        className="mt-3 xs:mt-4 flex items-center gap-1.5 xs:gap-2 rounded-full border border-[#1a2e22]/10 px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 text-xs xs:text-sm font-light text-[#1a2e22]/50 transition-colors hover:border-[#c8601a] hover:text-[#c8601a] disabled:opacity-50"
                      >
                        <RefreshCw className={cn('h-3 xs:h-3.5 w-3 xs:w-3.5', regenerating === day.day && 'animate-spin')} strokeWidth={1.5} />
                        {regenerating === day.day ? 'Regenerating...' : 'Regenerate this day'}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
