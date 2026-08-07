import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroPlannerBar from '../components/HeroPlannerBar';
import { useTripPlanner } from '../hooks/useTripPlanner';
import { useDeviceOptimization } from '../hooks/useDeviceOptimization';

// Full-screen cinematic hero section.
// Uses a Pexels mountain image with a slow zoom animation and dark gradient overlay.
export default function Hero() {
  const navigate = useNavigate();
  const { isMobile, isSlowConnection } = useDeviceOptimization();
  const { plan, updateField } = useTripPlanner();

  const handleSubmit = (destOverride) => {
    const finalDest = typeof destOverride === 'string' ? destOverride : plan.destination;
    const params = new URLSearchParams({
      destination: finalDest,
      startDate: plan.startDate,
      endDate: plan.endDate,
      budget: plan.budget,
      travelers: String(plan.travelers),
      travelStyle: plan.travelStyle,
    });
    navigate(`/planner?${params.toString()}`);
  };

  return (
    <section 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      onClick={(e) => {
        // Prevent any accidental navigation from clicking on blank areas
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      {/* Cinematic background with slow zoom */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: 'easeOut' }}
        className="absolute inset-0 z-0 hero-bg will-change-transform"
      >
        <img
          src={`https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? '480' : '1920'}&q=${isMobile ? '40' : '60'}`}
          srcSet={isMobile ? 
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=320&q=40 320w,https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=480&q=40 480w,https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=750&q=40 750w" :
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1080&q=60 1080w,https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920&q=60 1920w"
          }
          sizes="100vw"
          alt="Dramatic mountain landscape at golden hour with misty valleys"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          width={isMobile ? 480 : 1920}
          height={isMobile ? 320 : 1080}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1c1c1e]/70 via-[#1c1c1e]/40 to-[#1c1c1e]/85" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1a2e22]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-20 flex w-full flex-col items-center px-4 xs:px-5 sm:px-6 lg:px-8 pt-16 xs:pt-20 sm:pt-24 md:pt-28 pb-8 xs:pb-10 sm:pb-12 md:pb-16">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="max-w-3xl xs:max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl text-center font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl font-light leading-[1.1] xs:leading-[1.15] sm:leading-[1.2] tracking-tight text-white px-2"
        >
          Your journey,
          <br />
          <span className="italic text-white/90">thoughtfully planned.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center text-xs xs:text-sm sm:text-base md:text-lg font-light leading-relaxed text-white/70 px-2"
        >
          Tell us where you want to go. AI creates a personalized journey around
          your budget, interests, and travel style.
        </motion.p>

        {/* Planner bar */}
        <div className="mt-6 xs:mt-8 sm:mt-10 md:mt-12 w-full max-w-4xl xs:max-w-5xl px-2 xs:px-0">
          <HeroPlannerBar
            plan={plan}
            updateField={updateField}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <Navbar />
    </section>
  );
}
