import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import OptimizedImage, { generatePexelsSrcset } from './OptimizedImage';

// The stat chips that animate in — each represents an AI-personalized output
const STAT_ROWS = [
  [
    { value: 'Slow mornings', label: 'Pacing style' },
    { value: 'Local food', label: 'Cuisine focus' },
    { value: '€120 / day', label: 'Daily budget' },
    { value: 'Less crowded', label: 'Venue style' },
  ],
  [
    { value: 'No dead time', label: 'Transit buffer' },
    { value: 'Unrushed flow', label: 'Route density' },
    { value: 'Scenic trails', label: 'Nature focus' },
    { value: 'Uniquely yours', label: 'AI check' },
  ],
];

// Background images — different destination each time
const BG_IMAGE = 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg';

export default function PersonalizationStats() {
  return (
    <section className="relative overflow-hidden py-0">
      {/* Full-bleed destination photo */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={BG_IMAGE}
          srcset={generatePexelsSrcset(BG_IMAGE)}
          sizes="100vw"
          alt=""
          role="presentation"
          loading="lazy"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Rich overlay — dark forest green tinted */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e22]/88 via-[#1a2e22]/82 to-[#1a2e22]/92" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 xs:px-5 sm:px-6 py-20 xs:py-24 sm:py-28 lg:px-10 lg:py-36">

        {/* Header */}
        <div className="mb-12 xs:mb-14 sm:mb-16 flex flex-col gap-3 xs:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal variant="fadeLeft">
            <p className="mb-2 xs:mb-3 text-[10px] xs:text-[11px] font-medium uppercase tracking-[0.28em] text-[#c8601a]">
              Designed around you
            </p>
            <h2 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-light leading-[1.1] text-white">
              Built around the way
              <br />
              <em className="text-white/60">you travel.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeRight" delay={0.1}>
            <p className="max-w-xs text-xs xs:text-sm font-light leading-relaxed text-white/35 lg:text-right">
              Voyara doesn't generate a generic trip. It builds around your budget,
              pace, interests, and travel style — every detail is yours.
            </p>
          </ScrollReveal>
        </div>

        {/* Stat chip rows */}
        <div className="flex flex-col gap-3 xs:gap-4">
          {STAT_ROWS.map((row, rowIndex) => (
            <ScrollReveal key={rowIndex} delay={rowIndex * 0.08} variant="fadeUp">
              <div className="flex flex-wrap gap-2 xs:gap-3">
                {row.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: rowIndex * 0.08 + i * 0.06,
                    }}
                    className="group flex items-baseline gap-2 xs:gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 xs:px-5 py-2 xs:py-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-[#c8601a]/40 hover:bg-[#c8601a]/8 cursor-default"
                  >
                    <span className="font-serif text-base xs:text-lg font-light text-white group-hover:text-[#e07a35] transition-colors duration-300">
                      {stat.value}
                    </span>
                    <span className="text-[10px] xs:text-[11px] uppercase tracking-[0.2em] text-white/30">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-10 xs:mt-12 sm:mt-14 flex items-center gap-4 xs:gap-6">
          <div className="h-px flex-1 bg-white/8" />
          <p className="text-[10px] xs:text-[11px] font-medium uppercase tracking-[0.24em] text-white/20">
            AI-generated · unique to every traveler
          </p>
          <div className="h-px flex-1 bg-white/8" />
        </div>

      </div>
    </section>
  );
}
