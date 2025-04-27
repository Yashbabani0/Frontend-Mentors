import Header from "./Components/Header";
import Nav from "./Components/Nav";
import { ContextProveider } from "./Context/Context";
import { useState, useEffect } from "react";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };
  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ContextProveider value={{ themeMode, darkTheme, lightTheme }}>
      <div className="w-screen min-h-screen bg-gradient-to-b from-[#EBF2FC] to-[#EEF8F9] dark:from-[#040918] dark:to-[#091540] p-4 md:p-6 lg:p-12 lg:px-32 flex items-start justify-start gap-8 flex-col">
        <Nav />
        <Header />
      </div>
    </ContextProveider>
  );
}

export default App;
