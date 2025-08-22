// /app/page.tsx
import Image from "next/image";
import PcBackgroundImage from "@/public/assets/home/background-home-desktop.jpg";
import TabletBackgroundImage from "@/public/assets/home/background-home-tablet.jpg";
import MobileBackgroundImage from "@/public/assets/home/background-home-mobile.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <picture>
        {/* Desktop */}
        <source media="(min-width:1024px)" srcSet={PcBackgroundImage.src} />
        {/* Tablet */}
        <source media="(min-width:640px)" srcSet={TabletBackgroundImage.src} />
        {/* Mobile fallback */}
        <Image
          src={MobileBackgroundImage}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </picture>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center z-40 font-bellefair px-6 pt-16 gap-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center gap-4 lg:w-1/2 lg:text-left lg:items-start lg:px-16">
          <h2 className="uppercase text-blue-300 md:text-xl">
            so, you want to travel to
          </h2>
          <h1 className="uppercase text-7xl md:text-8xl">space</h1>
          <p className="text-blue-300">
            Let's face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we'll give you a truly out of this
            world experience!
          </p>
        </div>
        <Link
          href={"/destination"}
          className="lg:w-1/2 lg:flex lg:justify-end lg:items-start lg:pr-16"
        >
          <button className="relative bg-white text-black w-40 h-40 rounded-full cursor-pointer uppercase text-lg tracking-widest font-barlow-condensed transition-transform duration-300 hover:scale-[1.03] group  hover:text-gray-400 mt-4">
            Explore
            <div className="absolute inset-0 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-300 -z-10"></div>
            <div className="absolute inset-0 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
          </button>
        </Link>
      </div>
    </div>
  );
}
