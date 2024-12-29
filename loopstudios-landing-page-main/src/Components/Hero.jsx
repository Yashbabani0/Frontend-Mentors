import { icons } from "./Imgimports";
import MobileMenu from "./MobileMenu";

export default function Hero() {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center md:justify-start">
      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full px-[2em] h-[5em]">
        <div className="sticky top-0 flex items-center justify-between py-10 md:px-[5em] lg:px[10em] xl:px-[15em]">
          <img src={icons.logo} alt="" className="z-[9999]" />
          <MobileMenu />
          <div className="hidden md:flex items-center justify-center md:gap-4 lg:gap-10">
            <a href="#" className="capitalize text-white">about</a>
            <a href="#" className="capitalize text-white">careers</a>
            <a href="#" className="capitalize text-white">events</a>
            <a href="#" className="capitalize text-white">products</a>
            <a href="#" className="capitalize text-white">support</a>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center -z-[10] hidden md:block"
        style={{ backgroundImage: `url('/images/desktop/image-hero.jpg')` }}
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center -z-[10] md:hidden"
        style={{ backgroundImage: `url('/images/mobile/image-hero.jpg')` }}
      ></div>

      <div className="relative -z-[5] bg-transparent border-2 border-white p-6 w-[18em] md:w-[26em] md:ml-[10em] 2xl:ml-[17em]">
        <h1 className="text-white uppercase font-light text-4xl md:text-5xl leading-none">
          Immersive experiences that deliver
        </h1>
      </div>
    </div>
  );
}
