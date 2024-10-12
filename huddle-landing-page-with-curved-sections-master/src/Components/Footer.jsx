import React from "react";
import FooterNewsLater from "./FooterNewsLater";
import bgFooterMobile from "../../public/bg-footer-top-mobile.svg";
import bgFooterPc from "../../public/bg-footer-top-desktop.svg";
import FooterAbout from "./FooterAbout";

export default function Footer() {
  return (
    <div className="min-w-full h-full">
      <div className="min-w-full">
        <picture>
          <source media="(max-width: 767px)" srcSet={bgFooterMobile} />
          <source media="(min-width: 768px)" srcSet={bgFooterPc} />
          <img src={bgFooterPc} alt="Background Top" className="min-w-full" />
        </picture>
      </div>
      <FooterNewsLater />
      <FooterAbout />
    </div>
  );
}
