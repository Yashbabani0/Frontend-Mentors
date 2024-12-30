import { useState } from "react";
import { images } from "./Images";

export default function ExpandableSection({
  title = "Section Title",
  items = [],
  isExpanded = false,
  primaryTextClass = "text-primary-veryDarkBlue",
  expandedTextClass = "text-neutral-veryDarkBlackBlue",
  backgroundClass = "bg-neutral-grayishBlue",
  textClass = "text-neutral-veryDarkGrayishBlue",
}) {
  const [expandSection, setExpandSection] = useState(isExpanded);

  return (
    <div className="relative">
      <div
        onClick={() => setExpandSection(!expandSection)}
        className="flex justify-center gap-2 items-center cursor-pointer"
      >
        <span
          className={`font-bold text-lg ${
            expandSection ? expandedTextClass : primaryTextClass
          }`}
        >
          {title}
        </span>
        <img
          src={images.iconArrowDark}
          alt="Toggle"
          className={`transition-transform ${
            expandSection ? "rotate-180" : ""
          }`}
        />
      </div>
      {expandSection && (
        <div
          className={`pt-2 flex w-[75vw] flex-col items-center justify-center ${backgroundClass} ${textClass} font-semibold text-center`}
        >
          <ul>
            {items.map((item, index) => (
              <li key={index} className="py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
