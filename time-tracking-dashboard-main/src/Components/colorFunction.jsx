import React from "react";

// colorUtils.js
export const getBackgroundColor = (colorName) => {
  const colorMap = {
    "primary-blue": "#7c3aed", // Use hex values here
    "light-red-work": "#f87171",
    "soft-blue-play": "#60a5fa",
    "light-red-study": "#f87171",
    "lime-green-exercise": "#84cc16",
    "violet-social": "#8b5cf6",
    "soft-orange-self-care": "#f59e0b",
  };
  return colorMap[colorName] || "#ffffff"; // default color
};
