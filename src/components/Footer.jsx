import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, GitBranch, Link2, Mail, Send } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { FOOTER_DATA, FOOTER_CONFIG } from '../data/footerData';

const iconMap = {
  Compass,
  GitBranch,
  Link2,
  Mail
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#16271d] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-4 xs:py-5 sm:py-6 md:py-7 lg:py-10">
        
        {/* Main grid - 4 partitions */}
        <div className="grid gap-4 xs:gap-5 sm:gap-6 md:gap-7 pb-4 xs:pb-5 sm:pb-6 md:pb-7 lg:pb-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

          {/* Brand Section */}
          <ScrollReveal variant="fadeUp" delay={0}>
            <div className="flex flex-col gap-2.5 xs:gap-3 bg-white/5 border border-white/10 rounded-lg p-3 xs:p-4">
              <Link to="/" className="flex items-center gap-1.5 xs:gap-2 group">
                <motion.div 
                  whileHover={{ rotate: 180, scale: 1.1 }} 
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Compass className="h-4 xs:h-5 w-4 xs:w-5 text-[#c8601a]" strokeWidth={1.5} />
                  <motion.div 
                    className="absolute inset-0 bg-[#c8601a]/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <span className="font-serif text-base xs:text-lg tracking-widest">
                  {FOOTER_DATA.brand.name}
                </span>
              </Link>
              <p className="text-[10px] xs:text-xs font-light leading-relaxed text-white/40">
                {FOOTER_DATA.brand.tagline}
              </p>
              <div className="flex gap-2 xs:gap-3">
                {FOOTER_DATA.social.platforms.map((platform, i) => {
                  const Icon = iconMap[platform.icon];
                  return (
                    <motion.a
                      key={platform.label}
                      href={platform.href}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 xs:p-2 rounded-full bg-white/5 hover:bg-[#c8601a] transition-colors duration-300 group"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    >
                      <Icon className="h-3.5 xs:h-4 w-3.5 xs:w-4 text-white/60 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Explore Section */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 xs:p-4">
              <motion.h4 
                className="mb-2 xs:mb-3 text-[9px] xs:text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {FOOTER_DATA.sections[0].title}
              </motion.h4>
              <ul className="flex flex-col gap-1.5 xs:gap-2">
                {FOOTER_DATA.sections[0].links.map((link, linkIndex) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="inline-flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-normal text-white/50 transition-all duration-300 hover:text-white hover:gap-2 xs:hover:gap-3 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c8601a] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Company Section */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 xs:p-4">
              <motion.h4 
                className="mb-2 xs:mb-3 text-[9px] xs:text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {FOOTER_DATA.sections[1].title}
              </motion.h4>
              <ul className="flex flex-col gap-1.5 xs:gap-2">
                {FOOTER_DATA.sections[1].links.map((link, linkIndex) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="inline-flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-normal text-white/50 transition-all duration-300 hover:text-white hover:gap-2 xs:hover:gap-3 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c8601a] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Support + Newsletter Section */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="flex flex-col gap-2.5 xs:gap-3 bg-white/5 border border-white/10 rounded-lg p-3 xs:p-4">
              <motion.h4 
                className="mb-1.5 xs:mb-2 text-[9px] xs:text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {FOOTER_DATA.sections[2].title}
              </motion.h4>
              <ul className="flex flex-col gap-1.5 xs:gap-2">
                {FOOTER_DATA.sections[2].links.map((link, linkIndex) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="inline-flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-normal text-white/50 transition-all duration-300 hover:text-white hover:gap-2 xs:hover:gap-3 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c8601a] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <motion.form 
                onSubmit={handleSubscribe}
                className="relative mt-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={FOOTER_DATA.newsletter.placeholder}
                  className="w-full px-2.5 xs:px-3 py-1.5 xs:py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] xs:text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c8601a]/50 focus:bg-white/10 transition-all duration-300"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-1 xs:right-1.5 top-1/2 -translate-y-1/2 p-1 xs:p-1.5 bg-[#c8601a] rounded-md hover:bg-[#e07a35] transition-colors duration-300"
                >
                  {isSubscribed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white text-[10px] xs:text-xs"
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <Send className="h-3 xs:h-3.5 w-3 xs:w-3.5 text-white" strokeWidth={1.5} />
                  )}
                </motion.button>
              </motion.form>

              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[9px] xs:text-[10px] text-[#c8601a]"
                >
                  Successfully subscribed!
                </motion.p>
              )}
            </div>
          </ScrollReveal>

        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4 xs:my-5 sm:my-6"
        />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col gap-2 xs:gap-3 sm:gap-4 text-[9px] xs:text-[10px] sm:text-[11px] font-normal text-white/40 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{FOOTER_DATA.legal.copyright}</p>
          <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4 md:gap-5">
            {FOOTER_DATA.legal.links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                className="transition-colors duration-200 hover:text-white/60 relative group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.05 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-px bg-[#c8601a] group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
