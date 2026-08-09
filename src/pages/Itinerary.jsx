// import "leaflet/dist/leaflet.css";

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Users,
  Wallet,
  Compass,
  Navigation,
  Heart,
  Share2,
  SunMedium,
  UtensilsCrossed,
  TreePine,
  Check,
  RefreshCw
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useFavorites } from '../hooks/useFavorites';
import { useSavedTrips } from '../hooks/useSavedTrips';
import { BUDGET_TIERS, TRAVEL_STYLES } from '../data/travelOptions';
import { cn } from '../utils/helpers';
import { DESTINATIONS } from '../data/destinations';
import { getWeather } from '../services/weatherService';
import { convertCurrency } from '../services/currencyService';
import { validateAndEnrichPlace } from '../services/placesService';
import { generateItinerary } from '../services/aiService';

// Refinement prompt templates
const AI_REFINEMENTS = [
  { id: 'cheaper', label: 'Make Day 2 cheaper & outdoor-focused', icon: '🌿' },
  { id: 'slower', label: 'Slow down the morning pace', icon: '☕' },
  { id: 'luxury', label: 'Add premium cliffside dining options', icon: '🍷' },
  { id: 'quiet', label: 'Find off-the-beaten-path hidden gems', icon: '🤫' }
];

export default function Itinerary() {
  const [searchParams] = useSearchParams();
  const [loadingStep, setLoadingStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [animationDone, setAnimationDone] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const [activeRefinement, setActiveRefinement] = useState(null);
  const [isRefining, setIsRefining] = useState(false);
  const { toggleTrip, isFavoriteTrip } = useFavorites();
  const { saveTrip, removeTrip, hasTrip } = useSavedTrips();
  const [showToast, setShowToast] = useState(false);

  // Retrieve user choices from URL
  const destination = searchParams.get('destination') || 'Santorini, Greece';
  const startDate = searchParams.get('startDate') || '2025-06-15';
  const endDate = searchParams.get('endDate') || '2025-06-19';
  const budgetStyle = searchParams.get('budget') || 'midrange';
  const travelers = parseInt(searchParams.get('travelers') || '2', 10);
  const travelStyle = searchParams.get('travelStyle') || 'balanced';

  // Extract base destination if match exists
  const activeDest = DESTINATIONS.find((d) =>
    d.name.toLowerCase().includes(destination.toLowerCase().split(',')[0].trim())
  ) || DESTINATIONS[0];

  // Dynamic geocoded coordinates, currency, and destination name state
  const [coords, setCoords] = useState({ lat: activeDest.lat, lng: activeDest.lng });
  const [currencyCode, setCurrencyCode] = useState(activeDest.currency || 'EUR');
  const [destinationName, setDestinationName] = useState(activeDest.name);

  // State for real-world API data
  const [convertedBudget, setConvertedBudget] = useState('');
  const [weatherData, setWeatherData] = useState({ temp: 24, condition: 'Sunny', humidity: 50, wind: 8 });

  // Nominatim Geocoding lookup on mount/change
  useEffect(() => {
    async function geocodeDestination() {
      const matched = DESTINATIONS.find((d) =>
        d.name.toLowerCase().includes(destination.toLowerCase().split(',')[0].trim())
      );
      if (matched) {
        setCoords({ lat: matched.lat, lng: matched.lng });
        setCurrencyCode(matched.currency || 'EUR');
        setDestinationName(matched.name);
      } else {
        const result = await validateAndEnrichPlace(destination);
        if (result) {
          setCoords({ lat: result.lat, lng: result.lng });
          setDestinationName(destination);
          const label = result.displayName.toLowerCase();
          if (label.includes('india')) setCurrencyCode('INR');
          else if (label.includes('japan')) setCurrencyCode('JPY');
          else if (label.includes('united kingdom') || label.includes('uk')) setCurrencyCode('GBP');
          else if (label.includes('canada')) setCurrencyCode('CAD');
          else if (label.includes('france') || label.includes('italy') || label.includes('spain') || label.includes('germany') || label.includes('greece')) setCurrencyCode('EUR');
          else setCurrencyCode('USD');
        } else {
          setDestinationName(destination);
          setCoords({ lat: 48.8566, lng: 2.3522 }); // Paris fallback
          setCurrencyCode('EUR');
        }
      }
    }
    geocodeDestination();
  }, [destination]);

  // Fetch real weather using Open-Meteo API
  useEffect(() => {
    async function loadWeather() {
      const w = await getWeather(coords.lat, coords.lng);
      if (w) setWeatherData(w);
    }
    loadWeather();
  }, [coords.lat, coords.lng]);

  // Sample Day Itinerary Structure
  const [daysPlan, setDaysPlan] = useState([]);
  const [isItineraryLoading, setIsItineraryLoading] = useState(true);
  const [itineraryError, setItineraryError] = useState(null);
  const [isAiGenerated, setIsAiGenerated] = useState(null);

  // Generate AI itinerary on component mount
  useEffect(() => {
    async function loadItinerary() {
      try {
        const plan = {
          destination,
          startDate,
          endDate,
          budget: budgetStyle,
          travelers,
          travelStyle
        };
        const generatedItinerary = await generateItinerary(plan);
        console.log('Generated itinerary:', generatedItinerary);
        if (generatedItinerary && generatedItinerary.days_plan && generatedItinerary.days_plan.length > 0) {
          setDaysPlan(generatedItinerary.days_plan);
          setIsAiGenerated(generatedItinerary.isAiGenerated === true);
        } else {
          console.error('Invalid itinerary structure:', generatedItinerary);
          setItineraryError('Failed to generate itinerary. Please try again.');
        }
        setIsItineraryLoading(false);
      } catch (error) {
        console.error('Failed to generate itinerary:', error);
        setItineraryError('Failed to generate itinerary. Please try again.');
        setIsItineraryLoading(false);
      }
    }
    loadItinerary();
  }, [destination, startDate, endDate, budgetStyle, travelers, travelStyle]);

  // Fetch exchange rate conversion using Frankfurter API
  useEffect(() => {
    async function loadCurrency() {
      if (daysPlan.length === 0) return;
      const currentTotalCost = daysPlan.reduce((acc, curr) => acc + curr.budget, 0);
      if (currencyCode === 'EUR') {
        setConvertedBudget(`€${currentTotalCost.toLocaleString()} EUR`);
        return;
      }
      const converted = await convertCurrency(currentTotalCost, 'EUR', currencyCode);
      setConvertedBudget(`€${currentTotalCost.toLocaleString()} ≈ ${currencyCode} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
    }
    loadCurrency();
  }, [currencyCode, daysPlan]);

  // Loading Steps progression animation — marks animation as done when complete
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => setAnimationDone(true), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Only hide loading screen when BOTH animation AND data are ready
  useEffect(() => {
    if (animationDone && !isItineraryLoading) {
      setIsLoading(false);
    }
  }, [animationDone, isItineraryLoading]);

  // Handle AI Refinement simulations
  const handleRefine = (refId) => {
    if (isRefining) return;
    setIsRefining(true);
    setActiveRefinement(refId);

    setTimeout(() => {
      setDaysPlan((prev) =>
        prev.filter((day) => day && typeof day.day === 'number').map((day) => {

          if (refId === 'cheaper') {
            return {
              ...day,
              morning: `Explore the traditional, free-entry village alleys and local gardens near ${day.location}.`,
              afternoon: 'Nature walk around the scenic paths and local peaks (zero entrance fees).',
              evening: 'Dinner at an authentic local market stall or street food spot.',
              budget: Math.floor((day.budget || 100) * 0.6),
              note: 'Rebalanced to save expenses'
            };
          }
          if (refId === 'slower') {
            return {
              ...day,
              morning: 'Late morning breakfast, unhurried coffee at a quiet local cafe (no schedule before 10 AM).',
              afternoon: 'Extended leisure time to explore at your own pace.',
              note: 'Pacing slowed down'
            };
          }
          if (refId === 'luxury') {
            return {
              ...day,
              morning: 'Private luxury transfer to exclusive viewpoints.',
              afternoon: 'Guided VIP tour with skip-the-line access.',
              evening: 'Michelin-starred sunset tasting menu at the best local culinary spot.',
              budget: (day.budget || 100) + 200,
              note: 'Premium luxury upgrade added'
            };
          }
          if (refId === 'quiet') {
            return {
              ...day,
              morning: 'Early morning visit to secluded spots before crowds arrive.',
              afternoon: 'Visit the peaceful, crowd-free local ruins and old paths.',
              evening: 'Quiet dinner at a hidden family-run restaurant.',
              note: 'Off-path sequence applied'
            };
          }
          return day;
        })
      );
      setIsRefining(false);
    }, 1800);
  };

  const tripId = `trip-${activeDest?.id || destination.replace(/\s+/g, '-').toLowerCase()}-${startDate}-${endDate}`;
  const isSaved = hasTrip(tripId);
  const selectedDay = daysPlan.find((d) => d && d.day === activeDay) || (daysPlan.length > 0 && daysPlan[0] ? daysPlan[0] : null);
  const totalCost = daysPlan.reduce((acc, curr) => acc + (curr?.budget || 0), 0);

  const handleSaveToggle = () => {
    if (isSaved) {
      removeTrip(tripId);
    } else {
      saveTrip({
        id: tripId,
        destination: destinationName,
        startDate: startDate,
        endDate: endDate,
        budget: budgetStyle,
        travelers: travelers,
        travelStyle: travelStyle,
        days: daysPlan.length,
        activities: daysPlan,
        totalCost: totalCost,
        image: activeDest?.image || 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
        status: 'planned'
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a2e22]">
      <Navbar />

      <AnimatePresence mode="wait">
        {isLoading ? (
          /* ─── STEP 1: PRE-LOADING SCREEN ─── */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-[15vh] xs:pt-[20vh] bg-[#1a2e22] text-white px-4 xs:px-6"
          >
            <div className="w-full max-w-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="mx-auto mb-6 xs:mb-8 flex h-12 xs:h-14 sm:h-16 w-12 xs:w-14 sm:w-16 items-center justify-center rounded-full border border-white/10"
              >
                <Sparkles className="h-5 xs:h-6 w-5 xs:w-6 text-[#c8601a]" />
              </motion.div>

              <h2 className="text-center font-serif text-2xl xs:text-3xl font-light tracking-wide text-white">
                Designing your journey
              </h2>
              <p className="text-center text-[10px] xs:text-xs uppercase tracking-widest text-[#c8601a] mt-1.5 xs:mt-2">
                to {destination}
              </p>

              {/* Progress Steps list */}
              <div className="mt-8 xs:mt-12 flex flex-col gap-3 xs:gap-4">
                {[
                  'Analyzing travel dates and seasons...',
                  'Optimizing daily budget & pacing parameters...',
                  'Selecting highly-rated local spots...',
                  'Compiling interactive weather and maps data...'
                ].map((step, idx) => {
                  const state = loadingStep > idx ? 'done' : loadingStep === idx ? 'loading' : 'pending';
                  return (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-center gap-2 xs:gap-3 transition-opacity duration-500',
                        state === 'pending' ? 'opacity-25' : 'opacity-100'
                      )}
                    >
                      <div className="flex h-4 xs:h-5 w-4 xs:w-5 shrink-0 items-center justify-center rounded-full border border-white/20">
                        {state === 'done' ? (
                          <Check className="h-2.5 xs:h-3 w-2.5 xs:w-3 text-emerald-400" />
                        ) : state === 'loading' ? (
                          <div className="h-1.5 w-1.5 rounded-full bg-[#c8601a] animate-ping" />
                        ) : null}
                      </div>
                      <span className="text-[11px] xs:text-sm font-light text-white/80">{step}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-6 xs:mt-10 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-[#c8601a]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(loadingStep / 3) * 100}%` }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ─── STEP 2: DASHBOARD SCREEN ─── */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 pb-12 xs:pb-16 sm:pb-20 md:pb-24 pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-40 overflow-hidden"
          >
            {/* Error Display */}
            {itineraryError && (
              <div className="mb-6 xs:mb-8 rounded-xl xs:rounded-2xl border border-red-200 bg-red-50 p-4 xs:p-6 text-center">
                <p className="text-xs xs:text-sm font-medium text-red-800">{itineraryError}</p>
                <Link
                  to="/planner"
                  className="mt-3 xs:mt-4 inline-block text-xs xs:text-sm font-semibold text-red-600 hover:text-red-800"
                >
                  ← Back to Planner
                </Link>
              </div>
            )}

            {/* Back action */}
            <Link
              to="/planner"
              className="group mb-6 xs:mb-8 inline-flex items-center gap-1.5 xs:gap-2 text-[11px] xs:text-sm font-semibold uppercase tracking-[0.12em] text-[#1a2e22]/50 transition-colors hover:text-[#1a2e22]"
            >
              <ArrowLeft className="h-3.5 xs:h-4 w-3.5 xs:w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Configure Preferences
            </Link>

            {/* Dashboard Header */}
            <div className="flex flex-col gap-4 xs:gap-6 lg:flex-row lg:items-start lg:justify-between border-b border-[#1a2e22]/15 pb-6 xs:pb-8 mb-8 xs:mb-12">
              <div>
                <span className="text-[10px] xs:text-xs font-semibold uppercase tracking-[0.25em] text-[#c8601a] flex items-center gap-1 xs:gap-1.5">
                  <Sparkles className="h-3.5 xs:h-4 w-3.5 xs:w-4" />
                  Intelligently generated itinerary
                </span>
                {/* Real vs Mock badge */}
                {isAiGenerated !== null && (
                  <span className={cn(
                    'mt-1.5 xs:mt-2 inline-flex items-center gap-1 xs:gap-1.5 rounded-full px-2 xs:px-3 py-0.5 xs:py-1 text-[9px] xs:text-[10px] font-bold uppercase tracking-widest',
                    isAiGenerated
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'bg-amber-100 text-amber-700 border border-amber-300'
                  )}>
                    <span className={cn('h-1.5 xs:h-2 w-1.5 xs:w-2 rounded-full', isAiGenerated ? 'bg-emerald-500' : 'bg-amber-500')} />
                    {isAiGenerated ? '✅ Real AI Data (Gemini)' : '⚠️ Mock / Demo Data — Add API Key for real results'}
                  </span>
                )}
                <h1 className="mt-2 xs:mt-3 font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1a2e22]">
                  {destinationName}
                </h1>
                <p className="mt-2 xs:mt-3 sm:mt-4 max-w-[200px] xs:max-w-xs sm:max-w-md md:max-w-xl text-[10px] xs:text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#1a2e22]/60">
                  A personalized {daysPlan.length}-day flow optimized for a {travelStyle} style,
                  spending around your budget tier.
                </p>

                {/* Metadata badges */}
                <div className="mt-4 xs:mt-6 flex flex-wrap gap-2 xs:gap-3">
                  <MetaBadge icon={Calendar} text={`${daysPlan.length} Days`} />
                  <MetaBadge icon={Users} text={`${travelers} Guests`} />
                  <MetaBadge icon={Wallet} text={`Est. Total €${totalCost}`} />
                  <MetaBadge icon={Compass} text={`${travelStyle} Pace`} />
                </div>
              </div>

              {/* Actions panel */}
              <div className="flex flex-wrap gap-2 xs:gap-3 self-end">
                <button
                  onClick={handleSaveToggle}
                  className={cn(
                    'flex items-center gap-1.5 xs:gap-2 rounded-full px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2.5 text-[10px] xs:text-xs font-semibold uppercase tracking-wider transition-all duration-300',
                    isSaved
                      ? 'bg-[#1a2e22] text-white shadow-lg'
                      : 'border border-[#1a2e22]/20 text-[#1a2e22] hover:bg-[#1a2e22]/5'
                  )}
                >
                  <Heart className={cn('h-3.5 xs:h-4 w-3.5 xs:w-4', isSaved && 'fill-white')} />
                  {isSaved ? 'Saved to trips' : 'Save itinerary'}
                </button>
                <button className="flex items-center gap-1.5 xs:gap-2 rounded-full border border-[#1a2e22]/20 px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2.5 text-[10px] xs:text-xs font-semibold uppercase tracking-wider text-[#1a2e22] hover:bg-[#1a2e22]/5">
                  <Share2 className="h-3.5 xs:h-4 w-3.5 xs:w-4" />
                  Share link
                </button>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid gap-3 xs:gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-[280px_1fr_340px]">

              {/* LEFT COLUMN: Days Navigation & AI Refine panel */}
              <div className="flex flex-col gap-6 xs:gap-8">
                <div>
                  <h3 className="mb-3 xs:mb-4 text-[10px] xs:text-xs font-bold uppercase tracking-[0.2em] text-[#1a2e22]/40">
                    Day selector
                  </h3>
                  <div className="flex flex-row gap-1.5 xs:gap-2 overflow-x-auto pb-1 xs:pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                    {daysPlan.filter(day => day && day.day && typeof day.day === 'number').map((day) => {
                      const active = day.day === activeDay;
                      return (
                        <button
                          key={day.day}
                          onClick={() => handleDayChange(day.day)}
                          className={cn(
                            'group flex min-w-[5.5rem] xs:min-w-[6rem] sm:min-w-[7rem] md:min-w-[8rem] flex-col gap-1 xs:gap-1.5 border-b-2 pb-2 xs:pb-3 sm:pb-4 text-left transition-all duration-300 lg:min-w-0 lg:border-b-0 lg:border-l-2 lg:pb-0 lg:pl-4',
                            active
                              ? 'border-[#c8601a] text-[#1a2e22]'
                              : 'border-[#1a2e22]/10 text-[#1a2e22]/40 hover:border-[#1a2e22]/30'
                          )}
                        >
                          <span className={cn(
                            'text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-wider',
                            active ? 'text-[#c8601a]' : 'text-[#1a2e22]/30'
                          )}>
                            Day 0{day.day}
                          </span>
                          <span className="text-[10px] xs:text-xs sm:text-sm font-semibold leading-tight line-clamp-2">{day.title || 'Day activities'}</span>
                          <span className="text-[9px] xs:text-[10px] sm:text-xs opacity-50">€{day.budget || 0} · {weatherData.temp}°</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Refinement widget */}
                <div className="border-t border-[#1a2e22]/15 pt-4 xs:pt-6">
                  <h3 className="mb-3 xs:mb-4 text-[10px] xs:text-xs font-bold uppercase tracking-[0.2em] text-[#c8601a] flex items-center gap-1 xs:gap-1.5">
                    <Sparkles className="h-3 xs:h-3.5 w-3 xs:w-3.5" />
                    ✦ Refine with AI
                  </h3>
                  <div className="flex flex-col gap-1.5 xs:gap-2">
                    {AI_REFINEMENTS.map((ref) => (
                      <button
                        key={ref.id}
                        onClick={() => handleRefine(ref.id)}
                        disabled={isRefining}
                        className={cn(
                          'flex items-center gap-1.5 xs:gap-2 rounded-xl border px-2.5 xs:px-3.5 py-2 xs:py-3 text-left text-[10px] xs:text-xs font-medium transition-all duration-300',
                          activeRefinement === ref.id && !isRefining
                            ? 'border-[#c8601a] bg-[#c8601a]/10 text-[#c8601a] shadow-sm'
                            : 'border-[#1a2e22]/15 bg-white text-[#1a2e22]/60 hover:border-[#c8601a]/30 hover:bg-[#faf8f5]'
                        )}
                      >
                        <span className="text-xs xs:text-sm">{ref.icon}</span>
                        <span className="leading-tight">{ref.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: Itinerary flow details */}
              <div className="relative">
                {!selectedDay ? (
                  <div className="rounded-xl xs:rounded-2xl border border-[#1a2e22]/10 bg-white p-4 xs:p-6 sm:p-8 text-center">
                    <p className="text-[10px] xs:text-sm text-[#1a2e22]/60">Loading itinerary details...</p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedDay?.day ?? 'day'}-${activeRefinement}-${isRefining}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="relative overflow-hidden rounded-2xl border border-[#1a2e22]/10 bg-white p-4 xs:p-5 sm:p-6 lg:p-8 shadow-sm"
                    >
                      {/* Header */}
                      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-[#1a2e22]/10 pb-5">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#c8601a]">
                            Day 0{selectedDay.day} Theme
                          </span>
                          <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-light text-[#1a2e22] mt-1">
                            {selectedDay.title}
                          </h2>
                        </div>
                        <span className="rounded-full bg-[#1a2e22]/5 px-2.5 xs:px-3.5 py-0.5 xs:py-1 text-[10px] xs:text-xs font-medium text-[#1a2e22]/60">
                          {destinationName}
                        </span>
                      </div>

                      {/* AI Loading state inside dashboard container */}
                      <AnimatePresence>
                        {isRefining && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                          >
                            <div className="flex flex-col items-center gap-3 text-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                              >
                                <RefreshCw className="h-6 w-6 text-[#c8601a]" />
                              </motion.div>
                              <div>
                                <p className="text-sm font-semibold">Regenerating itinerary flow...</p>
                                <p className="text-xs text-[#1a2e22]/40 mt-0.5">Optimizing for style request</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Timeline flow slots */}
                      <div className="flex flex-col gap-4 xs:gap-5 sm:gap-6">
                        <ItinerarySlot icon={SunMedium} title="Morning Activity" text={selectedDay.morning} />
                        <ItinerarySlot icon={TreePine} title="Afternoon Activity" text={selectedDay.afternoon} />
                        <ItinerarySlot icon={UtensilsCrossed} title="Evening Activity" text={selectedDay.evening} />
                      </div>

                      {/* Refinement confirmation tag */}
                      {selectedDay.note && !isRefining && (
                        <div className="mt-6 xs:mt-8 flex items-center gap-2 border-t border-[#1a2e22]/10 pt-3 xs:pt-4 text-[10px] xs:text-xs font-medium text-[#c8601a]">
                          <Check className="h-4 w-4" />
                          <span>{selectedDay.note}</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* RIGHT COLUMN: Interactive Widgets (Map, Weather, Budget) */}
              <div className="flex flex-col divide-y divide-[#1a2e22]/10">

                {/* Weather widget */}
                <div className="pb-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1a2e22]/40 flex items-center gap-1.5">
                    <SunMedium className="h-4 w-4 text-[#c8601a]" />
                    Weather Forecast (Real-time API)
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl xs:text-3xl sm:text-4xl font-light text-[#1a2e22]">{weatherData.temp}°C</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-[#1a2e22]">{weatherData.condition}</span>
                      <span className="text-[9px] xs:text-xs text-[#1a2e22]/45">Humidity: {weatherData.humidity}% · Wind: {weatherData.wind} km/h</span>
                    </div>
                  </div>
                </div>

                {/* Daily Cost summary */}
                <div className="py-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1a2e22]/40 flex items-center gap-1.5">
                    <Wallet className="h-4 w-4 text-[#c8601a]" />
                    Currency Converter (Real-time API)
                  </h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl xs:text-2xl sm:text-3xl font-light text-[#1a2e22]">€{selectedDay?.budget || 0}</span>
                      <span className="text-[10px] xs:text-xs text-[#1a2e22]/50">≈ {currencyCode} {Math.round((selectedDay?.budget || 0) * (currencyCode === 'JPY' ? 168 : 1.09))}</span>
                    </div>
                    {convertedBudget && (
                      <p className="text-[10px] xs:text-[11px] font-medium text-[#c8601a] mt-1">
                        Total Estimated Cost: {convertedBudget}
                      </p>
                    )}
                  </div>
                </div>

                {/* Map widget
                <div className="py-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1a2e22]/40 flex items-center gap-1.5">
                    <Navigation className="h-4 w-4 text-[#c8601a]" />
                    Map preview (Dynamic Coords)
                  </h3>
                  <span className="text-xs xs:text-sm font-semibold">{destinationName} Context</span>
                  <div className="relative mt-2 xs:mt-3 h-36 xs:h-40 sm:h-44 overflow-hidden rounded-xl border border-[#1a2e22]/10 bg-white">
                  

                    <p className="mt-1 text-[9px] text-[#1a2e22]/40">
                      © OpenStreetMap contributors
                    </p>
                  </div>
                </div> */}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 rounded-2xl border border-white/10 bg-[#1a2e22] px-6 py-4 text-sm font-semibold tracking-wide text-white shadow-2xl backdrop-blur-xl flex items-center gap-3"
          >
            <span className="text-[#c8601a]">✦</span>
            Trip saved to My Trips
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function handleDayChange(dayNum) {
    setActiveDay(dayNum);
    setActiveRefinement(null);
  }
}

function MetaBadge({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-1 xs:gap-1.5 rounded-full border border-[#1a2e22]/10 bg-white px-2.5 xs:px-3.5 py-1 xs:py-1.5 text-[10px] xs:text-xs font-medium text-[#1a2e22]/60">
      <Icon className="h-3 xs:h-3.5 w-3 xs:w-3.5 text-[#c8601a]" />
      <span>{text}</span>
    </div>
  );
}

function ItinerarySlot({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-3 xs:gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 xs:h-10 w-8 xs:w-10 shrink-0 items-center justify-center rounded-full border border-[#1a2e22]/10 bg-[#faf8f5]">
          <Icon className="h-3 xs:h-4 w-3 xs:w-4 text-[#c8601a]" />
        </div>
        <div className="w-0.5 grow bg-[#1a2e22]/10 mt-2 min-h-[40px]" />
      </div>
      <div>
        <h4 className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-[#1a2e22]/40 mt-1">
          {title}
        </h4>
        <p className="mt-1.5 xs:mt-2 text-[13px] xs:text-[15px] font-normal leading-relaxed text-[#1a2e22]/80">
          {text}
        </p>
      </div>
    </div>
  );
}
