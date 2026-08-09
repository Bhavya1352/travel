import { motion } from 'framer-motion';
import { FileText, Download, Mail } from 'lucide-react';

export default function Press() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2e22] to-[#16271d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <FileText className="h-16 w-16 text-[#c8601a] mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4">Press</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Media resources, press releases, and company information
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Media Kit</h2>
            <p className="text-white/60 mb-6">
              Download our official media kit including logos, brand guidelines, and high-resolution images.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#c8601a] hover:bg-[#e07a35] px-6 py-3 rounded-lg font-semibold transition-colors">
              <Download className="h-5 w-5" strokeWidth={1.5} />
              Download Media Kit
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Press Releases</h2>
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-semibold mb-2">Voyara Launches AI-Powered Trip Planning Platform</h3>
                <p className="text-white/60 text-sm mb-2">January 2026</p>
                <p className="text-white/70 text-sm">
                  Revolutionary travel technology uses artificial intelligence to create personalized itineraries
                </p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-semibold mb-2">Voyara Reaches 100,000 Users Milestone</h3>
                <p className="text-white/60 text-sm mb-2">December 2025</p>
                <p className="text-white/70 text-sm">
                  Growing demand for intelligent travel planning drives rapid user adoption
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="font-serif text-2xl md:text-3xl mb-6 text-[#c8601a]">Media Inquiries</h2>
            <p className="text-white/60 mb-6">
              For press inquiries, interview requests, or media partnerships, please contact our PR team.
            </p>
            <a 
              href="mailto:press@voyara.ai"
              className="inline-flex items-center gap-2 bg-[#c8601a] hover:bg-[#e07a35] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
              Contact PR Team
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
