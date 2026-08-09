import { motion } from 'framer-motion';
import { HelpCircle, Search, MessageCircle } from 'lucide-react';

export default function Help() {
  const helpTopics = [
    {
      title: "Getting Started",
      description: "Learn how to create your first trip plan"
    },
    {
      title: "Trip Planning",
      description: "Master the art of intelligent itinerary creation"
    },
    {
      title: "Account Settings",
      description: "Manage your profile and preferences"
    },
    {
      title: "Destinations",
      description: "Explore and discover new places"
    },
    {
      title: "Saved Trips",
      description: "Access and manage your saved itineraries"
    },
    {
      title: "Billing & Payments",
      description: "Understand our pricing and payment options"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2e22] to-[#16271d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <HelpCircle className="h-16 w-16 text-[#c8601a] mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4">Help Center</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Find answers to your questions and get the support you need
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#c8601a]/50 transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        >
          {helpTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#c8601a]/30 transition-all duration-300 cursor-pointer group"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[#c8601a] transition-colors">
                {topic.title}
              </h3>
              <p className="text-white/60 text-sm">
                {topic.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 text-center">
            <MessageCircle className="h-12 w-12 text-[#c8601a] mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="font-serif text-2xl md:text-3xl mb-4 text-[#c8601a]">Still need help?</h2>
            <p className="text-white/60 mb-6">
              Our support team is available 24/7 to assist you with any questions
            </p>
            <a 
              href="mailto:support@voyara.ai"
              className="inline-block bg-[#c8601a] hover:bg-[#e07a35] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
