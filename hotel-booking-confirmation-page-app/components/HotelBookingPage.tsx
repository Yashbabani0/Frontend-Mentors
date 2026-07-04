"use client";

import { useState } from "react";

import { BookingDocuments } from "./BookingDocuments";
import { HeroHeader } from "./HeroHeader";
import { Sidebar } from "./Sidebar";
import { StayDetails } from "./StayDetails";

export function HotelBookingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy");

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handlePrint() {
    window.print();
  }

  function handleAddToCalendar() {
    const calendarEvent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Maison Soleil//Booking//EN",
      "BEGIN:VEVENT",
      "UID:maison-soleil-ms-2026-0421-ah",
      "DTSTAMP:20260425T130000Z",
      "DTSTART:20260425T130000Z",
      "DTEND:20260429T090000Z",
      "SUMMARY:Maison Soleil stay - La Garrigue",
      "LOCATION:Maison Soleil, 12 Rue des Oliviers, Cassis",
      "DESCRIPTION:Check in from 15:00. Check out at 11:00.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([calendarEvent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "maison-soleil-booking.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleCopyPassword() {
    try {
      await navigator.clipboard.writeText("soleil-2026");
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Try again");
    }

    window.setTimeout(() => setCopyStatus("Copy"), 1800);
  }

  return (
    <div className="booking-shell">
      <Sidebar
        isMenuOpen={isMenuOpen}
        onCloseMenu={closeMenu}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />

      <main className="booking-main">
        <HeroHeader onAddToCalendar={handleAddToCalendar} onPrint={handlePrint} />
        <BookingDocuments />
        <StayDetails copyStatus={copyStatus} onCopyPassword={handleCopyPassword} />
      </main>
    </div>
  );
}
