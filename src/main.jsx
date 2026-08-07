import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';
import { initPerformanceOptimizations } from './utils/performanceOptimizations.js';

// Initialize performance optimizations as early as possible
initPerformanceOptimizations();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PerformanceAwareApp() {
  useEffect(() => {
    // Report loading performance
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        console.log('Page Load Time:', Math.round(nav.loadEventEnd - nav.fetchStart), 'ms');
      }
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PerformanceAwareApp />
    </QueryClientProvider>
  </StrictMode>
);
