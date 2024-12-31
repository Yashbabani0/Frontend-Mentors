import {
  imageHeroMobile,
  imageHeroDesktop,
  clientAudiophile,
  clientDatabiz,
  clientMaker,
  clientMeet,
} from "./Images.jsx";
export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-screen h-full">
      <section>
        <img src={imageHeroMobile} className="lg:hidden" alt="" />
      </section>
      <section className="text-center flex flex-col my-8 gap-5 items-center justify-center lg:text-left lg:items-start lg:px-32 lg:gap-8 lg:w-1/2">
        <h1 className="text-Almost-Black font-bold text-4xl lg:text-7xl lg:pr-10">
          Make remote work
        </h1>
        <p className="text-Medium-Gray px-2">
          Get your team in sync, no matter your location. Streamline processes,
          create team rituals, and watch productivity soar.
        </p>
        <button className="bg-Almost-Black text-Almost-White py-3 px-6 rounded-xl hover:border-2 hover:border-Almost-Black hover:bg-transparent hover:text-Almost-Black transition-colors duration-300">
          Learn more
        </button>
        <div className="flex gap-4 w-full items-center justify-center">
          <img src={clientDatabiz} alt="" className="w-16" />
          <img src={clientAudiophile} alt="" className="w-16" />
          <img src={clientMeet} alt="" className="w-16" />
          <img src={clientMaker} alt="" className="w-16" />
        </div>
      </section>
      <section className="w-1/2 flex items-center justify-center">
        <img src={imageHeroDesktop} className="hidden lg:block w-[55%]" alt="" />
      </section>
    </div>
  );
}
