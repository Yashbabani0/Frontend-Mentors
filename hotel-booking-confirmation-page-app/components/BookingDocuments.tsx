import Image from "next/image";

export function BookingDocuments() {
  return (
    <section className="booking-stage" aria-label="Booking documents">
      <article className="receipt-card">
        <div className="receipt-card__top">
          <div>
            <p className="mono-label">Receipt</p>
            <h2>Your stay</h2>
          </div>
          <p className="receipt-id">
            № MS-2026
            <br />
            0421-AH
          </p>
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
          <div>
            <dt>Room · La Garrigue × 4 nights</dt>
            <dd>€ 620.00</dd>
          </div>
          <div>
            <dt>Breakfast × 2 guests</dt>
            <dd>€ 96.00</dd>
          </div>
          <div>
            <dt>Tourist tax</dt>
            <dd>€ 14.40</dd>
          </div>
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
  );
}
