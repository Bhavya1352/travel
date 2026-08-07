import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Loader from './components/Loader';

// Eager load Home page (initial route)
import Home from './pages/Home';

// Lazy load all other routes for code splitting
const Planner = lazy(() => import('./pages/Planner'));
const Itinerary = lazy(() => import('./pages/Itinerary'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetails = lazy(() => import('./pages/DestinationDetails'));
const MyTrips = lazy(() => import('./pages/MyTrips'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/planner"
            element={
              <Suspense fallback={<Loader label="Loading planner..." />}>
                <Planner />
              </Suspense>
            }
          />
          <Route
            path="/itinerary"
            element={
              <Suspense fallback={<Loader label="Loading itinerary..." />}>
                <Itinerary />
              </Suspense>
            }
          />
          <Route
            path="/destinations"
            element={
              <Suspense fallback={<Loader label="Loading destinations..." />}>
                <Destinations />
              </Suspense>
            }
          />
          <Route
            path="/destination/:id"
            element={
              <Suspense fallback={<Loader label="Loading destination..." />}>
                <DestinationDetails />
              </Suspense>
            }
          />
          <Route
            path="/my-trips"
            element={
              <Suspense fallback={<Loader label="Loading your trips..." />}>
                <MyTrips />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
