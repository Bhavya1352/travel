// Maps Service
//
// In production, this would interact with a Maps API (Google Maps, Mapbox) through
// a serverless proxy. For now, it returns mock location data that can be rendered
// on an embedded map or static map placeholder.
//
// The actual map rendering (tiles, markers, interactions) would use a client-side
// map library (e.g. react-map-gl / Leaflet) with a token loaded from env vars.
// That token would be map-provider-specific and stored in VITE_ env vars (public
// keys only — not private API keys).

import { SAMPLE_ITINERARY } from '../data/itineraries';
import { getDestinationById } from '../data/destinations';

const SIMULATED_DELAY = 300;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get all map markers for an itinerary (one per activity location).
export async function getItineraryMapData(itineraryId) {
  await delay(SIMULATED_DELAY);
  const markers = [];
  SAMPLE_ITINERARY.days_plan.forEach((day) => {
    day.activities.forEach((activity) => {
      if (activity.location) {
        markers.push({
          id: `${day.day}-${activity.time}`,
          day: day.day,
          title: activity.title,
          time: activity.time,
          category: activity.category,
          lat: activity.location.lat,
          lng: activity.location.lng,
          locationName: activity.location.name,
        });
      }
    });
  });
  return {
    center: { lat: 36.3932, lng: 25.4615 },
    zoom: 11,
    markers,
  };
}

// Get map data for a destination (attractions as markers).
export async function getDestinationMapData(destinationId) {
  await delay(SIMULATED_DELAY);
  const dest = getDestinationById(destinationId);
  if (!dest) return null;
  return {
    center: { lat: dest.lat, lng: dest.lng },
    zoom: 12,
    markers:
      dest.attractions.map((a, i) => ({
        id: `attraction-${i}`,
        title: a.name,
        type: a.type,
        lat: dest.lat + (Math.random() - 0.5) * 0.05,
        lng: dest.lng + (Math.random() - 0.5) * 0.05,
      })) ?? [],
  };
}
