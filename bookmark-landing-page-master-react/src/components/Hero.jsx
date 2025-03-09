import hero from "/public/images/illustration-hero.svg";

function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:flex-row-reverse">
      <div className="relative lg:w-1/2">
        <img src={hero} alt="" className="lg:w-[40em] z-20" />
        <div className="bg-Soft-Blue rounded-tl-full rounded-bl-full w-[60%] h-80 absolute bottom-0 right-0 -z-10"></div>
      </div>
      <div
        className="flex flex-col items-center lg:items-start justify-center px-4 lg:px-40 lg:w-1/2
      text-center lg:text-left gap-8"
      >
        <h1 className="text-Very-Dark-Blue text-3xl md:text-4xl lg:text-5xl font-medium">
          A Simple Bookmark Manager
        </h1>
        <p className="text-Grayish-Blue text-sm font-medium">
          A clean and simple interface to organize your favourite websites. Open
          a new browser tab and see your sites load instantly. Try it for free.
        </p>
        <div className="flex gap-4">
          <button className="bg-Soft-Blue text-sm md:text-lg text-White px-4 py-2 rounded-md cursor-pointer border-2 border-Soft-Blue hover:bg-transparent hover:text-Soft-Blue transition-all duration-300">
            Get it on Chrome
          </button>
          <button className="bg-[#f7f7f8] text-sm md:text-lg text-Grayish-Blue shadow-2xl shadow-Grayish-Blue px-4 py-2 rounded-md cursor-pointer hover:border-2 hover:border-Very-Dark-Blue hover:bg-transparent hover:text-Very-Dark-Blue transition-all duration-300">
            Get it on Firefox
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
