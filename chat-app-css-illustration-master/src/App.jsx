import React from "react";
import BgImg from "./Components/BgImg";
import Content from "./Components/Content";

export default function App() {
  return (
    <div className="max-w-[100vw] h-auto overflow-hidden">
      <BgImg />
      <Content />
    </div>
  );
}
