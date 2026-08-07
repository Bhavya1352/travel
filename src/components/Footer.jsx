import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, GitBranch, Link2, Mail } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="bg-[#16271d] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-8 xs:py-10 sm:py-12 lg:py-14">
        <div className="grid gap-6 xs:gap-8 sm:gap-10 pb-6 xs:pb-8 sm:pb-10 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">

          {/* Brand */}
          <ScrollReveal variant="fadeUp" delay={0}>
            <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5">
              <Link to="/" className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 group">
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                  <Compass className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5 text-[#c8601a]" strokeWidth={1.5} />
                </motion.div>
                <span className="font-serif text-base xs:text-lg sm:text-xl tracking-widest">Voyara</span>
              </Link>
              <p className="max-w-[200px] xs:max-w-xs text-[10px] xs:text-xs sm:text-sm font-light leading-relaxed text-white/35">
                Thoughtful journeys, intelligently planned.
              </p>
            </div>
          </ScrollReveal>

          {/* Explore */}
          <ScrollReveal variant="fadeUp" delay={0.08}>
            <h4 className="mb-3 xs:mb-4 sm:mb-5 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Explore
            </h4>
            <ul className="flex flex-col gap-2 xs:gap-2.5 sm:gap-3 sm:gap-3.5">
              {[
                { label: 'Destinations', href: '/destinations' },
                { label: 'Trip Planner', href: '/planner' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'My Trips', href: '/my-trips' },
              ].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    to={l.href}
                    className="text-[12px] xs:text-[13px] sm:text-[15px] font-normal text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Connect */}
          <ScrollReveal variant="fadeUp" delay={0.16}>
            <h4 className="mb-3 xs:mb-4 sm:mb-5 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Connect
            </h4>
            <ul className="flex flex-col gap-2 xs:gap-2.5 sm:gap-3 sm:gap-3.5">
              {[
                { icon: GitBranch, label: 'GitHub', href: '#' },
                { icon: Link2, label: 'LinkedIn', href: '#' },
                { icon: Mail, label: 'Contact', href: 'mailto:hello@voyara.ai' },
              ].map(({ icon: Icon, label, href }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.07 }}
                >
                  <a
                    href={href}
                    className="inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 text-[12px] xs:text-[13px] sm:text-[15px] font-normal text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    <Icon className="h-3 xs:h-3.5 sm:h-4 w-3 xs:w-3.5 sm:w-4 text-[#c8601a]" strokeWidth={1.5} />
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>

        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-1.5 xs:gap-2 sm:gap-3 pt-4 xs:pt-5 sm:pt-7 text-[9px] xs:text-[10px] sm:text-xs font-normal text-white/40 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© 2026 Voyara</p>
          <div className="flex gap-3 xs:gap-4 sm:gap-6">
            <a href="#" className="transition-colors duration-200 hover:text-white/50">Privacy</a>
            <a href="#" className="transition-colors duration-200 hover:text-white/50">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
