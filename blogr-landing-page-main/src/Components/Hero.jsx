import { images } from "./Images.jsx";
import Mobilemenu from "./Mobilemenu.jsx";
import Pcmenu from "./Pcmenu.jsx";
export default function Hero() {
  return (
    <div>
      <div className="hero h-screen md:h-[90vh] lg:h-[80vh] bg w-screen flex flex-col items-center justify-start">
        <nav className="flex items-center justify-between w-full py-8 px-6 md:px-16 lg:px-32">
          <section className="md:flex items-center justify-center md:gap-8">
            <img src={images.logo} alt="" />
            <Pcmenu />
          </section>

          <Mobilemenu />

          <section className="hidden md:flex items-center justify-center gap-8">
            <button className="text-lg text-white">Login</button>
            <button className="mobileSignUpButton py-3 px-10 rounded-full font-bold hover:bg-primary-veryLightRed text-white">
              Sign Up
            </button>
          </section>
        </nav>
        <div className="flex flex-col items-center justify-center text-center mt-16">
          <h1 className="text-white text-4xl w-[9em] mb-8 md:text-5xl lg:text-6xl md:w-full">
            A modern publishing platform
          </h1>
          <p className="text-neutral-grayishBlue text-lg px-12 mb-8">
            Grow your audience and build your online brand
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-white text-primary-lightRed font-semibold py-2 hover:opacity-80 px-6 rounded-full hover:bg-primary-veryLightRed hover:text-white">
              Start for Free
            </button>
            <button className="bg-transparent border-2 font-semibold border-neutral-grayishBlue text-white hover:bg-white hover:text-primary-lightRed py-2 px-6 rounded-full">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
