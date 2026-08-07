import { useState, useEffect, useCallback } from 'react';

// Favorites hook — persists to localStorage.
// Supports favoriting destinations and trips by ID.

const STORAGE_KEY = 'voyara_favorites';

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { destinations: [], trips: [] };
  } catch {
    return { destinations: [], trips: [] };
  }
}

function writeFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // ignore quota errors
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    writeFavorites(favorites);
  }, [favorites]);

  const toggleDestination = useCallback((id) => {
    setFavorites((prev) => {
      const has = prev.destinations.includes(id);
      return {
        ...prev,
        destinations: has
          ? prev.destinations.filter((d) => d !== id)
          : [...prev.destinations, id],
      };
    });
  }, []);

  const toggleTrip = useCallback((id) => {
    setFavorites((prev) => {
      const has = prev.trips.includes(id);
      return {
        ...prev,
        trips: has ? prev.trips.filter((t) => t !== id) : [...prev.trips, id],
      };
    });
  }, []);

  const isFavoriteDestination = useCallback(
    (id) => favorites.destinations.includes(id),
    [favorites.destinations]
  );

  const isFavoriteTrip = useCallback(
    (id) => favorites.trips.includes(id),
    [favorites.trips]
  );

  return {
    favorites,
    toggleDestination,
    toggleTrip,
    isFavoriteDestination,
    isFavoriteTrip,
  };
}
