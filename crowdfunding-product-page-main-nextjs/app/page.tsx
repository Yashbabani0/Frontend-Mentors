import AboutProject from "@/components/AboutProject";
import Details from "@/components/details";
import Header from "@/components/Header";
import MobileMenu from "@/components/mobilemenu";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="z-50 min-h-screen">
      <picture>
        <source srcSet="/image-hero-desktop.jpg" media="(min-width: 720px)" />
        <Image
          src="/image-hero-mobile.jpg"
          width={375}
          height={375}
          alt="hero"
          className="w-screen h-80 absolute -z-10"
        />
      </picture>
      <MobileMenu />
      <Header />
      <Details />
      <AboutProject />
    </div>
  );
}
