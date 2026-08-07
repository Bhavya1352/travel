import { useState, useCallback } from 'react';

// Local form state for the hero planner bar.
// Kept in a hook so the component stays presentational and the same state shape
// can be reused by the full planner page later.
export function useTripPlanner(initial = {}) {
  const [plan, setPlan] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'midrange',
    travelers: 2,
    travelStyle: 'balanced',
    interests: [],
    ...initial,
  });

  const updateField = useCallback((field, value) => {
    setPlan((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleInterest = useCallback((interest) => {
    setPlan((prev) => {
      const has = prev.interests.includes(interest);
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  }, []);

  const reset = useCallback(() => {
    setPlan({
      destination: '',
      startDate: '',
      endDate: '',
      budget: 'midrange',
      travelers: 2,
      travelStyle: 'balanced',
      interests: [],
    });
  }, []);

  return { plan, updateField, toggleInterest, reset };
}
