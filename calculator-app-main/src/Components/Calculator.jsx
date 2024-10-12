import React, { useState } from "react";
import Screen from "./Screen";
import Keypad from "./Keypad";
import CalcuHeading from "./CalcuHeading";

export default function Calculator({ setTheme, theme }) {
  const [value, setValue] = useState("");

  return (
    <div className="calculator">
      <CalcuHeading setTheme={setTheme} theme={theme} />
      <Screen value={value} theme={theme}/>
      <Keypad value={value} setValue={setValue} theme={theme} />
    </div>
  );
} 
