import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Aboutmanage from "./Components/Aboutmanage";
import Getstarted from "./Components/Getstarted";
import Testimonials from "./Components/Testimonials";
function App() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Aboutmanage />
      <Testimonials />
      <Getstarted />
      <Footer />
    </div>
  );
}

export default App;
