import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Loader from '../components/Loader';

// Lazy load below-the-fold components for better initial load
const ExploreDestinations = lazy(() => import('../components/ExploreDestinations'));
const TripUnfolding = lazy(() => import('../components/TripUnfolding'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const PersonalizationStats = lazy(() => import('../components/PersonalizationStats'));
const CTASection = lazy(() => import('../components/CTASection'));
const Footer = lazy(() => import('../components/Footer'));

// Home page — assembles the landing page sections in order.
export default function Home() {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <ExploreDestinations />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <TripUnfolding />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <PersonalizationStats />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
