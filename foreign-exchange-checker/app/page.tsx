import LiveMarketBar from "@/components/LiveMarketbar";
import Navbar from "@/components/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <LiveMarketBar />
    </div>
  );
}
