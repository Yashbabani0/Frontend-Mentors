import { images } from "./Images.jsx";

export default function StateoftheartInfrastructure() {
  return (
    <div className="StateoftheartInfrastructure rounded-tr-[8em] rounded-bl-[8em] relative md:mt-[15em] mt-[15em] my-8 w-screen h-[100vh] md:h-[80vh] lg:h-[55vh] flex items-center justify-end pb-24 lg:pb-0 text-center flex-col md:items-end md:text-left lg:justify-center">
      <img
        src={images.illustrationPhones}
        className="absolute top-[-50%] md:left-[0%] lg:top-[-20%]"
        alt=""
      />
      <div className="flex flex-col gap-4 px-4 md:w-1/2 lg:pr-24">
        <h2 className="text-white text-4xl md:text-5xl">
          State of the Art Infrastructure
        </h2>
        <p>
          With reliability and speed in mind, worldwide data centers provide the
          backbone for ultra-fast connectivity. This ensures your site will load
          instantly, no matter where your readers are, keeping your site
          competitive.
        </p>
      </div>
    </div>
  );
}
