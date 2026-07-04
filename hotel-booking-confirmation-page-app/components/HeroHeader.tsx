type HeroHeaderProps = {
  onAddToCalendar: () => void;
  onPrint: () => void;
};

export function HeroHeader({ onAddToCalendar, onPrint }: HeroHeaderProps) {
  return (
    <header className="hero-header">
      <div>
        <p className="eyebrow">Booking · Confirmed</p>
        <h1>
          Bienvenue, <em>Lucia.</em>
        </h1>
      </div>
      <div className="hero-actions">
        <button type="button" onClick={onPrint}>
          Print receipt
        </button>
        <button type="button" className="button-dark" onClick={onAddToCalendar}>
          Add to calendar
        </button>
      </div>
    </header>
  );
}
