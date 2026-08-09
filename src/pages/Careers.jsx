import { motion } from 'framer-motion';
import { Briefcase, Users, Zap } from 'lucide-react';

export default function Careers() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2e22] to-[#16271d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Briefcase className="h-16 w-16 text-[#c8601a] mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4">Careers</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join our team and shape the future of intelligent travel planning
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Why Voyara?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-10 w-10 text-[#c8601a] mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold mb-2">Amazing Team</h3>
                <p className="text-white/60 text-sm">Work with passionate people from around the world</p>
              </div>
              <div className="text-center">
                <Zap className="h-10 w-10 text-[#c8601a] mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-white/60 text-sm">Build cutting-edge AI-powered travel experiences</p>
              </div>
              <div className="text-center">
                <Briefcase className="h-10 w-10 text-[#c8601a] mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold mb-2">Growth</h3>
                <p className="text-white/60 text-sm">Learn and grow in a fast-paced environment</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Open Positions</h2>
            <p className="text-white/60 mb-8">
              We're always looking for talented individuals to join our team. While we don't have specific 
              openings listed right now, we'd love to hear from you.
            </p>
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="font-semibold mb-3">Send us your resume</h3>
              <p className="text-white/60 text-sm mb-4">
                Email your CV to careers@voyara.ai and tell us why you'd be a great fit for our team.
              </p>
              <a 
                href="mailto:careers@voyara.ai"
                className="inline-block bg-[#c8601a] hover:bg-[#e07a35] px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
