import React from "react";

const ResponsiveImage = ({ mobileSrc, desktopSrc, alt }) => {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrc} />
      <source media="(min-width: 768px)" srcSet={desktopSrc} />
      <img src={desktopSrc} alt={alt} className="md:min-w-[100%]" />
    </picture>
  );
};

export default ResponsiveImage;
