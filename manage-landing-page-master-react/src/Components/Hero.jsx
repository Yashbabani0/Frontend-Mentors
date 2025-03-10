import Button from "./Button";

function Hero() {
  return (
    <div className="relative w-full min-h-[300px] mt-16 z-10 lg:px-40">
      <div className="absolute -top-48 lg:-top-80 -right-20 lg:-right-40 -z-[1]">
        <img
          src="/images/bg-tablet-pattern.svg"
          className="rounded-full w-[25em] h-[25em] xl:w-[50em] xl:h-[50em] lg:w-[40em] lg:h-[40em]"
          alt="Tablet pattern"
        />
      </div>
      <div className="lg:flex lg:items-center lg:justify-center lg:flex-row-reverse gap-8">
        <div className="z-[9999] lg:w-1/2 flex items-center justify-center">
          <img src="/images/illustration-intro.svg" alt="" />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 my-8 lg:w-1/2 lg:items-start">
          <h1 className="text-4xl font-bold text-center lg:text-left text-Very-Dark-Blue">
            Bring everyone together to build better products.
          </h1>
          <p className="text-center text-Dark-Grayish-Blue pb-8 lg:text-left">
            Manage makes it simple for software teams to plan day-to-day tasks
            while keeping the larger team goals in view.
          </p>
          <Button />
        </div>
      </div>
    </div>
  );
}

export default Hero;
