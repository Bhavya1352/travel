// Real-world Weather Service using the public keyless Open-Meteo API.
// Maps WMO codes to clear condition names.

export async function getWeather(lat, lng) {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
  if (!res.ok) throw new Error('Weather API request failed');
  const data = await res.json();
  
  // Map WMO codes to readable conditions
  const codeMap = {
    0: 'Sunny',
    1: 'Clear', 2: 'Partly Cloudy', 3: 'Cloudy',
    45: 'Foggy', 48: 'Foggy',
    51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
    61: 'Rainy', 63: 'Rainy', 65: 'Rainy',
    71: 'Snowy', 73: 'Snowy', 75: 'Snowy',
    80: 'Rain Showers', 81: 'Rain Showers', 82: 'Rain Showers',
    95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
  };
  
  const condition = codeMap[data.current.weather_code] || 'Partly Cloudy';
  
  return {
    temp: Math.round(data.current.temperature_2m),
    condition: condition,
    humidity: data.current.relative_humidity_2m,
    wind: Math.round(data.current.wind_speed_10m),
    unit: 'C'
  };
}

export async function getForecast(lat, lng) {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max&timezone=auto`);
  if (!res.ok) throw new Error('Forecast API request failed');
  const data = await res.json();
  
  const codeMap = {
    0: 'Sunny', 1: 'Clear', 2: 'Partly Cloudy', 3: 'Cloudy',
    45: 'Foggy', 51: 'Drizzle', 61: 'Rainy', 71: 'Snowy',
    80: 'Showers', 95: 'Stormy'
  };

  return data.daily.time.slice(0, 5).map((time, i) => ({
    day: new Date(time + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
    temp: Math.round(data.daily.temperature_2m_max[i]),
    condition: codeMap[data.daily.weather_code[i]] || 'Sunny'
  }));
}
