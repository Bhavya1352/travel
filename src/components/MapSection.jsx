import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Interactive map section placeholder.
// In production, this would render an actual map using react-map-gl or Leaflet
// with markers for each location. For now, it shows a stylized map visualization
// with location markers positioned by lat/lng.

export default function MapSection({ mapData, title = 'Interactive Map' }) {
  if (!mapData) return null;

  const { center, markers } = mapData;

  // Normalize marker positions to a 0-100% grid for the placeholder visualization.
  const positions = markers.map((m) => {
    const latOffset = ((m.lat - center.lat) * 500) + 50;
    const lngOffset = ((m.lng - center.lng) * 500) + 50;
    return {
      ...m,
      x: Math.max(5, Math.min(95, lngOffset)),
      y: Math.max(5, Math.min(95, 100 - latOffset)),
    };
  });

  return (
    <ScrollReveal>
      <div className="overflow-hidden rounded-3xl border border-[#1a2e22]/10 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#1a2e22]/8 px-6 py-4">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-[#c8601a]" strokeWidth={1.5} />
            <h3 className="font-serif text-xl font-light text-[#1a2e22]">{title}</h3>
          </div>
          <span className="text-xs font-light text-[#1a2e22]/40">
            {markers.length} locations
          </span>
        </div>

        {/* Map visualization */}
        <div className="relative h-96 bg-gradient-to-br from-[#1a2e22] to-[#2d4a38]">
          {/* Grid lines for a map-like feel */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Markers */}
          {positions.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, type: 'spring', stiffness: 200 }}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8601a] text-white shadow-lg ring-2 ring-white/20"
                >
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                </motion.div>
                {/* Tooltip */}
                <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#1c1c1e]/90 px-3 py-1.5 text-xs font-light text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-medium">{m.title || m.locationName}</span>
                  {m.day && <span className="ml-1 text-white/40">· Day {m.day}</span>}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Center indicator */}
          <div className="absolute left-1/2 top-1/2 h-px w-px">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
              <Navigation className="h-3 w-3 text-white/30" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Location list */}
        <div className="max-h-48 overflow-y-auto px-6 py-4">
          <div className="flex flex-col gap-2">
            {markers.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#c8601a]/10 text-xs font-medium text-[#c8601a]">
                  {i + 1}
                </span>
                <span className="font-light text-[#1a2e22]">
                  {m.title || m.locationName}
                </span>
                {m.day && (
                  <span className="text-xs font-light text-[#1a2e22]/30">· Day {m.day}</span>
                )}
                {m.time && (
                  <span className="text-xs font-light text-[#1a2e22]/30">· {m.time}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
