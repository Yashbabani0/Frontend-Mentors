"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { locationLabel, searchLocations, type LocationResult } from "@/lib/weather";

export function SearchBox({ onSelect }: { onSelect: (location: LocationResult) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query.trim().length < 3) { setResults([]); setSearched(false); return; }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try { setResults(await searchLocations(query.trim(), controller.signal)); setSearched(true); }
      catch (error) { if ((error as Error).name !== "AbortError") setResults([]); }
      finally { setSearching(false); }
    }, 350);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);

  const choose = (location: LocationResult) => { setQuery(locationLabel(location)); setResults([]); setSearched(false); onSelect(location); };
  const submit = (event: FormEvent) => { event.preventDefault(); if (results[0]) choose(results[0]); };

  return (
    <form className="search" onSubmit={submit} role="search">
      <div className="search-field-wrap">
        <Image className="search-icon" src="/icon-search.svg" alt="" width={21} height={21} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a place..." aria-label="Search for a place" autoComplete="off" />
        {(searching || (searched && query.length >= 3)) && (
          <div className="search-results" role="listbox">
            {searching ? <p className="search-message"><Image src="/icon-loading.svg" alt="" width={20} height={20} /> Search in progress</p> : results.length ? results.map((result) => (
              <button type="button" role="option" aria-selected="false" key={result.id} onClick={() => choose(result)}>{locationLabel(result)}{result.admin1 && <small>{result.admin1}</small>}</button>
            )) : <p className="search-message">No search results found!</p>}
          </div>
        )}
      </div>
      <button className="search-button" type="submit">Search</button>
    </form>
  );
}
