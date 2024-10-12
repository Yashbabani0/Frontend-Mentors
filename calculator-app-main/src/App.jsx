import React, { useState } from "react";
import Calculator from "./Components/Calculator";
import './index.css'; // Ensure you import the CSS file

export default function App() {
  const [theme, setTheme] = useState('theme1');

  return (
    <div className={`app ${theme} min-h-screen flex flex-col justify-center items-center`}>
      <Calculator setTheme={setTheme} theme={theme} />
    </div>
  );
}
