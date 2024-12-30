import ExpandableSection from "./ExpandableSection";
import { images } from "./Images";
import { useState } from "react";

export default function Mobilemenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandSection, setExpandSection] = useState(false);

  return (
    <div className="drawer drawer-end md:hidden w-[2em] h-[2em]">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        onChange={(e) => setMenuOpen(e.target.checked)}
      />
      <div className="drawer-content">
        {!menuOpen && (
          <label htmlFor="my-drawer-4" className="drawer-button">
            <img src={images.iconHamburger} alt="Open Menu" />
          </label>
        )}
        {menuOpen && (
          <label
            htmlFor="my-drawer-4"
            aria-label="Close sidebar"
            className="drawer-button"
          >
            <img src={images.iconClose} alt="Close Menu" />
          </label>
        )}
      </div>
      <div
        className={`drawer-side w-[80vw] min-h-[10em] max-h-[25em] rounded-lg bg-transparent mx-[2em] mt-16 transition-shadow duration-300 ${
          menuOpen ? "shadow-2xl" : "shadow-none"
        }`}
      >
        <ul className="menu h-full w-[100%] flex flex-col gap-4 bg-white p-8 px-[0.7em] text-black">
          <ExpandableSection
            title="Product"
            items={[
              "Overview",
              "Pricing",
              "Marketplace",
              "Features",
              "Integrations",
            ]}
            primaryTextClass="text-primary-veryDarkBlue"
            expandedTextClass="text-neutral-veryDarkBlackBlue"
            backgroundClass="bg-neutral-grayishBlue"
            textClass="text-neutral-veryDarkGrayishBlue"
          />
          <ExpandableSection
            title="Company"
            items={["About", "Team", "Blog", "Careers"]}
            primaryTextClass="text-primary-veryDarkBlue"
            expandedTextClass="text-neutral-veryDarkBlackBlue"
            backgroundClass="bg-neutral-grayishBlue"
            textClass="text-neutral-veryDarkGrayishBlue"
          />
          <ExpandableSection
            title="Connect"
            items={["Contact", "Newsletter", "LinkedIn"]}
            primaryTextClass="text-primary-veryDarkBlue"
            expandedTextClass="text-neutral-veryDarkBlackBlue"
            backgroundClass="bg-neutral-grayishBlue"
            textClass="text-neutral-veryDarkGrayishBlue"
          />
          <section className="border-t-2 flex flex-col items-center justify-center py-8 gap-4">
            <button className="text-xl text-primary-veryDarkBlue">Login</button>
            <button className="mobileSignUpButton py-3 px-10 rounded-full font-bold text-white">
              Sign Up
            </button>
          </section>
        </ul>
      </div>
    </div>
  );
}
