// API service layer.
//
// All network calls (destination search, AI itinerary generation, weather, etc.)
// live here so UI components never touch fetch/axios directly. Sensitive keys are
// never embedded in the frontend — the real implementations will call our own
// serverless endpoints (e.g. Supabase Edge Functions) which hold the secrets.
//
// Each function returns a Promise and is designed to be consumed by TanStack Query.

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

async function handleResponse(res) {
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed (${res.status})`);
  }
  return res.json();
}

// Destination autocomplete — POST to our backend which proxies a places API.
export async function searchDestinations(query) {
  if (!query || query.trim().length < 2) return [];
  const res = await fetch(`${API_BASE}/destinations/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return handleResponse(res);
}

// AI itinerary generation — the backend holds the AI provider key securely.
export async function generateItinerary(plan) {
  const res = await fetch(`${API_BASE}/itineraries/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plan),
  });
  return handleResponse(res);
}

// Weather lookup for a destination.
export async function getWeather(lat, lon) {
  const res = await fetch(`${API_BASE}/weather?lat=${lat}&lon=${lon}`);
  return handleResponse(res);
}
