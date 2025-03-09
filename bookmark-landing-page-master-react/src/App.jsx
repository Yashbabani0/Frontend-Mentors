import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import Extension from "./components/Extension";
import Features from "./components/Features";
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Extension />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
