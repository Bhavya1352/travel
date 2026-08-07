import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Droplets, Wind } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Maps weather conditions to icons.
const WEATHER_ICONS = {
  Sunny: Sun,
  'Partly Cloudy': Cloud,
  Cloudy: Cloud,
  Rainy: CloudRain,
};

// Weather widget showing current conditions and 5-day forecast.
export default function WeatherWidget({ weather, forecast }) {
  if (!weather) return null;
  const WeatherIcon = WEATHER_ICONS[weather.condition] || Sun;

  return (
    <ScrollReveal>
      <div className="overflow-hidden rounded-3xl border border-[#1a2e22]/10 bg-gradient-to-br from-[#1a2e22] to-[#2d4a38] p-8 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/40">
              Current Weather
            </p>
            <p className="mt-1 text-sm font-light text-white/60">{weather.destination}</p>
          </div>
          <WeatherIcon className="h-10 w-10 text-[#c8601a]" strokeWidth={1.5} />
        </div>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-serif text-5xl font-light">{weather.temp}°</span>
          <span className="text-sm font-light text-white/40">{weather.unit}</span>
        </div>
        <p className="mt-1 text-sm font-light text-white/60">{weather.condition}</p>

        {/* Stats */}
        <div className="mt-6 flex gap-6">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-white/40" strokeWidth={1.5} />
            <span className="text-sm font-light text-white/60">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-white/40" strokeWidth={1.5} />
            <span className="text-sm font-light text-white/60">{weather.wind} km/h</span>
          </div>
        </div>

        {/* Forecast */}
        {forecast && forecast.length > 0 && (
          <div className="mt-6 grid grid-cols-5 gap-2 border-t border-white/10 pt-6">
            {forecast.map((f) => {
              const FIcon = WEATHER_ICONS[f.condition] || Sun;
              return (
                <div key={f.day} className="flex flex-col items-center gap-1.5">
                  <span className="text-xs font-light text-white/40">{f.day}</span>
                  <FIcon className="h-5 w-5 text-white/50" strokeWidth={1.5} />
                  <span className="text-sm font-light text-white">{f.temp}°</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}
