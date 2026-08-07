import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Wallet, Compass } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { cn } from '../utils/helpers';

const STEPS = [
  {
    number: '01',
    title: 'Tell us your travel style',
    description:
      'Pick a destination, share your pace, and let Voyara understand whether the trip should feel restorative, adventurous, or culturally dense. No forms — just intent.',
    aside: 'Style prompt',
    asideBody: '"Balanced with a nature bias. Quiet mornings, local transport, and a few unhurried anchor moments each day."',
  },
  {
    number: '02',
    title: 'AI builds your personalized itinerary',
    description:
      'The planner assembles a day-by-day route with actual timing, real-world pacing, and morning / afternoon / evening structure that feels ready to use — not a wall of text.',
    aside: 'Generated',
    asideBody: '4 days in Kyoto — blocks balanced against transit, weather, and your daily budget.',
  },
  {
    number: '03',
    title: 'Voyara optimizes your budget',
    description:
      'Every recommendation is adjusted against your budget with transparent cost estimates, visible tradeoffs, and gentle savings where they make sense without flattening the experience.',
    aside: 'Day 2 spend',
    asideBody: '$142 — a cheaper train route and nature-first sequence trim cost without losing the day.',
  },
  {
    number: '04',
    title: 'Refine your journey with AI',
    description:
      'Change a prompt and watch the itinerary update in place. "Make Day 2 cheaper." "Add more nature." "Find somewhere quieter." The product behaves like a living trip designer.',
    aside: 'User prompt',
    asideBody: '"Make tomorrow slower." → Pace softened, margins widened, no rush.',
  },
];

export default function HowItWorks() {
  const [hovered, setHovered] = useState(0);

  return (
    <section id="how-it-works" className="bg-[#faf8f5] py-16 xs:py-20 sm:py-24 lg:py-32 xl:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">

        {/* Section header */}
        <div className="mb-10 xs:mb-12 sm:mb-16 lg:mb-20 max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-xl">
          <p className="mb-2 xs:mb-3 sm:mb-4 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#c8601a]">
            How It Works
          </p>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] text-[#1a2e22]">
            From intent
            <br />
            <em>to itinerary.</em>
          </h2>
        </div>

        {/* Layout Grid: Left (steps) + Right (dynamic live preview mockup) */}
        <div className="grid gap-6 xs:gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[1.4fr_400px]">

          {/* Steps List */}
          <div className="relative flex flex-col">
            {STEPS.map((step, i) => {
              const isActive = hovered === i;
              return (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <Link
                    to="/planner"
                    onMouseEnter={() => setHovered(i)}
                    className={cn(
                      'group relative flex cursor-pointer flex-col gap-2 xs:gap-3 border-t border-[#1a2e22]/20 py-6 xs:py-8 pl-0 transition-all duration-500 lg:py-10 lg:pl-6 border-l-2 border-l-transparent',
                      isActive ? 'lg:border-l-[#c8601a] bg-white/20' : ''
                    )}
                  >
                    {/* Number + Title Row */}
                    <div className="flex items-center gap-3 xs:gap-4 sm:gap-6">
                      <span
                        className={cn(
                          'font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-light leading-none transition-colors duration-500',
                          isActive ? 'text-[#c8601a]' : 'text-[#1a2e22]/20'
                        )}
                      >
                        {step.number}
                      </span>
                      <h3
                        className={cn(
                          'font-serif text-lg xs:text-xl sm:text-2xl lg:text-3xl font-light leading-snug transition-colors duration-300',
                          isActive ? 'text-[#1a2e22]' : 'text-[#1a2e22]/70'
                        )}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Description underneath (indented) */}
                    <p className="pl-10 xs:pl-12 sm:pl-14 max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-xl text-[10px] xs:text-xs sm:text-sm font-light leading-relaxed text-[#1a2e22]/50">
                      {step.description}
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
            <div className="border-t border-[#1a2e22]/20" />
          </div>

          {/* Right: Dynamic Interactive Live Mockup Card */}
          <div className="hidden lg:block">
            <div className="sticky top-24 xs:top-28 sm:top-32 rounded-2xl border border-[#1a2e22]/15 bg-white p-4 xs:p-5 sm:p-6 md:p-8 shadow-xl shadow-[#1a2e22]/5">
              <div className="mb-3 xs:mb-4 flex items-center justify-between border-b border-[#1a2e22]/10 pb-2 xs:pb-3">
                <span className="text-[9px] xs:text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1a2e22]/40">
                  Live Preview
                </span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hovered}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {hovered === 0 && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-semibold uppercase tracking-wider text-[#c8601a]">
                          <Compass className="h-3.5 xs:h-4 w-3.5 xs:w-4" />
                          Style Configurator
                        </div>
                        <p className="font-serif text-base xs:text-lg font-light text-[#1a2e22]">
                          "Balanced pace with a focus on local culture, heritage gardens, and slow mornings."
                        </p>
                        <div className="flex gap-1.5 xs:gap-2">
                          <span className="rounded-full bg-[#1a2e22]/5 px-2 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs text-[#1a2e22]/60">Cultural</span>
                          <span className="rounded-full bg-[#1a2e22]/5 px-2 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs text-[#1a2e22]/60">Restorative</span>
                        </div>
                      </div>
                    )}

                    {hovered === 1 && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-semibold uppercase tracking-wider text-[#c8601a]">
                          <Calendar className="h-4 w-4" />
                          Itinerary Engine
                        </div>
                        <div className="border-l-2 border-[#1a2e22]/15 pl-3 xs:pl-4 py-1">
                          <div className="text-[10px] xs:text-xs font-semibold text-[#1a2e22]/40">DAY 02 — MORNING</div>
                          <div className="text-xs xs:text-sm font-medium text-[#1a2e22] mt-0.5">Zen meditation & tea walk</div>
                          <div className="text-[10px] xs:text-xs text-[#1a2e22]/50 mt-1">20-min taxi, early crowd skip included.</div>
                        </div>
                      </div>
                    )}

                    {hovered === 2 && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-semibold uppercase tracking-wider text-[#c8601a]">
                          <Wallet className="h-4 w-4" />
                          Cost Rebalancer
                        </div>
                        <div className="flex items-baseline gap-1.5 xs:gap-2">
                          <span className="font-serif text-2xl xs:text-3xl font-light text-[#1a2e22]">$142</span>
                          <span className="text-[10px] xs:text-xs text-[#1a2e22]/40">Daily spend</span>
                          <span className="ml-auto text-[10px] xs:text-xs font-bold text-emerald-600">- $42 saved</span>
                        </div>
                        <p className="text-[10px] xs:text-xs text-[#1a2e22]/50 leading-relaxed">
                          Replaced private transfers with Kyoto local rail, and added free-entry imperial garden slots.
                        </p>
                      </div>
                    )}

                    {hovered === 3 && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-semibold uppercase tracking-wider text-[#c8601a]">
                          <Sparkles className="h-4 w-4" />
                          AI Refiner
                        </div>
                        <div className="rounded-xl bg-[#c8601a]/5 border border-[#c8601a]/10 p-2 xs:p-3">
                          <div className="text-[10px] xs:text-xs text-[#c8601a] font-semibold">USER REQUEST</div>
                          <div className="text-xs xs:text-sm text-[#1a2e22] font-medium mt-1">"Make Day 2 cheaper and add nature."</div>
                        </div>
                        <p className="text-[10px] xs:text-xs text-[#1a2e22]/50 leading-relaxed">
                          Itinerary updated: private gallery replaced with Arashiyama forest walk.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
