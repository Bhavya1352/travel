import { motion } from 'framer-motion';
import { Newspaper, Calendar } from 'lucide-react';

export default function Blog() {
  const blogPosts = [
    {
      title: "Top 10 Hidden Gems in Southeast Asia",
      excerpt: "Discover the lesser-known destinations that will take your breath away",
      date: "January 15, 2026",
      category: "Destinations"
    },
    {
      title: "AI-Powered Travel: The Future is Here",
      excerpt: "How artificial intelligence is revolutionizing the way we plan trips",
      date: "January 10, 2026",
      category: "Technology"
    },
    {
      title: "Sustainable Travel Tips for 2026",
      excerpt: "Explore the world while protecting our planet for future generations",
      date: "January 5, 2026",
      category: "Sustainability"
    },
    {
      title: "Solo Travel Safety Guide",
      excerpt: "Everything you need to know for a safe and rewarding solo adventure",
      date: "December 28, 2025",
      category: "Tips"
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
          <Newspaper className="h-16 w-16 text-[#c8601a] mx-auto mb-6" strokeWidth={1.5} />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4">Blog</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Travel tips, destination guides, and inspiration for your next adventure
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#c8601a]/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[#c8601a] text-sm mb-3">
                <Calendar className="h-4 w-4" strokeWidth={1.5} />
                <span>{post.date}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">{post.category}</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl mb-3 group-hover:text-[#c8601a] transition-colors">
                {post.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 text-[#c8601a] text-sm font-semibold group-hover:underline">
                Read More →
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">More articles coming soon...</p>
        </motion.div>
      </div>
    </div>
  );
}
