# FX Checker

A Frontend Mentor FX Checker solution built with Next.js, TypeScript, Tailwind CSS v4, Motion, Recharts, and the Frankfurter exchange-rate API.

## Overview

FX Checker is a dark, keyboard-accessible currency converter with live rates, searchable currency selection, market ticker data, a rate-history chart, multi-currency comparison, pinned favorite pairs, and a local conversion log.

## Features

- Convert a SEND amount into a RECEIVE currency using live exchange rates.
- Search and select currencies from the Frankfurter currency list.
- Swap send and receive currencies.
- Favorite the active pair and persist pinned pairs in the browser.
- Log conversions and persist the conversion log in the browser.
- View a live markets ticker with recent percentage movement.
- View rate history for the active pair with range controls, responsive axes, tooltip, and animated area chart.
- Compare the send amount against multiple currencies.
- Pin and unpin comparison rows.
- Load a pinned favorite pair back into the converter.
- Clear or delete conversion log entries.
- Remember the last active tab.
- Show empty/error states for history, compare, favorites, and log.
- Animate converter interactions, currency picker transitions, tab changes, active tab underline, list rows, and chart drawing with Motion.

## Built With

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Motion for React
- Recharts
- Frankfurter API
- Browser `localStorage`

## API

This project uses the current Frankfurter v2 endpoints:

- Currencies: `GET https://api.frankfurter.dev/v2/currencies`
- Single/latest pair: `GET https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR`
- Batch comparison rates: `GET https://api.frankfurter.dev/v2/rates?base=USD&quotes=GBP,JPY,CHF`
- Time series: `GET https://api.frankfurter.dev/v2/rates?from=2026-06-01&to=2026-07-01&base=USD&quotes=EUR`

The original challenge text references older `/latest` and `/start..end` style URLs. The app uses the working v2 `/rates` API shape.

## localStorage

The app stores user-only data in the browser:

- `fx-checker:favorites`
- `fx-checker:conversion-log`
- `fx-checker:active-tab`

Invalid stored JSON is ignored safely and falls back to empty state.

## Accessibility

- Currency controls, swap, favorite, log, range controls, and tabs are keyboard-focusable.
- Tabs use `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
- Tabs support ArrowLeft, ArrowRight, Home, and End navigation.
- Focus states are visible on the dark interface.
- Dynamic favorite/log actions are announced with an `aria-live` region.
- Converted receive amount uses an existing live region.

## Motion

Motion is used for interaction polish across the app:

- Converter card entrance and button hover/tap states.
- Currency picker open/close animation.
- Animated active underline for the FX tabs.
- Smooth tab panel transitions.
- Staggered row entrances in Compare, Favorites, and Log.
- Recharts area-chart animation and tooltip interactions in History.

## Known Limitations

- Only flags included in `public/flags` render as images. Other currencies fall back to a small code badge.
- Favorite pair changes are derived from recent available time-series points, which may represent the most recent provider update rather than exactly 24 hours.

## Run Locally

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Verification

```bash
bun run lint
bun run tsc --noEmit
bun run build
```
