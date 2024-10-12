import React from "react";
import Nav from "@/components/Nav";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import MainBgImg from "@/components/MainBgImg";
import Part3 from "@/components/Part3";
import Part1 from "@/components/Part1";
import Part2 from "@/components/Part2";

export default function App() {
  return (
    <div>
      <Nav />
      <MainBgImg />
      <MainHeader />
      <Part1 />
      <Part2 />
      <Part3 />
      <Footer />
    </div>
  );
}
