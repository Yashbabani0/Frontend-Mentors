export type UnitSystem = "metric" | "imperial";

export type LocationResult = {
  id: number;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type WeatherPoint = {
  time: string;
  temperature: number;
  code: number;
};

export type DailyForecast = {
  date: string;
  high: number;
  low: number;
  code: number;
};

export type WeatherData = {
  current: {
    time: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    code: number;
  };
  daily: DailyForecast[];
  hourly: WeatherPoint[];
  temperatureUnit: string;
  windUnit: string;
  precipitationUnit: string;
};

type GeocodingResponse = { results?: LocationResult[] };

type ForecastResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  current_units: Record<string, string>;
  hourly: { time: string[]; temperature_2m: number[]; weather_code: number[] };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};

export async function searchLocations(query: string, signal?: AbortSignal) {
  const params = new URLSearchParams({ name: query, count: "5", language: "en", format: "json" });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, { signal });
  if (!response.ok) throw new Error("Location search failed");
  const data = (await response.json()) as GeocodingResponse;
  return data.results ?? [];
}

export async function fetchWeather(location: LocationResult, units: UnitSystem, signal?: AbortSignal): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    timezone: location.timezone || "auto",
    forecast_days: "7",
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    temperature_unit: units === "imperial" ? "fahrenheit" : "celsius",
    wind_speed_unit: units === "imperial" ? "mph" : "kmh",
    precipitation_unit: units === "imperial" ? "inch" : "mm",
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal });
  if (!response.ok) throw new Error("Weather service unavailable");
  const data = (await response.json()) as ForecastResponse;

  return {
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      windSpeed: data.current.wind_speed_10m,
      code: data.current.weather_code,
    },
    daily: data.daily.time.map((date, index) => ({
      date,
      high: data.daily.temperature_2m_max[index],
      low: data.daily.temperature_2m_min[index],
      code: data.daily.weather_code[index],
    })),
    hourly: data.hourly.time.map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      code: data.hourly.weather_code[index],
    })),
    temperatureUnit: data.current_units.temperature_2m,
    windUnit: data.current_units.wind_speed_10m,
    precipitationUnit: data.current_units.precipitation,
  };
}

export function weatherIcon(code: number) {
  if (code === 0) return "/icon-sunny.webp";
  if (code <= 2) return "/icon-partly-cloudy.webp";
  if (code === 3) return "/icon-overcast.webp";
  if (code <= 48) return "/icon-fog.webp";
  if (code <= 57) return "/icon-drizzle.webp";
  if (code <= 67 || (code >= 80 && code <= 82)) return "/icon-rain.webp";
  if (code <= 77 || (code >= 85 && code <= 86)) return "/icon-snow.webp";
  return "/icon-storm.webp";
}

export function locationLabel(location: LocationResult) {
  return [location.name, location.country].filter(Boolean).join(", ");
}
