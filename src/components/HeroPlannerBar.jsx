import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Wallet, Users, Compass, ChevronDown, ArrowRight } from 'lucide-react';
import { TRAVEL_STYLES, BUDGET_TIERS } from '../data/travelOptions';
import { cn } from '../utils/helpers';

export default function HeroPlannerBar({ plan, updateField, onSubmit }) {
  const [activePopover, setActivePopover] = useState(null); // 'dates' | 'travelers' | 'budget' | 'style' | null
  const [inputValue, setInputValue] = useState('');
  const popoverRef = useRef(null);

  const selectedBudget = BUDGET_TIERS.find((b) => b.id === plan.budget);
  const selectedStyle = TRAVEL_STYLES.find((s) => s.id === plan.travelStyle);

  // Close popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Format date display
  const formatDateRange = () => {
    if (!plan.startDate && !plan.endDate) return 'Dates';
    const start = plan.startDate
      ? new Date(plan.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : '';
    const end = plan.endDate
      ? new Date(plan.endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : '';
    return start && end ? `${start} — ${end}` : start || end;
  };

  // Submit flow
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dest = inputValue.trim();
    if (dest) {
      updateField('destination', dest);
    }
    onSubmit(dest);
  };

  return (
    <div className="relative w-full max-w-3xl xs:max-w-4xl sm:max-w-5xl mx-auto flex flex-col items-center px-2 xs:px-0">
      {/* ─── Intent Input Bar ─── */}
      <form
        onSubmit={handleFormSubmit}
        role="search"
        aria-label="Travel planning form"
        className="w-full flex items-center gap-2 xs:gap-3 sm:gap-4 bg-[#1c1c1e]/40 border border-white/10 rounded-lg xs:rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 sm:py-4 focus-within:border-[#c8601a]/50 transition-all duration-300 shadow-2xl backdrop-blur-md"
      >
        <span className="text-[#c8601a] text-base xs:text-lg sm:text-xl select-none leading-none shrink-0" aria-hidden="true">✦</span>
        <label htmlFor="trip-intent" className="sr-only">Describe your ideal trip</label>
        <input
          id="trip-intent"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="A quiet week in Kyoto with local food, nature, and a mid-range budget..."
          aria-label="Describe your ideal trip"
          className="flex-1 min-w-0 bg-transparent text-[11px] xs:text-[13px] sm:text-[15px] md:text-base font-normal text-white placeholder-white/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Create itinerary"
          className="flex h-8 xs:h-9 sm:h-10 w-8 xs:w-9 sm:w-10 shrink-0 items-center justify-center rounded-lg xs:rounded-xl bg-[#c8601a] text-white hover:bg-[#e07a35] transition-colors duration-300"
        >
          <ArrowRight className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5" strokeWidth={2} />
        </button>
      </form>

      {/* ─── Inline Preference Controls ─── */}
      <div
        className="relative mt-3 xs:mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-white/70"
        role="group"
        aria-label="Trip preferences"
      >
        
        {/* Dates Control */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'dates' ? null : 'dates')}
          aria-label={`Select travel dates. Current: ${formatDateRange()}`}
          aria-expanded={activePopover === 'dates'}
          aria-controls="dates-popover"
          className={cn(
            'hover:text-white transition-colors flex items-center gap-1 xs:gap-1.5 py-0.5 xs:py-1 px-1.5 xs:px-2 sm:px-2.5 rounded-lg',
            activePopover === 'dates' && 'text-white bg-white/5'
          )}
        >
          <Calendar className="h-2.5 xs:h-3 sm:h-3.5 w-2.5 xs:w-3 sm:w-3.5 text-[#c8601a]" />
          <span className="hidden xs:inline">{formatDateRange()}</span>
          <span className="xs:hidden">Dates</span>
        </button>

        <span className="text-white/20 select-none" aria-hidden="true">·</span>

        {/* Travelers Control */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'travelers' ? null : 'travelers')}
          aria-label={`Select number of travelers. Current: ${plan.travelers} ${plan.travelers === 1 ? 'guest' : 'guests'}`}
          aria-expanded={activePopover === 'travelers'}
          aria-controls="travelers-popover"
          className={cn(
            'hover:text-white transition-colors flex items-center gap-1 xs:gap-1.5 py-0.5 xs:py-1 px-1.5 xs:px-2 sm:px-2.5 rounded-lg',
            activePopover === 'travelers' && 'text-white bg-white/5'
          )}
        >
          <Users className="h-2.5 xs:h-3 sm:h-3.5 w-2.5 xs:w-3 sm:w-3.5 text-[#c8601a]" />
          {plan.travelers} {plan.travelers === 1 ? 'guest' : 'guests'}
        </button>

        <span className="text-white/20 select-none" aria-hidden="true">·</span>

        {/* Budget Control */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'budget' ? null : 'budget')}
          aria-label={`Select budget tier. Current: ${selectedBudget?.label ?? 'Budget'}`}
          aria-expanded={activePopover === 'budget'}
          aria-controls="budget-popover"
          className={cn(
            'hover:text-white transition-colors flex items-center gap-1 xs:gap-1.5 py-0.5 xs:py-1 px-1.5 xs:px-2 sm:px-2.5 rounded-lg',
            activePopover === 'budget' && 'text-white bg-white/5'
          )}
        >
          <Wallet className="h-2.5 xs:h-3 sm:h-3.5 w-2.5 xs:w-3 sm:w-3.5 text-[#c8601a]" />
          <span className="hidden xs:inline">{selectedBudget?.label ?? 'Budget'}</span>
          <span className="xs:hidden">Budget</span>
        </button>

        <span className="text-white/20 select-none" aria-hidden="true">·</span>

        {/* Style Control */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'style' ? null : 'style')}
          aria-label={`Select travel style. Current: ${selectedStyle?.label ?? 'Style'}`}
          aria-expanded={activePopover === 'style'}
          aria-controls="style-popover"
          className={cn(
            'hover:text-white transition-colors flex items-center gap-1 xs:gap-1.5 py-0.5 xs:py-1 px-1.5 xs:px-2 sm:px-2.5 rounded-lg',
            activePopover === 'style' && 'text-white bg-white/5'
          )}
        >
          <Compass className="h-2.5 xs:h-3 sm:h-3.5 w-2.5 xs:w-3 sm:w-3.5 text-[#c8601a]" />
          <span className="hidden xs:inline">{selectedStyle?.label ?? 'Style'}</span>
          <span className="xs:hidden">Style</span>
        </button>
      </div>

      {/* ─── Popovers Panel Container ─── */}
      <AnimatePresence>
        {activePopover && (
          <motion.div
            ref={popoverRef}
            role="dialog"
            aria-label={`${activePopover} selection`}
            id={`${activePopover}-popover`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 -translate-x-1/2 top-full z-50 mt-2 xs:mt-3 sm:mt-4 w-[calc(100%-16px)] xs:w-[calc(100%-24px)] sm:w-full max-w-[280px] xs:max-w-xs sm:max-w-sm rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a2e22] p-3 xs:p-4 sm:p-5 shadow-2xl backdrop-blur-xl"
          >
            {/* Popover Content wrapper */}
            <div className="text-white">
              
              {/* 1. Dates Popover */}
              {activePopover === 'dates' && (
                <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
                  <h3 className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50 border-b border-white/10 pb-1 xs:pb-1.5 sm:pb-2">
                    Select travel window
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
                    <div>
                      <label className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase text-white/40 block mb-0.5 xs:mb-1">Depart</label>
                      <input
                        type="date"
                        value={plan.startDate}
                        onChange={(e) => updateField('startDate', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg xs:rounded-xl px-1.5 xs:px-2 sm:px-3 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-xs sm:text-sm text-white focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] xs:text-[9px] sm:text-[10px] uppercase text-white/40 block mb-0.5 xs:mb-1">Return</label>
                      <input
                        type="date"
                        value={plan.endDate}
                        onChange={(e) => updateField('endDate', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg xs:rounded-xl px-1.5 xs:px-2 sm:px-3 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-xs sm:text-sm text-white focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Travelers Popover */}
              {activePopover === 'travelers' && (
                <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
                  <h3 className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50 border-b border-white/10 pb-1 xs:pb-1.5 sm:pb-2">
                    Number of guests
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] xs:text-xs sm:text-sm font-light">Travelers</span>
                    <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => updateField('travelers', Math.max(1, plan.travelers - 1))}
                        aria-label="Decrease number of travelers"
                        className="flex h-6 xs:h-7 sm:h-8 w-6 xs:w-7 sm:w-8 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 text-xs xs:text-sm"
                      >
                        −
                      </button>
                      <span className="text-[10px] xs:text-xs sm:text-sm font-bold min-w-[1rem] text-center" aria-live="polite">{plan.travelers}</span>
                      <button
                        type="button"
                        onClick={() => updateField('travelers', Math.min(20, plan.travelers + 1))}
                        aria-label="Increase number of travelers"
                        className="flex h-6 xs:h-7 sm:h-8 w-6 xs:w-7 sm:w-8 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 text-xs xs:text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Budget Popover */}
              {activePopover === 'budget' && (
                <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-2">
                  <h3 className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50 border-b border-white/10 pb-1 xs:pb-1.5 sm:pb-2 mb-1 xs:mb-1.5 sm:mb-2">
                    Select budget tier
                  </h3>
                  {BUDGET_TIERS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        updateField('budget', b.id);
                        setActivePopover(null);
                      }}
                      className={cn(
                        'w-full flex justify-between items-center px-1.5 xs:px-2 sm:px-3 py-1.5 xs:py-2 sm:py-2.5 rounded-lg xs:rounded-xl text-left transition-colors',
                        plan.budget === b.id ? 'bg-[#c8601a]/15 text-[#e07a35]' : 'hover:bg-white/5'
                      )}
                    >
                      <div>
                        <div className="text-[10px] xs:text-xs sm:text-sm font-medium">{b.label}</div>
                        <div className="text-[9px] xs:text-[10px] sm:text-xs text-white/40">{b.range}</div>
                      </div>
                      {plan.budget === b.id && <span className="text-[9px] xs:text-[10px] sm:text-xs">●</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* 4. Style Popover */}
              {activePopover === 'style' && (
                <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-2">
                  <h3 className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50 border-b border-white/10 pb-1 xs:pb-1.5 sm:pb-2 mb-1 xs:mb-1.5 sm:mb-2">
                    Select travel style
                  </h3>
                  {TRAVEL_STYLES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        updateField('travelStyle', s.id);
                        setActivePopover(null);
                      }}
                      className={cn(
                        'w-full flex justify-between items-center px-1.5 xs:px-2 sm:px-3 py-1.5 xs:py-2 sm:py-2.5 rounded-lg xs:rounded-xl text-left transition-colors',
                        plan.travelStyle === s.id ? 'bg-[#c8601a]/15 text-[#e07a35]' : 'hover:bg-white/5'
                      )}
                    >
                      <div>
                        <div className="text-[10px] xs:text-xs sm:text-sm font-medium">{s.label}</div>
                        <div className="text-[9px] xs:text-[10px] sm:text-xs text-white/40 line-clamp-1">{s.description}</div>
                      </div>
                      {plan.travelStyle === s.id && <span className="text-[9px] xs:text-[10px] sm:text-xs">●</span>}
                    </button>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
