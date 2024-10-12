import React, { useState } from "react";
import Profile from "./Components/Profile";
import Databox from "./Components/Databox";

export default function App() {
  const [activeTab, setActiveTab] = useState("Daily");

  return (
    <div className="bg-very-dark-blue text-white h-full w-screen flex flex-col items-center font-rubik md:flex-row md:justify-center md:gap-[2em] md:h-screen">
      <Profile setActiveTab={setActiveTab} />
      <Databox activeTab={activeTab} />
    </div>
  );
}
