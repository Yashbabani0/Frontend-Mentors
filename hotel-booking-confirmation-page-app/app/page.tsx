"use client";

import Image from "next/image";
import { useState } from "react";

const navigationItems = [
  { label: "Your stay", icon: "/icon-bed.svg", active: true, count: "1" },
  { label: "The house", icon: "/icon-house.svg" },
  { label: "Around town", icon: "/icon-pin.svg" },
  { label: "Breakfast", icon: "/icon-breakfast-outline.svg" },
  { label: "Messages", icon: "/icon-mail.svg" },
];

const detailCards = [
  {
    label: "Arrival",
    number: "01",
    icon: "/icon-key.svg",
    color: "terracotta",
    title: "Check-in from 15:00",
    meta: "Sat, 25 April",
    text: "Ring the brass bell by the blue door. If we're at the market, the key is in the terracotta pot by the olive tree.",
  },
  {
    label: "Wifi",
    number: "02",
    icon: "/icon-wifi.svg",
    color: "blue",
    title: "Le Soleil · Guest",
    meta: "Password below",
    text: "",
  },
  {
    label: "Breakfast",
    number: "03",
    icon: "/icon-breakfast.svg",
    color: "rose",
    title: "Served 8 – 10:30",
    meta: "On the terrace",
    text: "Fresh figs, Marseille honey, pain au levain, and espresso. Gluten-free option? Leave a note the night before.",
  },
];

export default function Home() {
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
      <aside
        className={`sidebar${isMenuOpen ? " sidebar--open" : ""}`}
        aria-label="Maison Soleil navigation"
      >
        <div className="sidebar__top">
          <Image src="/logo.svg" alt="Maison Soleil" width={107} height={42} />
          <button
            className="mobile-menu"
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Image
              src={isMenuOpen ? "/icon-close.svg" : "/icon-menu.svg"}
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>

        <nav className="sidebar__nav" id="mobile-navigation" aria-label="Guest sections">
          {navigationItems.map((item) => (
            <a
              className={`sidebar__link${item.active ? " sidebar__link--active" : ""}`}
              href="#"
              key={item.label}
              onClick={closeMenu}
            >
              <Image src={item.icon} alt="" width={20} height={20} />
              <span>{item.label}</span>
              {item.count ? <span className="sidebar__count">{item.count}</span> : null}
            </a>
          ))}
        </nav>

        <div className="sidebar__footer">
          <article className="weather-card">
            <p>Today in Cassis</p>
            <strong>27°</strong>
            <span>Sunny · light breeze</span>
          </article>

          <div className="address-block">
            <p>Est. 1987</p>
            <p>Maison Soleil · 12 Rue des Oliviers · Cassis</p>
            <p>© 2026 Maison Soleil</p>
          </div>
        </div>
      </aside>

      <main className="booking-main">
        <header className="hero-header">
          <div>
            <p className="eyebrow">Booking · Confirmed</p>
            <h1>
              Bienvenue, <em>Lucia.</em>
            </h1>
          </div>
          <div className="hero-actions">
            <button type="button" onClick={handlePrint}>
              Print receipt
            </button>
            <button type="button" className="button-dark" onClick={handleAddToCalendar}>
              Add to calendar
            </button>
          </div>
        </header>

        <section className="booking-stage" aria-label="Booking documents">
          <article className="receipt-card">
            <div className="receipt-card__top">
              <div>
                <p className="mono-label">Receipt</p>
                <h2>Your stay</h2>
              </div>
              <p className="receipt-id">№ MS-2026<br />0421-AH</p>
            </div>
            <div className="date-grid">
              <div>
                <p>Check in</p>
                <strong>25 Apr</strong>
                <span>Saturday · 15:00</span>
              </div>
              <div>
                <p>Check out</p>
                <strong>29 Apr</strong>
                <span>Wednesday · 11:00</span>
              </div>
            </div>
            <dl className="receipt-lines">
              <div><dt>Room · La Garrigue × 4 nights</dt><dd>€ 620.00</dd></div>
              <div><dt>Breakfast × 2 guests</dt><dd>€ 96.00</dd></div>
              <div><dt>Tourist tax</dt><dd>€ 14.40</dd></div>
            </dl>
            <div className="receipt-total">
              <span>Total paid</span>
              <strong>€ 730.40</strong>
            </div>
            <div className="receipt-bottom">
              <span>Paid · Wise · GBP</span>
              <Image src="/icon-barcode.svg" alt="" width={93} height={28} />
            </div>
          </article>

          <Image className="stage-sun" src="/illustration-sun.svg" alt="" width={164} height={164} />

          <article className="welcome-card">
            <div className="welcome-card__top">
              <p>Welcome card</p>
              <Image src="/icon-sun.svg" alt="" width={48} height={48} />
            </div>
            <p className="welcome-card__script">A note from your host,</p>
            <h2>Margaux.</h2>
            <p>
              We&apos;re so glad you&apos;re coming. The shutters will be open, the lemonade
              cold, and the cat - Poivre - pretending not to notice you.
            </p>
            <div>
              <span>Room</span>
              <strong>La Garrigue</strong>
            </div>
          </article>
        </section>

        <section className="details-grid" aria-label="Stay details">
          {detailCards.map((card) => (
            <article className="detail-card" key={card.label}>
              <div className="detail-card__top">
                <div className={`detail-icon detail-icon--${card.color}`}>
                  <Image src={card.icon} alt="" width={22} height={22} />
                </div>
                <p>{card.label}</p>
                <span>{card.number}</span>
              </div>
              <h2>{card.title}</h2>
              <p className="detail-card__meta">{card.meta}</p>
              {card.label === "Wifi" ? (
                <div className="wifi-table" aria-label="Wifi details">
                  <div><span>Network</span><strong>Le Soleil · Guest</strong></div>
                  <div>
                    <span>Password</span>
                    <strong>soleil-2026</strong>
                    <button type="button" onClick={handleCopyPassword}>
                      {copyStatus}
                    </button>
                  </div>
                </div>
              ) : (
                <p>{card.text}</p>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
