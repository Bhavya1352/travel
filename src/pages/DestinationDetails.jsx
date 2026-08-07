import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Globe, Clock, DollarSign, Sparkles, Compass, Utensils, Lightbulb } from 'lucide-react';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import WeatherWidget from '../components/WeatherWidget';
import MapSection from '../components/MapSection';
import FavoriteButton from '../components/FavoriteButton';
import ScrollReveal from '../components/ScrollReveal';
import { getDestination, getAttractions } from '../services/placesService';
import { getWeather, getForecast } from '../services/weatherService';
import { getDestinationMapData } from '../services/mapsService';
import { useFavorites } from '../hooks/useFavorites';

// Destination Details page — overview, weather, attractions, experiences, tips.

export default function DestinationDetails() {
  const { id } = useParams();
  const { isFavoriteDestination, toggleDestination } = useFavorites();

  const { data: destination, isLoading, error, refetch } = useQuery({
    queryKey: ['destination', id],
    queryFn: () => getDestination(id),
  });

  const { data: weather } = useQuery({
    queryKey: ['weather', id],
    queryFn: () => getWeather(id),
  });

  const { data: forecast } = useQuery({
    queryKey: ['forecast', id],
    queryFn: () => getForecast(id),
  });

  const { data: mapData } = useQuery({
    queryKey: ['destinationMap', id],
    queryFn: () => getDestinationMapData(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar />
        <div className="pt-24 xs:pt-28 sm:pt-32">
          <Loader label="Loading destination..." />
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <Navbar />
        <div className="pt-24 xs:pt-28 sm:pt-32">
          <ErrorState message={error?.message || 'Destination not found'} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      {/* Hero image */}
      <div className="relative h-[50vh] xs:h-[55vh] sm:h-[60vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1e]/40 via-transparent to-[#1c1c1e]/80" />

        {/* Favorite */}
        <div className="absolute right-4 xs:right-6 top-20 xs:top-24 sm:top-28 lg:right-10 lg:top-32">
          <FavoriteButton
            isFavorite={isFavoriteDestination(destination.id)}
            onToggle={() => toggleDestination(destination.id)}
            size="md"
          />
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-5 sm:p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] xs:text-xs font-medium uppercase tracking-widest text-white/60">
              {destination.country} · {destination.region}
            </p>
            <h1 className="mt-2 font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white">
              {destination.name}
            </h1>
            <p className="mt-1.5 xs:mt-2 text-base xs:text-lg font-light italic text-white/70">{destination.tagline}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 pb-16 xs:pb-18 sm:pb-20 pt-8 xs:pt-10 sm:pt-12 overflow-hidden">
        {/* Back link */}
        <Link
          to="/destinations"
          className="mb-6 xs:mb-8 inline-flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm font-light text-[#1a2e22]/50 transition-colors hover:text-[#1a2e22]"
        >
          <ArrowLeft className="h-3.5 xs:h-4 w-3.5 xs:w-4" strokeWidth={1.5} />
          All destinations
        </Link>

        {/* Overview & quick facts */}
        <div className="grid gap-8 xs:gap-10 sm:gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="font-serif text-2xl xs:text-3xl font-light text-[#1a2e22]">Overview</h2>
              <p className="mt-3 xs:mt-4 text-sm xs:text-base font-light leading-relaxed text-[#1a2e22]/60">
                {destination.description}
              </p>
            </ScrollReveal>

            {/* Plan trip CTA */}
            <ScrollReveal delay={0.1}>
              <Link
                to={`/planner?destination=${encodeURIComponent(destination.name)}`}
                className="group mt-6 xs:mt-8 inline-flex items-center gap-1.5 xs:gap-2 rounded-full bg-[#c8601a] px-4 xs:px-5 sm:px-6 py-2 xs:py-3 text-xs xs:text-sm font-medium text-white transition-all duration-300 hover:bg-[#e07a35] hover:shadow-lg hover:shadow-[#c8601a]/30"
              >
                <Sparkles className="h-3.5 xs:h-4 w-3.5 xs:w-4" strokeWidth={1.5} />
                Plan a trip to {destination.name}
              </Link>
            </ScrollReveal>
          </div>

          {/* Quick facts */}
          <ScrollReveal delay={0.15}>
            <div className="rounded-3xl border border-[#1a2e22]/10 bg-white p-4 xs:p-5 sm:p-6 shadow-sm">
              <h3 className="mb-3 xs:mb-4 font-serif text-lg xs:text-xl font-light text-[#1a2e22]">Quick Facts</h3>
              <div className="flex flex-col gap-3 xs:gap-4">
                <FactRow icon={Calendar} label="Best Time" value={destination.bestTimeToVisit} />
                <FactRow icon={DollarSign} label="Avg. Daily Cost" value={`$${destination.avgDailyCost}`} />
                <FactRow icon={Globe} label="Currency" value={destination.currency} />
                <FactRow icon={MapPin} label="Language" value={destination.language} />
                <FactRow icon={Clock} label="Timezone" value={destination.timezone} />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Weather & Map */}
        <div className="mt-8 xs:mt-10 sm:mt-12 grid gap-4 xs:gap-6 sm:gap-8 lg:grid-cols-2">
          {weather && <WeatherWidget weather={weather} forecast={forecast} />}
          {mapData && <MapSection mapData={mapData} title="Location Map" />}
        </div>

        {/* Attractions */}
        <div className="mt-10 xs:mt-12 sm:mt-16">
          <ScrollReveal>
            <h2 className="mb-6 xs:mb-8 font-serif text-2xl xs:text-3xl font-light text-[#1a2e22]">
              Recommended Attractions
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 xs:gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {destination.attractions.map((attr, i) => (
              <ScrollReveal key={attr.name} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl border border-[#1a2e22]/8 bg-white shadow-sm">
                  <div className="relative h-32 xs:h-36 sm:h-40 overflow-hidden">
                    <motion.img
                      src={attr.image}
                      alt={attr.name}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="absolute left-2 xs:left-3 top-2 xs:top-3 rounded-full bg-white/90 px-2 xs:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs font-medium text-[#1a2e22] backdrop-blur-md">
                      {attr.type}
                    </span>
                  </div>
                  <div className="p-3 xs:p-4">
                    <h3 className="text-xs xs:text-sm font-medium text-[#1a2e22]">{attr.name}</h3>
                    <p className="mt-1 text-[10px] xs:text-xs font-light leading-relaxed text-[#1a2e22]/40">
                      {attr.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Experiences & Tips */}
        <div className="mt-10 xs:mt-12 sm:mt-16 grid gap-4 xs:gap-6 sm:gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-3xl border border-[#1a2e22]/10 bg-white p-4 xs:p-5 sm:p-6 md:p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Compass className="h-4 xs:h-5 w-4 xs:w-5 text-[#c8601a]" strokeWidth={1.5} />
                <h3 className="font-serif text-lg xs:text-xl font-light text-[#1a2e22]">Local Experiences</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {destination.experiences.map((exp, i) => (
                  <li key={i} className="flex items-start gap-2 xs:gap-3 text-xs xs:text-sm font-light text-[#1a2e22]/60">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c8601a]" />
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-3xl border border-[#1a2e22]/10 bg-white p-4 xs:p-5 sm:p-6 md:p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-4 xs:h-5 w-4 xs:w-5 text-[#c8601a]" strokeWidth={1.5} />
                <h3 className="font-serif text-lg xs:text-xl font-light text-[#1a2e22]">Travel Tips</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {destination.travelTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 xs:gap-3 text-xs xs:text-sm font-light text-[#1a2e22]/60">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1a2e22]/30" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

function FactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm font-light text-[#1a2e22]/40">
        <Icon className="h-3 xs:h-4 w-3 xs:w-4" strokeWidth={1.5} />
        {label}
      </div>
      <span className="text-xs xs:text-sm font-medium text-[#1a2e22]">{value}</span>
    </div>
  );
}
