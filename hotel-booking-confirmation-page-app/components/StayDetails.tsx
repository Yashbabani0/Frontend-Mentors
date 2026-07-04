import Image from "next/image";

import { detailCards } from "../data";

type StayDetailsProps = {
  copyStatus: string;
  onCopyPassword: () => void;
};

export function StayDetails({ copyStatus, onCopyPassword }: StayDetailsProps) {
  return (
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
              <div>
                <span>Network</span>
                <strong>Le Soleil · Guest</strong>
              </div>
              <div>
                <span>Password</span>
                <strong>soleil-2026</strong>
                <button type="button" onClick={onCopyPassword}>
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
  );
}
