import { useState, useEffect, useCallback } from 'react';

// Saved trips hook — persists to localStorage.
// In production this would sync with Supabase.

const STORAGE_KEY = 'voyara_saved_trips';

function readTrips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeTrips(trips) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch {
    // ignore
  }
}

export function useSavedTrips() {
  const [trips, setTrips] = useState(readTrips);

  useEffect(() => {
    writeTrips(trips);
  }, [trips]);

  const saveTrip = useCallback((trip) => {
    setTrips((prev) => {
      if (prev.some((t) => t.id === trip.id)) return prev;
      return [{ ...trip, createdAt: new Date().toISOString(), status: 'planned' }, ...prev];
    });
  }, []);

  const removeTrip = useCallback((id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const hasTrip = useCallback(
    (id) => trips.some((t) => t.id === id),
    [trips]
  );

  return { trips, saveTrip, removeTrip, hasTrip };
}
