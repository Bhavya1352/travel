import { motion } from 'framer-motion';
import { Hotel, Car, Utensils, Compass, Wallet } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Smart budget breakdown showing estimated costs by category.
// Includes an animated bar visualization.

const CATEGORY_ICONS = {
  accommodation: Hotel,
  transport: Car,
  food: Utensils,
  activities: Compass,
  misc: Wallet,
};

export default function BudgetBreakdown({ breakdown }) {
  const categories = ['accommodation', 'transport', 'food', 'activities', 'misc'];
  const colors = ['#1a2e22', '#2d4a38', '#c8601a', '#5a7a5a', '#8a9a8a'];

  return (
    <div className="rounded-3xl border border-[#1a2e22]/10 bg-white p-8 shadow-sm">
      <h3 className="font-serif text-2xl font-light text-[#1a2e22]">Budget Breakdown</h3>
      <p className="mt-1 text-sm font-light text-[#1a2e22]/40">
        Estimated costs for your trip
      </p>

      {/* Total */}
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-serif text-4xl font-light text-[#1a2e22]">
          ${breakdown.total.toLocaleString()}
        </span>
        <span className="text-sm font-light text-[#1a2e22]/40">total estimated</span>
      </div>

      {/* Stacked bar */}
      <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ width: 0 }}
            whileInView={{ width: `${breakdown[cat].percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: colors[i] }}
          />
        ))}
      </div>

      {/* Category list */}
      <div className="mt-6 flex flex-col gap-4">
        {categories.map((cat, i) => {
          const Icon = CATEGORY_ICONS[cat];
          const item = breakdown[cat];
          return (
            <ScrollReveal key={cat} delay={i * 0.08}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors[i]}15` }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} style={{ color: colors[i] }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1a2e22]">{item.label}</div>
                    <div className="text-xs font-light text-[#1a2e22]/40">{item.percentage}% of budget</div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#1a2e22]">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
