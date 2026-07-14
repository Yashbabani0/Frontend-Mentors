"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { locationLabel, weatherIcon, type LocationResult, type WeatherData } from "@/lib/weather";

const dayName = (date: string, style: "short" | "long" = "short") => new Intl.DateTimeFormat("en", { weekday: style, timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
const round = (value: number) => Math.round(value);

export function WeatherDashboard({ location, weather }: { location: LocationResult; weather: WeatherData }) {
  const [selectedDate, setSelectedDate] = useState(weather.daily[0].date);
  const hoursByDay = useMemo(() => weather.hourly.filter((hour) => hour.time.startsWith(selectedDate)), [selectedDate, weather.hourly]);
  const currentHour = new Date(weather.current.time).getHours();
  const displayHours = selectedDate === weather.daily[0].date ? hoursByDay.filter((hour) => new Date(hour.time).getHours() >= currentHour).slice(0, 8) : hoursByDay.slice(8, 16);
  const dateLabel = new Intl.DateTimeFormat("en", { weekday: "long", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${weather.daily[0].date}T12:00:00Z`));

  return (
    <div className="dashboard">
      <div className="main-forecast">
        <section className="current-card">
          <div><h2>{locationLabel(location)}</h2><p>{dateLabel}</p></div>
          <div className="current-temperature"><Image src={weatherIcon(weather.current.code)} alt="" width={112} height={112} /><strong>{round(weather.current.temperature)}°</strong></div>
        </section>
        <section className="metrics" aria-label="Current weather details">
          <Metric label="Feels Like" value={`${round(weather.current.feelsLike)}°`} />
          <Metric label="Humidity" value={`${round(weather.current.humidity)}%`} />
          <Metric label="Wind" value={`${round(weather.current.windSpeed)} ${weather.windUnit}`} />
          <Metric label="Precipitation" value={`${weather.current.precipitation} ${weather.precipitationUnit}`} />
        </section>
        <section className="daily"><h2>Daily forecast</h2><div className="daily-grid">{weather.daily.map((day) => (
          <article className="day-card" key={day.date}><h3>{dayName(day.date)}</h3><Image src={weatherIcon(day.code)} alt="" width={60} height={60} /><p><span>{round(day.high)}°</span><span>{round(day.low)}°</span></p></article>
        ))}</div></section>
      </div>
      <section className="hourly">
        <div className="hourly-heading"><h2>Hourly forecast</h2><select value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} aria-label="Forecast day">{weather.daily.map((day) => <option key={day.date} value={day.date}>{dayName(day.date, "long")}</option>)}</select></div>
        <div className="hour-list">{displayHours.map((hour) => <article className="hour-row" key={hour.time}><div><Image src={weatherIcon(hour.code)} alt="" width={40} height={40} /><span>{new Intl.DateTimeFormat("en", { hour: "numeric" }).format(new Date(hour.time))}</span></div><span>{round(hour.temperature)}°</span></article>)}</div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <article className="metric-card"><h3>{label}</h3><p>{value}</p></article>;
}
