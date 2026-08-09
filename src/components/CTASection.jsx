import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import OptimizedImage, { generatePexelsSrcset, generateSizes } from './OptimizedImage';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0">
        <OptimizedImage
          src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
          srcset={undefined}
          sizes="100vw"
          alt=""
          role="presentation"
          loading="lazy"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1e]/60 via-[#1a2e22]/55 to-[#1c1c1e]/80" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 xs:px-5 sm:px-6 py-20 xs:py-24 sm:py-32 lg:py-40 xl:py-52 text-center overflow-hidden">
        <ScrollReveal>
          <h2 id="cta-heading" className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light leading-[1.12] text-white">
            Your next journey
            <br />
            <em>starts here.</em>
          </h2>

          <div className="flex justify-center">
            <Link
              to="/planner"
              aria-label="Start planning your trip now"
              className="group mt-6 xs:mt-8 sm:mt-10 lg:mt-12 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/8 px-4 xs:px-5 sm:px-6 lg:px-8 py-2 xs:py-3 sm:py-4 text-[10px] xs:text-[11px] sm:text-sm font-medium tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-500 hover:border-[#c8601a]/60 hover:bg-[#c8601a] hover:shadow-2xl hover:shadow-[#c8601a]/20"
            >
              Plan My Trip
              <ArrowRight className="h-3 xs:h-3.5 sm:h-4 w-3 xs:w-3.5 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
