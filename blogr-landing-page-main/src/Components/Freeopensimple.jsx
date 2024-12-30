import { images } from "./Images.jsx";

export default function Freeopensimple() {
  return (
    <div className="py-16 text-center gap-8 flex flex-col relative w-screen h-full md:h-[150vh]">
      <div className="py-10 md:absolute top-0 md:pb-32 left-[-18%]">
        <img
          src={images.illustrationLaptopDesktop}
          className="hidden md:flex w-[100%]"
          alt=""
        />
        <img
          src={images.illustrationLaptopMobile}
          className="w-[100%] md:hidden"
          alt=""
        />
      </div>
      <div className="md:absolute md:w-[50%] right-0 md:text-left md:flex gap-8 md:flex-col items-center justify-center md:h-[100vh] lg:pr-28">
        <div className="px-8">
          <h3 className="pb-4 text-2xl lg:text-3xl text-primary-veryDarkBlue font-medium">
            Free, open, simple
          </h3>
          <p className="text-neutral-veryDarkGrayishBlue">
            Blogr is a free and open source application backed by a large
            community of helpful developers. It supports features such as code
            syntax highlighting, RSS feeds, social media integration,
            third-party commenting tools, and works seamlessly with Google
            Analytics. The architecture is clean and is relatively easy to
            learn.
          </p>
        </div>
        <div className="px-8">
          <h3 className="pb-4 text-2xl lg:text-3xl text-primary-veryDarkBlue font-medium">
            Powerful tooling
          </h3>
          <p className="text-neutral-veryDarkGrayishBlue">
            Batteries included. We built a simple and straightforward CLI tool
            that makes customization and deployment a breeze, but capable of
            producing even the most complicated sites.
          </p>
        </div>
      </div>
    </div>
  );
}
