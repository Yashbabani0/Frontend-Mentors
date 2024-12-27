import React, { useState } from "react";
import images from "./Imgsimports.jsx";

export default function ProductImg() {
  const [mainImage, setMainImage] = useState(images.imageProduct1);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="hidden md:flex w-1/2 items-center justify-center flex-col gap-4">
      <img src={mainImage} alt="Main Product" className="w-[22em] rounded-xl" />

      <div className="flex gap-4 carousel">
        <img
          src={images.imageProduct1Thumbnail}
          alt="Thumbnail 1"
          className={`w-[4.5em] h-[4.5em] rounded-xl cursor-pointer ${
            mainImage === images.imageProduct1
              ? "border-2 border-orange opacity-70"
              : ""
          }`}
          onClick={() => handleThumbnailClick(images.imageProduct1)}
        />
        <img
          src={images.imageProduct2Thumbnail}
          alt="Thumbnail 2"
          className={`w-[4.5em] h-[4.5em] rounded-xl cursor-pointer ${
            mainImage === images.imageProduct2
              ? "border-2 border-orange opacity-70"
              : ""
          }`}
          onClick={() => handleThumbnailClick(images.imageProduct2)}
        />
        <img
          src={images.imageProduct3Thumbnail}
          alt="Thumbnail 3"
          className={`w-[4.5em] h-[4.5em] rounded-xl cursor-pointer ${
            mainImage === images.imageProduct3
              ? "border-2 border-orange opacity-70"
              : ""
          }`}
          onClick={() => handleThumbnailClick(images.imageProduct3)}
        />
        <img
          src={images.imageProduct4Thumbnail}
          alt="Thumbnail 4"
          className={`w-[4.5em] h-[4.5em] rounded-xl cursor-pointer ${
            mainImage === images.imageProduct4
              ? "border-2 border-orange opacity-70"
              : ""
          }`}
          onClick={() => handleThumbnailClick(images.imageProduct4)}
        />
      </div>
    </div>
  );
}
