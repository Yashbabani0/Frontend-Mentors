import Image from "next/image";

import { navigationItems } from "../data";

type SidebarProps = {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onToggleMenu: () => void;
};

export function Sidebar({ isMenuOpen, onCloseMenu, onToggleMenu }: SidebarProps) {
  return (
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
          onClick={onToggleMenu}
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
            onClick={onCloseMenu}
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
  );
}
