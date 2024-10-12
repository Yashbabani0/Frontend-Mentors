import React from "react";

export default function Screen({ value, theme }) {
  return (
    <div className="screen_div flex justify-center mt-2 mb-4">
      <input
        type="text"
        name="screen"
        id={`${theme}_screen`}
        className={`w-[95%] h-20 text-right p-2 text-3xl rounded-lg tracking-widest ${theme}_screen`}
        readOnly
        value={value}
      />
    </div>
  );
}
