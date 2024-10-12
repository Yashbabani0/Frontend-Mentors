import React from "react";
import Toggle from "./Toggle";

export default function CalcuHeading({ setTheme }) {
  return (
    <div className={`theme1_calcu_heading h-16 flex items-center justify-between px-4 rounded`}>
      <h5 className="text-[1.3em]">calcu</h5>
      <Toggle setTheme={setTheme} />
    </div>
  );
}
