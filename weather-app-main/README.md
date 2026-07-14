# Weather Now

A responsive weather dashboard built from the Frontend Mentor Weather App designs. It uses Open-Meteo for live location search and weather forecasts, with no API key required.

![Weather Now preview](./preview.jpg)

## Features

- Search suggestions for cities and postal codes
- Current temperature, feels-like temperature, humidity, wind, and precipitation
- Seven-day forecast with WMO weather-code icons
- Hourly forecast with a day selector
- Metric and imperial unit switching
- Loading, no-results, API-error, retry, hover, and keyboard-focus states
- Mobile-first layout that adapts from 320px through desktop screens
- Self-hosted DM Sans and Bricolage Grotesque fonts

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run lint
npm run build
npm start
```

## Project structure

```text
app/                  Next.js route, metadata, and global responsive styles
components/           Search, units, status, and forecast UI components
lib/weather.ts        Typed Open-Meteo requests and weather-code mapping
public/               Supplied icons, backgrounds, and local fonts
design/               Mobile, desktop, and interaction reference images
```

## APIs

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs)

## Implementation commits

- `feat(weather): add forecast data and component logic`
- `feat(ui): add responsive mobile weather layout`
- `feat(ui): add desktop forecast layout`
- `chore: add project configuration and design assets`
- `docs: add project setup and architecture guide`

## Built with

Next.js 16, React 19, TypeScript, and CSS/Tailwind CSS 4.
