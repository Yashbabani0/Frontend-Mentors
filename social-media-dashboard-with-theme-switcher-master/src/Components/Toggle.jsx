import React, { useState, useEffect } from "react";

function Toggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <div
          className="w-10 h-6 rounded-full bg-toggle-lightTheme transition-colors duration-300 ease-in-out 
                        dark:bg-gradient-to-r from-[hsl(210,78%,56%)] to-[hsl(146,68%,55%)]"
        >
          <div
            className={`absolute top-[3.5px] left-[3px] w-4 h-4 bg-white dark:bg-neutral-darkTheme-bg rounded-full shadow transform transition-transform 
                          duration-300 ease-in-out ${
                            isDarkMode ? "translate-x-4" : "translate-x-0"
                          }`}
          ></div>
        </div>
      </label>
    </div>
  );
}

export default Toggle;
