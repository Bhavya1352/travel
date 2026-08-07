import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Wallet, Users, Compass, Sparkles, Heart, ChevronDown, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useTripPlanner } from '../hooks/useTripPlanner';
import { TRAVEL_STYLES, BUDGET_TIERS, INTERESTS, POPULAR_DESTINATIONS } from '../data/travelOptions';
import { cn } from '../utils/helpers';

// AI Trip Planner page — full form for entering trip details.
// Pre-fills from URL query params (from the hero planner bar).

export default function Planner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { plan, updateField, toggleInterest } = useTripPlanner({
    destination: searchParams.get('destination') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    budget: searchParams.get('budget') || 'midrange',
    travelers: parseInt(searchParams.get('travelers') || '2', 10),
    travelStyle: searchParams.get('travelStyle') || 'balanced',
  });

  const [destinationFocused, setDestinationFocused] = useState(false);
  const dropdownRef = useRef(null);

  const destinationResults = POPULAR_DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(plan.destination.toLowerCase())
  ).slice(0, 5);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDestinationFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    const params = new URLSearchParams({
      destination: plan.destination,
      startDate: plan.startDate,
      endDate: plan.endDate,
      budget: plan.budget,
      travelers: String(plan.travelers),
      travelStyle: plan.travelStyle,
      interests: plan.interests.join(','),
    });
    navigate(`/itinerary?${params.toString()}`);
  };

  const isFormValid = plan.destination && plan.startDate && plan.endDate;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 xs:px-5 sm:px-6 md:px-8 pb-16 xs:pb-18 sm:pb-20 pt-24 xs:pt-28 sm:pt-32 lg:pt-40 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8601a]">
            AI Trip Planner
          </span>
          <h1 className="mt-3 font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-[#1a2e22]">
            Plan your journey,
            <br />
            <span className="italic">tailored to you.</span>
          </h1>
          <p className="mx-auto mt-3 xs:mt-4 max-w-xs xs:max-w-sm sm:max-w-md text-xs xs:text-sm sm:text-base font-light leading-relaxed text-[#1a2e22]/50">
            Share your travel preferences and let AI craft a personalized day-by-day itinerary.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-[#1a2e22]/10 bg-white p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 shadow-sm overflow-hidden"
        >
          {/* Destination */}
          <FormField label="Where to?" icon={MapPin}>
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                value={plan.destination}
                onChange={(e) => updateField('destination', e.target.value)}
                onFocus={() => setDestinationFocused(true)}
                placeholder="Search a destination..."
                className="w-full rounded-xl border border-[#1a2e22]/10 bg-[#faf8f5] px-3 xs:px-4 py-2 xs:py-3 text-xs xs:text-sm font-light text-[#1a2e22] placeholder-[#1a2e22]/30 focus:border-[#c8601a] focus:outline-none"
              />
              {destinationFocused && destinationResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#1a2e22]/10 bg-white shadow-lg">
                  {destinationResults.map((d) => (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => {
                        updateField('destination', d.name);
                        setDestinationFocused(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#faf8f5]"
                    >
                      <img src={d.image} alt="" className="h-10 w-14 rounded-lg object-cover" />
                      <div>
                        <div className="text-sm font-light text-[#1a2e22]">{d.name}</div>
                        <div className="text-xs text-[#1a2e22]/40">{d.country}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FormField>

          {/* Dates */}
          <div className="grid gap-4 xs:gap-5 sm:gap-6 sm:grid-cols-2">
            <FormField label="Start Date" icon={Calendar}>
              <input
                type="date"
                value={plan.startDate}
                onChange={(e) => updateField('startDate', e.target.value)}
                className="w-full rounded-xl border border-[#1a2e22]/10 bg-[#faf8f5] px-3 xs:px-4 py-2 xs:py-3 text-xs xs:text-sm font-light text-[#1a2e22] focus:border-[#c8601a] focus:outline-none"
              />
            </FormField>
            <FormField label="End Date" icon={Calendar}>
              <input
                type="date"
                value={plan.endDate}
                onChange={(e) => updateField('endDate', e.target.value)}
                className="w-full rounded-xl border border-[#1a2e22]/10 bg-[#faf8f5] px-3 xs:px-4 py-2 xs:py-3 text-xs xs:text-sm font-light text-[#1a2e22] focus:border-[#c8601a] focus:outline-none"
              />
            </FormField>
          </div>

          {/* Budget & Travelers */}
          <div className="grid gap-4 xs:gap-5 sm:gap-6 sm:grid-cols-2">
            <FormField label="Budget" icon={Wallet}>
              <select
                value={plan.budget}
                onChange={(e) => updateField('budget', e.target.value)}
                className="w-full rounded-xl border border-[#1a2e22]/10 bg-[#faf8f5] px-3 xs:px-4 py-2 xs:py-3 text-xs xs:text-sm font-light text-[#1a2e22] focus:border-[#c8601a] focus:outline-none"
              >
                {BUDGET_TIERS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label} — {b.range}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Travelers" icon={Users}>
              <div className="flex items-center gap-3 rounded-xl border border-[#1a2e22]/10 bg-[#faf8f5] px-4 py-3">
                <button
                  onClick={() => updateField('travelers', Math.max(1, plan.travelers - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1a2e22]/15 text-[#1a2e22] hover:bg-[#1a2e22]/5"
                >
                  −
                </button>
                <span className="flex-1 text-center text-sm font-light text-[#1a2e22]">
                  {plan.travelers} {plan.travelers === 1 ? 'traveler' : 'travelers'}
                </span>
                <button
                  onClick={() => updateField('travelers', Math.min(20, plan.travelers + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1a2e22]/15 text-[#1a2e22] hover:bg-[#1a2e22]/5"
                >
                  +
                </button>
              </div>
            </FormField>
          </div>

          {/* Travel Style */}
          <FormField label="Travel Style" icon={Compass}>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:grid-cols-3">
              {TRAVEL_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateField('travelStyle', style.id)}
                  className={cn(
                    'rounded-xl border px-3 xs:px-4 py-2 xs:py-3 text-left transition-all duration-200',
                    plan.travelStyle === style.id
                      ? 'border-[#c8601a] bg-[#c8601a]/5'
                      : 'border-[#1a2e22]/10 bg-[#faf8f5] hover:border-[#1a2e22]/20'
                  )}
                >
                  <div className="text-xs xs:text-sm font-medium text-[#1a2e22]">{style.label}</div>
                  <div className="mt-0.5 text-[10px] xs:text-xs font-light text-[#1a2e22]/40 line-clamp-2">
                    {style.description}
                  </div>
                </button>
              ))}
            </div>
          </FormField>

          {/* Interests */}
          <FormField label="Interests" icon={Heart}>
            <div className="flex flex-wrap gap-1.5 xs:gap-2">
              {INTERESTS.map((interest) => {
                const selected = plan.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      'flex items-center gap-1 xs:gap-1.5 rounded-full border px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-[11px] xs:text-xs sm:text-sm font-light transition-all duration-200',
                      selected
                        ? 'border-[#c8601a] bg-[#c8601a]/5 text-[#c8601a]'
                        : 'border-[#1a2e22]/10 bg-[#faf8f5] text-[#1a2e22]/60 hover:border-[#1a2e22]/20'
                    )}
                  >
                    {selected && <Check className="h-3 w-3" strokeWidth={2} />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </FormField>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="group mt-6 xs:mt-8 flex w-full items-center justify-center gap-1.5 xs:gap-2 rounded-2xl bg-[#c8601a] px-6 xs:px-8 py-3 xs:py-4 text-xs xs:text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#e07a35] hover:shadow-lg hover:shadow-[#c8601a]/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            Generate my itinerary
          </button>
          {!isFormValid && (
            <p className="mt-2 xs:mt-3 text-center text-[10px] xs:text-xs font-light text-[#1a2e22]/30">
              Fill in destination and dates to continue
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function FormField({ label, icon: Icon, children }) {
  return (
    <div className="mb-6">
      <div className="mb-1.5 xs:mb-2 flex items-center gap-1 xs:gap-1.5 text-[10px] xs:text-xs font-medium uppercase tracking-widest text-[#1a2e22]/40">
        <Icon className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={1.5} />
        {label}
      </div>
      {children}
    </div>
  );
}
