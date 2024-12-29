import React from "react";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Ourcreations from "./Components/Ourcreations";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <div className="h-full w-full">
      <Hero />
      <About />
      <Ourcreations />
      <Footer />
    </div>
  );
}
