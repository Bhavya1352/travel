import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Voyara's AI trip planning work?",
      answer: "Voyara uses advanced artificial intelligence to analyze your preferences, travel history, and millions of data points to create personalized trip itineraries. Simply tell us where you want to go and what you enjoy, and our AI will suggest the perfect itinerary for you."
    },
    {
      question: "Is Voyara free to use?",
      answer: "Yes! Voyara offers a free tier that includes basic trip planning features. We also offer premium subscriptions with additional features like real-time updates, exclusive destination insights, and priority support."
    },
    {
      question: "Can I modify the AI-generated itineraries?",
      answer: "Absolutely. Our AI suggestions are just that - suggestions. You have full control to customize every aspect of your trip, from changing activities to adjusting timelines. Think of our AI as your intelligent travel assistant."
    },
    {
      question: "How accurate are the travel recommendations?",
      answer: "Our recommendations are based on extensive data analysis including user reviews, seasonal patterns, local events, and real-time availability. We continuously improve our algorithms to provide increasingly accurate and personalized suggestions."
    },
    {
      question: "Can I share my trips with others?",
      answer: "Yes, you can share your trip itineraries with friends, family, or travel companions. They can view the plans and even collaborate on modifications if you grant them access."
    },
    {
      question: "What destinations does Voyara support?",
      answer: "Voyara supports destinations worldwide, from major cities to hidden gems. Our database is constantly expanding, and we're adding new destinations regularly based on user demand."
    },
    {
      question: "How do I cancel or change my subscription?",
      answer: "You can manage your subscription settings from your account dashboard at any time. Changes take effect immediately, and you'll retain access until the end of your current billing period."
    },
    {
      question: "Is my travel data secure?",
      answer: "We take data security very seriously. Your travel information is encrypted and stored securely. We never sell your personal data to third parties, and you can delete your data at any time."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-widest mb-4">FAQ</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Frequently asked questions about Voyara
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#c8601a]/30 transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg pr-8">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#c8601a] flex-shrink-0" strokeWidth={1.5} />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/60 flex-shrink-0" strokeWidth={1.5} />
                  )}
                </div>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <p className="text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 max-w-3xl mx-auto"
        >
          <p className="text-white/60 mb-4">
            Still have questions?
          </p>
          <a 
            href="mailto:support@voyara.ai"
            className="inline-block bg-[#c8601a] hover:bg-[#e07a35] px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
