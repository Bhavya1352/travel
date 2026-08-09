// Real-world Gemini API integration service
// Requires VITE_GEMINI_API_KEY in .env

import { validateAndEnrichPlace } from './placesService';
import { SAMPLE_ITINERARY, SAMPLE_BUDGET_BREAKDOWN } from '../data/itineraries';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are an expert AI travel designer.

Create a detailed, realistic travel itinerary based on:
- destination
- dates
- budget
- travelers
- travel style
- interests

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT use code fences.

Use exactly this structure:

{
  "destination": "Name of destination",
  "summary": "Short personalized summary",
  "totalEstimatedCost": 1000,
  "days_plan": [
    {
      "day": 1,
      "label": "Day 01",
      "title": "Short title",
      "location": "Primary area or neighborhood",
      "morning": "Morning activities",
      "afternoon": "Afternoon activities",
      "evening": "Evening activities",
      "budget": 100,
      "weather": {
        "temp": 24,
        "condition": "Sunny"
      },
      "travelTime": "Approximate travel time",
      "note": "Useful travel tip"
    }
  ]
}

IMPORTANT:
- Create one object for every day.
- Day numbers must start from 1.
- Keep activities realistic.
- Respect the user's budget and travel style.
- Use real places and attractions where possible.
`;

function getCached(key) {
  try {
    const item = localStorage.getItem(key);

    if (!item) return null;

    const { data, expiry } = JSON.parse(item);

    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCached(key, data) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        expiry: Date.now() + 6 * 60 * 60 * 1000
      })
    );
  } catch {
    // Ignore storage errors
  }
}

function normalizeItinerary(data, plan) {
  if (!data || !Array.isArray(data.days_plan)) {
    throw new Error('Gemini returned invalid itinerary structure.');
  }

  const days = data.days_plan
    .filter(Boolean)
    .map((day, index) => ({
      day: Number(day.day) || index + 1,

      label:
        day.label ||
        `Day ${String(index + 1).padStart(2, '0')}`,

      title:
        day.title ||
        'Day Activities',

      location:
        day.location ||
        plan.destination,

      morning:
        day.morning ||
        'Explore local attractions and enjoy breakfast.',

      afternoon:
        day.afternoon ||
        'Explore major attractions and local experiences.',

      evening:
        day.evening ||
        'Enjoy dinner and explore the local area.',

      budget:
        Number(day.budget) || 0,

      weather:
        day.weather || {
          temp: null,
          condition: 'Not available'
        },

      travelTime:
        day.travelTime ||
        'Travel time varies by location.',

      note:
        day.note ||
        'Keep some flexibility in your schedule.'
    }));

  if (days.length === 0) {
    throw new Error('Gemini returned no itinerary days.');
  }

  return {
    ...data,

    destination:
      data.destination || plan.destination,

    summary:
      data.summary ||
      `A personalized trip to ${plan.destination}.`,

    totalEstimatedCost:
      Number(data.totalEstimatedCost) || 0,

    days_plan: days,

    startDate: plan.startDate,
    endDate: plan.endDate,
    travelers: plan.travelers,
    budget: plan.budget,
    travelStyle: plan.travelStyle,
    interests: plan.interests || [],

    isAiGenerated: true
  };
}

export async function generateItinerary(plan) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Gemini API key missing. Add VITE_GEMINI_API_KEY to .env'
    );
  }

  const cacheKey = [
    'itinerary',
    plan.destination,
    plan.startDate,
    plan.endDate,
    plan.budget,
    plan.travelers,
    plan.travelStyle,
    (plan.interests || []).join(',')
  ].join('_');

  const cached = getCached(cacheKey);

  if (cached) {
    console.log('Itinerary loaded from cache');
    return cached;
  }

  try {
    const prompt = `
${SYSTEM_PROMPT}

USER TRIP DETAILS:

Destination: ${plan.destination}
Start Date: ${plan.startDate}
End Date: ${plan.endDate}
Budget: ${plan.budget}
Travelers: ${plan.travelers}
Travel Style: ${plan.travelStyle}
Interests: ${plan.interests?.join(', ') || 'General'}

Generate the complete itinerary now.
`;

    console.log('Calling Gemini API...');

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },

        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],

          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      // Fallback to mock data on 429 (quota exceeded)
      if (response.status === 429) {
        console.warn('Gemini quota exceeded, using mock data');
        return {
          ...SAMPLE_ITINERARY,
          destination: plan.destination,
          startDate: plan.startDate,
          endDate: plan.endDate,
          travelers: plan.travelers,
          budget: plan.budget,
          travelStyle: plan.travelStyle,
          isAiGenerated: false
        };
      }

      throw new Error(
        `Gemini API Error ${response.status}: ${errorText}`
      );
    }

    const responseData = await response.json();

    console.log('Gemini response received');

    const rawText =
      responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error('Gemini response:', responseData);

      throw new Error(
        'Gemini returned an empty response.'
      );
    }

    let itinerary;

    try {
      itinerary = JSON.parse(rawText);
    } catch {
      console.error(
        'Gemini returned invalid JSON:',
        rawText
      );

      throw new Error(
        'Gemini returned invalid JSON.'
      );
    }

    const normalized = normalizeItinerary(
      itinerary,
      plan
    );

    // Enrich itinerary locations with real coordinates
    for (const day of normalized.days_plan) {
      try {
        if (day.location) {
          const enriched =
            await validateAndEnrichPlace(
              day.location,
              normalized.destination
            );

          if (enriched) {
            day.lat = enriched.lat;
            day.lng = enriched.lng;
          }
        }
      } catch (placeError) {
        console.warn(
          'Place enrichment failed:',
          day.location,
          placeError
        );
      }
    }

    setCached(cacheKey, normalized);

    console.log(
      'REAL AI ITINERARY GENERATED SUCCESSFULLY'
    );

    return normalized;

  } catch (error) {
    console.error(
      'REAL GEMINI ERROR:',
      error
    );

    // No mock fallback.
    throw error;
  }
}


// Regenerate a single day
export async function regenerateDay(
  itineraryId,
  dayNumber
) {
  return (
    SAMPLE_ITINERARY.days_plan.find(
      (day) => day.day === dayNumber
    ) ||
    SAMPLE_ITINERARY.days_plan[0]
  );
}


// Budget breakdown
export async function getBudgetBreakdown(plan) {
  return SAMPLE_BUDGET_BREAKDOWN;
}
