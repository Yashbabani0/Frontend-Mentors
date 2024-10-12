import React from 'react';
import Milkbottlesmobile from '../assets/mobile/image-gallery-milkbottles.jpg';
import Milkbottlespc from '../assets/desktop/image-gallery-milkbottles.jpg';
import Orangemobile from '../assets/mobile/image-gallery-orange.jpg';
import Orangepc from '../assets/desktop/image-gallery-orange.jpg';
import Conemobile from '../assets/mobile/image-gallery-cone.jpg';
import Conepc from '../assets/desktop/image-gallery-cone.jpg';
import Sugarcubesmobile from '../assets/mobile/image-gallery-sugar-cubes.jpg';
import Sugarcubespc from '../assets/desktop/image-gallery-sugarcubes.jpg';

export default function Part3() {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-row flex-col justify-center ">
      <div>
        <img src={Milkbottlesmobile} alt="Milkbottles mobile" className="flex md:hidden" />
        <img src={Milkbottlespc} alt="Milkbottles PC" className="hidden md:flex" />
      </div>
      <div>
        <img src={Orangemobile} alt="Orange mobile" className="flex md:hidden" />
        <img src={Orangepc} alt="Orange PC" className="hidden md:flex" />
      </div>
      <div>
        <img src={Conemobile} alt="Cone mobile" className="flex md:hidden" />
        <img src={Conepc} alt="Cone PC" className="hidden md:flex" />
      </div>
      <div>
        <img src={Sugarcubesmobile} alt="Sugarcubes mobile" className="flex md:hidden" />
        <img src={Sugarcubespc} alt="Sugarcubes PC" className="hidden md:flex" />
      </div>
    </div>
  );
}
