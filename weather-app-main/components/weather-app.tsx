"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWeather, type LocationResult, type UnitSystem, type WeatherData } from "@/lib/weather";
import { AppHeader } from "./app-header";
import { SearchBox } from "./search-box";
import { WeatherDashboard } from "./weather-dashboard";
import { StatusView } from "./status-view";

const DEFAULT_LOCATION: LocationResult = {
  id: 2950159,
  name: "Berlin",
  country: "Germany",
  latitude: 52.52437,
  longitude: 13.41053,
  timezone: "Europe/Berlin",
};

export function WeatherApp() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [units, setUnits] = useState<UnitSystem>("metric");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const loadWeather = useCallback(async () => {
    setStatus("loading");
    try {
      setWeather(await fetchWeather(location, units));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [location, units]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadWeather(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadWeather]);

  return (
    <main className="app-shell">
      <AppHeader units={units} onUnitsChange={setUnits} />
      {status === "error" ? (
        <StatusView type="error" onRetry={loadWeather} />
      ) : (
        <>
          <section className="hero" aria-labelledby="page-title">
            <h1 id="page-title">How’s the sky looking today?</h1>
            <SearchBox onSelect={setLocation} />
          </section>
          {status === "loading" || !weather ? (
            <StatusView type="loading" />
          ) : (
            <WeatherDashboard key={`${location.id}-${units}`} location={location} weather={weather} />
          )}
        </>
      )}
    </main>
  );
}
