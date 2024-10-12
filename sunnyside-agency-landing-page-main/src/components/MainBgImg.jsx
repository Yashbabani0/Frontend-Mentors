import React from 'react';
import backgroundImageMobile from '../assets/mobile/image-header.jpg';
import backgroundImagePc from '../assets/desktop/image-header.jpg';

export default function MainBgImg() {
  return (
    <div>
        <div className="bgImg z-[-10] h-[86vh] md:h-[82vh]">
        <img
          src={backgroundImageMobile}
          className="absolute top-0 left-0 md:hidden h-full w-full"
          alt=""
        />
        <img
          src={backgroundImagePc}
          className="h-full w-full absolute top-0 left-0"
          alt=""
        />
      </div>
    </div>
  )
}
