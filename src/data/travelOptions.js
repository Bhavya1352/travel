// Centralized travel options and constants for the planner.
// Keeping these in one place makes it easy to extend or wire to a real API later.

export const TRAVEL_STYLES = [
  { id: 'luxury', label: 'Luxury', description: '5-star stays, private transfers, curated experiences' },
  { id: 'adventure', label: 'Adventure', description: 'Hiking, diving, off-the-beaten-path thrills' },
  { id: 'cultural', label: 'Cultural', description: 'Museums, history, local traditions and cuisine' },
  { id: 'relaxed', label: 'Relaxed', description: 'Slow mornings, scenic views, minimal planning' },
  { id: 'family', label: 'Family', description: 'Kid-friendly activities and comfortable pacing' },
  { id: 'romantic', label: 'Romantic', description: 'Intimate dinners, sunset views, cozy stays' },
];

export const INTERESTS = [
  'Nature & Outdoors',
  'Food & Cuisine',
  'History & Culture',
  'Architecture',
  'Nightlife',
  'Beaches',
  'Wildlife',
  'Photography',
  'Shopping',
  'Wellness & Spa',
];

export const BUDGET_TIERS = [
  { id: 'budget', label: 'Budget', range: '$50 – $100 / day', perDay: 75 },
  { id: 'midrange', label: 'Mid-Range', range: '$100 – $250 / day', perDay: 175 },
  { id: 'premium', label: 'Premium', range: '$250 – $500 / day', perDay: 375 },
  { id: 'luxury', label: 'Luxury', range: '$500+ / day', perDay: 650 },
];

export const NAV_LINKS = [
  { label: 'Destinations', href: '/planner' },
  { label: 'Trip Planner', href: '/planner' },
  { label: 'My Trips', href: '/my-trips' },
];

// Popular destinations for autocomplete (would come from an API in production).
export const POPULAR_DESTINATIONS = [
  { name: 'Santorini, Greece', country: 'Greece', image: 'https://images.pexels.com/photos/4084639/pexels-photo-4084639.jpeg' },
  { name: 'Kyoto, Japan', country: 'Japan', image: 'https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg' },
  { name: 'Marrakech, Morocco', country: 'Morocco', image: 'https://images.pexels.com/photos/1469845/pexels-photo-1469845.jpeg' },
  { name: 'Banff, Canada', country: 'Canada', image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg' },
  { name: 'Amalfi Coast, Italy', country: 'Italy', image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg' },
  { name: 'Bali, Indonesia', country: 'Indonesia', image: 'https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg' },
  { name: 'Patagonia, Chile', country: 'Chile', image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg' },
  { name: 'Reykjavik, Iceland', country: 'Iceland', image: 'https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg' },
];
