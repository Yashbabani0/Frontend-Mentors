import React from "react";
import images from "./Imgsimports.jsx";

export default function ProductImgmobile() {
  return (
    <div className="carousel w-full md:hidden">
      <div id="slide1" className="carousel-item relative w-full h-[20em]">
        <img src={images.imageProduct1} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide4"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full h-[20em]">
        <img src={images.imageProduct2} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide1"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❮
          </a>
          <a
            href="#slide3"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full h-[20em]">
        <img src={images.imageProduct3} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide2"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❮
          </a>
          <a
            href="#slide4"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full h-[20em]">
        <img src={images.imageProduct4} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide3"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle bg-white border-none text-dark-grayish-blue"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}
