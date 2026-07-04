# FX Checker Context

## Tabs

The lower FX dashboard uses client-side tab state only. Switching between
History, Compare, Favorites, and Log must not navigate or create a new route.

### History

Shows the active converter pair, summary stat cards, a range selector, and a
chart area for time-series rates. It needs the active base currency, target
currency, current live rate, selected range, and historical rate points.

Empty/error state:

- Title: `No chart data available`
- Description: `We couldn't load rate history for [PAIR] right now. This usually clears up in a minute.`

Future helper/API work:

- Normalize Frankfurter time-series responses in one helper.
- Add a dedicated chart component or lightweight chart library only if needed.
- Cache the last successful chart points per pair/range.

### Compare

Shows the SEND amount converted into several target currencies. It needs the
base currency, parsed send amount, available currency metadata, comparison
rates, and the current favorites list.

Empty state:

- Title: `No comparison available`
- Description: `Enter an amount in SEND above to see what your money is worth in other currencies.`

Future helper/API work:

- Move comparison target selection into user preferences.
- Batch/cached rate loading for the current base currency.

### Favorites

Shows pinned currency pairs saved by the user. It needs the favorites list,
live pair rates, and a callback to load a pair back into the converter.

Empty state:

- Title: `No pinned pairs yet`
- Description: `Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.`

Future helper/API work:

- Add real 24h change values once a reliable historical endpoint is normalized.
- Cache live favorite pair rates.

### Log

Shows conversions that the user explicitly records with LOG CONVERSION. It
needs the conversion log list and delete/clear callbacks.

Empty state:

- Title: `No conversions logged yet`
- Description: `Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser.`

## localStorage Keys

- `fx-checker:favorites`
- `fx-checker:conversion-log`
- `fx-checker:active-tab`

All localStorage reads should use safe JSON parsing and schema guards. Invalid
or unexpected data should fall back to an empty list or the default History tab
without crashing.

## Data Types

```ts
type FxTab = "history" | "compare" | "favorites" | "log";

type FavoritePair = {
  id: string;
  base: string;
  target: string;
  rate: number;
  change24h?: number;
  createdAt: string;
};

type ConversionLogEntry = {
  id: string;
  base: string;
  target: string;
  sendAmount: number;
  receiveAmount: number;
  rate: number;
  createdAt: string;
};
```

## Accessibility Requirements

- Tabs use `role="tablist"`, `role="tab"`, `role="tabpanel"`,
  `aria-selected`, and `aria-controls`.
- All interactive controls are keyboard-focusable buttons.
- Focus states must be visible against the dark interface.
- Favorite buttons use `aria-pressed`.
- Conversion results should remain announced with existing live regions where
  applicable.

## API Helpers Needed

- `GET /v2/currencies` for currency metadata.
- `GET /v2/rate/{base}/{target}` for active and favorite pair rates.
- `GET /v2/rates?base={base}&quotes={targets}` for comparison rows.
- A normalized historical rates helper for the History chart, with graceful
  fallback when the API shape or endpoint is unavailable.
