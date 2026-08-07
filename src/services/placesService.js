import { DESTINATIONS, getDestinationById } from '../data/destinations';

const SIMULATED_DELAY = 300;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Search destinations by query string (for autocomplete).
export async function searchDestinations(query) {
  await delay(SIMULATED_DELAY);
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase();
  return DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q)
  ).map((d) => ({
    id: d.id,
    name: d.name,
    country: d.country,
    image: d.image,
    tagline: d.tagline,
  }));
}

// Get all destinations.
export async function getAllDestinations() {
  await delay(SIMULATED_DELAY);
  return DESTINATIONS;
}

// Get a single destination by ID.
export async function getDestination(id) {
  await delay(SIMULATED_DELAY);
  return getDestinationById(id);
}

// Validate & enrich location coordinates using keyless OpenStreetMap Nominatim search API.
// Allows real-world map coordinates check on-the-fly.
export async function validateAndEnrichPlace(placeName, cityContext = '') {
  try {
    const query = `${placeName}${cityContext ? ', ' + cityContext : ''}`;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
      headers: {
        'User-Agent': 'VoyaraPortfolioApp/1.0'
      }
    });
    if (!res.ok) throw new Error('Nominatim geocode failed');
    const results = await res.json();
    if (results && results.length > 0) {
      return {
        lat: parseFloat(results[0].lat),
        lng: parseFloat(results[0].lon),
        displayName: results[0].display_name,
        type: results[0].type
      };
    }
  } catch (err) {
    console.warn('Geocoding enricher fallback:', err.message);
  }
  return null;
}

// Get attractions for a destination (placeholder - requires implementation)
export async function getAttractions(destinationId) {
  throw new Error('getAttractions requires implementation with real places API');
}

