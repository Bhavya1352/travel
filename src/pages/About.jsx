import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2e22] to-[#16271d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Compass className="h-16 w-16 text-[#c8601a] mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4">About Voyara</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Thoughtful journeys, intelligently planned.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Our Mission</h2>
            <p className="text-white/70 leading-relaxed mb-8">
              At Voyara, we believe that travel should be more than just moving from place to place. 
              It's about creating meaningful experiences, discovering new perspectives, and making memories 
              that last a lifetime. Our AI-powered trip planning technology helps you craft personalized 
              journeys that reflect your unique interests and travel style.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Our Story</h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Founded in 2024, Voyara emerged from a simple idea: travel planning should be intelligent, 
              personal, and stress-free. Our team of travel enthusiasts and AI experts came together to 
              create a platform that combines cutting-edge technology with human-centered design.
            </p>

            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Our Values</h2>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-[#c8601a] mt-1">•</span>
                <span><strong>Personalization:</strong> Every journey is unique to you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8601a] mt-1">•</span>
                <span><strong>Sustainability:</strong> Responsible travel for a better world</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8601a] mt-1">•</span>
                <span><strong>Innovation:</strong> Leveraging AI to enhance human experiences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8601a] mt-1">•</span>
                <span><strong>Community:</strong> Connecting travelers worldwide</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
