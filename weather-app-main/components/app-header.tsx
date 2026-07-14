"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { UnitSystem } from "@/lib/weather";

export function AppHeader({ units, onUnitsChange }: { units: UnitSystem; onUnitsChange: (units: UnitSystem) => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!menuRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="app-header">
      <Image src="/logo.svg" alt="Weather Now" width={197} height={40} priority />
      <div className="units-control" ref={menuRef}>
        <button className="units-button" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <Image src="/icon-units.svg" alt="" width={18} height={18} /> Units <Image src="/icon-dropdown.svg" alt="" width={12} height={7} />
        </button>
        {open && (
          <div className="units-menu">
            <p>Switch to {units === "metric" ? "Imperial" : "Metric"}</p>
            <span>Temperature</span>
            <button type="button" onClick={() => { onUnitsChange("metric"); setOpen(false); }}>Celsius (°C) {units === "metric" && "✓"}</button>
            <button type="button" onClick={() => { onUnitsChange("imperial"); setOpen(false); }}>Fahrenheit (°F) {units === "imperial" && "✓"}</button>
            <span>Wind Speed</span><p>{units === "metric" ? "km/h ✓" : "mph ✓"}</p>
            <span>Precipitation</span><p>{units === "metric" ? "Millimeters (mm) ✓" : "Inches (in) ✓"}</p>
          </div>
        )}
      </div>
    </header>
  );
}
