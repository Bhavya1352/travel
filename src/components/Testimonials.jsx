import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import OptimizedImage, { generatePexelsSrcset, generateSizes } from './OptimizedImage';

const TESTIMONIAL = {
  quote: "For once, I didn't feel like\nI was following someone else's itinerary.",
  name: 'Elena Marchetti',
  location: 'Milan, Italy',
  trip: 'Santorini · 5 days',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&fm=webp&q=40',
  photo: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
};

export default function Testimonials() {
  return (
    <section className="bg-[#faf8f5] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid min-h-[350px] xs:min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] grid-cols-1 lg:grid-cols-2">

          {/* Left — traveler photo */}
          <ScrollReveal className="relative h-[240px] xs:h-[280px] sm:h-[320px] lg:h-[360px] overflow-hidden lg:h-auto">
            <OptimizedImage
              src={TESTIMONIAL.photo}
              srcset={undefined}
              sizes="100vw"
              alt="Traveler Elena Marchetti enjoying a scenic view during her Santorini trip"
              className="h-full w-full object-cover"
              loading="lazy"
              width={800}
              height={600}
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Subtle right-edge fade for blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#faf8f5]/30 lg:to-[#faf8f5]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e22]/30 to-transparent" />
          </ScrollReveal>

          {/* Right — quote */}
          <ScrollReveal
            delay={0.1}
            className="flex flex-col justify-center px-4 xs:px-6 sm:px-8 py-10 xs:py-12 sm:py-16 lg:px-16 lg:py-20"
          >
            {/* Eyebrow */}
            <p className="mb-4 xs:mb-6 sm:mb-8 text-[9px] xs:text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-[#c8601a]">
              From the road
            </p>

            {/* Large quotation mark */}
            <div
              className="font-serif text-[4rem] xs:text-[5rem] sm:text-[6rem] lg:text-[7rem] xl:text-[9rem] font-light leading-none text-[#1a2e22]/8"
              aria-hidden="true"
            >
              "
            </div>

            {/* Quote text */}
            <blockquote className="-mt-4 xs:-mt-6 sm:-mt-8 font-serif text-lg xs:text-xl sm:text-2xl lg:text-3xl font-light leading-[1.45] text-[#1a2e22]/80">
              {TESTIMONIAL.quote.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < TESTIMONIAL.quote.split('\n').length - 1 && <br />}
                </span>
              ))}
            </blockquote>

            {/* Attribution */}
            <figcaption className="mt-6 xs:mt-8 sm:mt-10 flex items-center gap-2 xs:gap-3 sm:gap-4">
              <img
                src={TESTIMONIAL.avatar}
                srcSet={undefined}
                sizes="100px"
                alt={`${TESTIMONIAL.name} profile photo`}
                loading="lazy"
                decoding="async"
                width={40}
                height={40}
                className="h-8 xs:h-9 sm:h-10 w-8 xs:w-9 sm:w-10 rounded-full object-cover ring-1 ring-[#1a2e22]/10"
              />
              <div>
                <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-[#1a2e22]">{TESTIMONIAL.name}</div>
                <div className="mt-0.5 text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#1a2e2e]/35">
                  {TESTIMONIAL.location} — {TESTIMONIAL.trip}
                </div>
              </div>
            </figcaption>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
