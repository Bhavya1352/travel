import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Wallet, Users, Compass, Sparkles, Heart, ChevronDown, Check, Search, Plane, Gem, Mountain, Camera, Sun, Flame } from 'lucide-react';
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

      <div className="mx-auto max-w-4xl px-3 xs:px-4 sm:px-5 md:px-6 pb-12 xs:pb-14 sm:pb-16 md:pb-18 lg:pb-20 pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-40 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 xs:mb-14 sm:mb-16"
        >
          <div className="relative">
            {/* Decorative line */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-12 xs:h-14 sm:h-16 w-[1px] bg-gradient-to-b from-transparent via-[#C8601A]/30 to-transparent"></div>
            
            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 xs:gap-2 rounded-full border border-[#C8601A]/20 bg-[#C8601A]/5 px-3 xs:px-4 py-1.5 xs:py-2 mb-4 xs:mb-6">
                <Sparkles className="h-3 xs:h-3.5 w-3 xs:w-3.5 text-[#C8601A]" strokeWidth={1.5} />
                <span className="text-[9px] xs:text-[10px] font-medium uppercase tracking-[0.25em] text-[#C8601A]">
                  AI Trip Planner
                </span>
              </div>
              
              {/* Main heading */}
              <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#1a2e22]">
                Plan your journey,
                <br />
                <span className="italic text-[#C8601A]">tailored to you.</span>
              </h1>
              
              {/* Subtitle with decorative elements */}
              <div className="mt-4 xs:mt-6 flex items-center justify-center gap-3 xs:gap-4">
                <div className="h-[1px] w-8 xs:w-12 bg-gradient-to-r from-transparent to-[#1a2e22]/20"></div>
                <p className="max-w-[200px] xs:max-w-md text-xs xs:text-sm font-light leading-relaxed text-[#1a2e22]/50">
                  Share your travel preferences and let AI craft a personalized day-by-day itinerary.
                </p>
                <div className="h-[1px] w-8 xs:w-12 bg-gradient-to-l from-transparent to-[#1a2e22]/20"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[16px] xs:rounded-[20px] border border-[#1a2e22]/8 bg-[#FDFBF7] p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_4px_24px_rgba(26,46,34,0.08),0_1px_3px_rgba(26,46,34,0.04)] overflow-hidden"
        >
          {/* Decorative orange accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C8601A] via-[#C8601A]/80 to-transparent"></div>
          
          {/* Tiny compass/travel mark */}
          <div className="absolute top-3 xs:top-4 right-3 xs:right-4 opacity-20">
            <Compass className="h-3.5 xs:h-4 w-3.5 xs:w-4 text-[#C8601A]" strokeWidth={1.5} />
          </div>
          {/* Destination */}
          <FormField label="01 — DESTINATION" icon={MapPin}>
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 h-3.5 xs:h-4 w-3.5 xs:w-4 text-[#1a2e22]/30" strokeWidth={1.5} />
                <input
                  type="text"
                  value={plan.destination}
                  onChange={(e) => updateField('destination', e.target.value)}
                  onFocus={() => setDestinationFocused(true)}
                  placeholder="Search a destination..."
                  className="w-full rounded-[10px] xs:rounded-[12px] border border-[#1a2e22]/8 bg-[#F7F4EE] pl-9 xs:pl-11 pr-3 xs:pr-4 py-2.5 xs:py-3.5 text-xs xs:text-sm font-light text-[#1a2e22] placeholder-[#1a2e22]/25 focus:border-[#C8601A] focus:outline-none focus:ring-1 focus:ring-[#C8601A]/20 transition-all duration-200"
                />
              </div>
              {destinationFocused && destinationResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[10px] xs:rounded-[12px] border border-[#1a2e22]/8 bg-[#FDFBF7] shadow-[0_8px_32px_rgba(26,46,34,0.12)]">
                  {destinationResults.map((d) => (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => {
                        updateField('destination', d.name);
                        setDestinationFocused(false);
                      }}
                      className="flex w-full items-center gap-2 xs:gap-3 px-3 xs:px-4 py-2 xs:py-3 text-left hover:bg-[#F7F4EE] transition-colors duration-150"
                    >
                      <img src={d.image} alt="" loading="lazy" decoding="async" className="h-8 xs:h-10 w-12 xs:w-14 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs xs:text-sm font-light text-[#1a2e22]">{d.name}</div>
                        <div className="text-[10px] xs:text-xs text-[#1a2e22]/40">{d.country}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FormField>

          {/* Dates */}
          <FormField label="02 — WHEN" icon={Calendar}>
            <div className="relative">
              <div className="grid gap-3 xs:gap-4 sm:grid-cols-2">
                <div className="relative">
                  <Calendar className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 h-3.5 xs:h-4 w-3.5 xs:w-4 text-[#1a2e22]/30" strokeWidth={1.5} />
                  <input
                    type="date"
                    value={plan.startDate}
                    onChange={(e) => updateField('startDate', e.target.value)}
                    className="w-full rounded-[10px] xs:rounded-[12px] border border-[#1a2e22]/8 bg-[#F7F4EE] pl-9 xs:pl-11 pr-3 xs:pr-4 py-2.5 xs:py-3.5 text-xs xs:text-sm font-light text-[#1a2e22] focus:border-[#C8601A] focus:outline-none focus:ring-1 focus:ring-[#C8601A]/20 transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 h-3.5 xs:h-4 w-3.5 xs:w-4 text-[#1a2e22]/30" strokeWidth={1.5} />
                  <input
                    type="date"
                    value={plan.endDate}
                    onChange={(e) => updateField('endDate', e.target.value)}
                    className="w-full rounded-[10px] xs:rounded-[12px] border border-[#1a2e22]/8 bg-[#F7F4EE] pl-9 xs:pl-11 pr-3 xs:pr-4 py-2.5 xs:py-3.5 text-xs xs:text-sm font-light text-[#1a2e22] focus:border-[#C8601A] focus:outline-none focus:ring-1 focus:ring-[#C8601A]/20 transition-all duration-200"
                  />
                </div>
              </div>
              {/* Subtle divider */}
              <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 xs:h-8 w-[1px] bg-[#1a2e22]/8"></div>
            </div>
          </FormField>

          {/* Budget & Travelers */}
          <FormField label="03 — BUDGET & TRAVELERS" icon={Wallet}>
            <div className="grid gap-3 xs:gap-4 sm:gap-6 sm:grid-cols-2">
              <div className="relative">
                <Wallet className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 h-3.5 xs:h-4 w-3.5 xs:w-4 text-[#1a2e22]/30" strokeWidth={1.5} />
                <select
                  value={plan.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className="w-full appearance-none rounded-[10px] xs:rounded-[12px] border border-[#1a2e22]/8 bg-[#F7F4EE] pl-9 xs:pl-11 pr-8 xs:pr-10 py-2.5 xs:py-3.5 text-xs xs:text-sm font-light text-[#1a2e22] focus:border-[#C8601A] focus:outline-none focus:ring-1 focus:ring-[#C8601A]/20 transition-all duration-200 cursor-pointer"
                >
                  {BUDGET_TIERS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label} — {b.range}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 xs:right-4 top-1/2 -translate-y-1/2 h-3.5 xs:h-4 w-3.5 xs:w-4 text-[#1a2e22]/30 pointer-events-none" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-2 xs:gap-3 rounded-[10px] xs:rounded-[12px] border border-[#1a2e22]/8 bg-[#F7F4EE] px-3 xs:px-4 py-2.5 xs:py-3.5">
                <button
                  onClick={() => updateField('travelers', Math.max(1, plan.travelers - 1))}
                  className="flex h-7 xs:h-8 w-7 xs:w-8 items-center justify-center rounded-full border border-[#1a2e22]/12 text-[#1a2e22] hover:bg-[#1a2e22]/5 transition-colors duration-150"
                >
                  −
                </button>
                <span className="flex-1 text-center text-xs xs:text-sm font-light text-[#1a2e22]">
                  {plan.travelers} {plan.travelers === 1 ? 'traveler' : 'travelers'}
                </span>
                <button
                  onClick={() => updateField('travelers', Math.min(20, plan.travelers + 1))}
                  className="flex h-7 xs:h-8 w-7 xs:w-8 items-center justify-center rounded-full border border-[#1a2e22]/12 text-[#1a2e22] hover:bg-[#1a2e22]/5 transition-colors duration-150"
                >
                  +
                </button>
              </div>
            </div>
          </FormField>

          {/* Travel Style */}
          <FormField label="04 — TRAVEL STYLE" icon={Compass}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3">
              {TRAVEL_STYLES.map((style) => {
                const isSelected = plan.travelStyle === style.id;
                const iconMap = {
                  luxury: Gem,
                  adventure: Mountain,
                  cultural: Camera,
                  relaxed: Sun,
                  family: Users,
                  romantic: Flame,
                };
                const Icon = iconMap[style.id] || Compass;
                
                return (
                  <button
                    key={style.id}
                    onClick={() => updateField('travelStyle', style.id)}
                    className={cn(
                      'relative group rounded-[10px] xs:rounded-[12px] border p-3 xs:p-4 text-left transition-all duration-300 hover:-translate-y-0.5',
                      isSelected
                        ? 'border-[#1A2E22] bg-[#1A2E22] shadow-md'
                        : 'border-[#1a2e22]/8 bg-[#F7F4EE] hover:border-[#1a2e22]/15 hover:shadow-sm'
                    )}
                  >
                    {/* Orange accent indicator when selected */}
                    {isSelected && (
                      <div className="absolute top-2 xs:top-3 right-2 xs:right-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#C8601A]"></div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2 xs:gap-3">
                      <div className={cn(
                        'flex h-8 xs:h-9 w-8 xs:w-9 items-center justify-center rounded-lg transition-colors duration-200',
                        isSelected ? 'bg-white/10' : 'bg-[#1a2e22]/5'
                      )}>
                        <Icon className={cn(
                          'h-3.5 xs:h-4 w-3.5 xs:w-4',
                          isSelected ? 'text-white' : 'text-[#1a2e22]/60'
                        )} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className={cn(
                          'text-xs xs:text-sm font-medium leading-tight',
                          isSelected ? 'text-white' : 'text-[#1a2e22]'
                        )}>
                          {style.label}
                        </div>
                        <div className={cn(
                          'mt-0.5 xs:mt-1 text-[10px] xs:text-xs font-light leading-relaxed line-clamp-2',
                          isSelected ? 'text-white/70' : 'text-[#1a2e22]/40'
                        )}>
                          {style.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </FormField>

          {/* Interests */}
          <FormField label="05 — INTERESTS" icon={Heart}>
            <div className="flex flex-wrap gap-1.5 xs:gap-2">
              {INTERESTS.map((interest) => {
                const selected = plan.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      'flex items-center gap-1.5 xs:gap-2 rounded-full border px-2.5 xs:px-3.5 sm:px-4 py-1.5 xs:py-2 text-[10px] xs:text-xs font-light transition-all duration-200 hover:scale-105',
                      selected
                        ? 'border-[#1A2E22] bg-[#1A2E22] text-white shadow-sm'
                        : 'border-[#1a2e22]/8 bg-[#F7F4EE] text-[#1a2e22]/60 hover:border-[#1a2e22]/15'
                    )}
                  >
                    {selected && <Check className="h-2.5 xs:h-3 w-2.5 xs:w-3" strokeWidth={2} />}
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
            className="group mt-6 xs:mt-8 flex w-full items-center justify-center gap-1.5 xs:gap-2 rounded-[10px] xs:rounded-[12px] bg-gradient-to-br from-[#1A2E22] to-[#15231A] px-6 xs:px-8 py-3 xs:py-4 text-xs xs:text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1A2E22]/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            <div className="relative">
              <Sparkles className="h-3.5 xs:h-4 w-3.5 xs:w-4 text-[#C8601A]" strokeWidth={1.5} />
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#C8601A]/20 blur-sm"></div>
            </div>
            Generate my itinerary
          </button>
          {!isFormValid && (
            <p className="mt-2 xs:mt-3 text-center text-[10px] xs:text-xs font-light text-[#1a2e22]/40">
              Tell us where you're going and when — we'll design the rest.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function FormField({ label, icon: Icon, children }) {
  return (
    <div className="mb-6 xs:mb-8">
      <div className="mb-2 xs:mb-3 flex items-center gap-1.5 xs:gap-2 text-[9px] xs:text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a2e22]/35">
        <Icon className="h-3 w-3" strokeWidth={1.5} />
        {label}
      </div>
      {children}
    </div>
  );
}
