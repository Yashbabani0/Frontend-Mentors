import React from "react";

export default function FooterNewsLater() {
  return (
    <div className="bg-transparent bg-veryDarkCyan text-veryPaleBlue p-[2em] text-left flex flex-col items-start justify-center md:w-[50%] md:float-right h-[20em]">
      <h3 className="uppercase text-veryPaleBlue text-xl md:text-2xl">newsletter</h3>
      <p className="mt-[1em] md:w-[50%]">
        To recieve tips on how to grow your community, sign up to our weekly
        newsletter. We’ll never send you spam or pass on your email address
        Subscribe
      </p>
      <div className="flex gap-[1em] md:gap-[2em] mt-[1em] text-veryPaleBlue flex-col w-full relative md:flex-row">
        <input type="email" name="email" id="email" className="rounded-md w-[100%] h-[2em] md:w-[45%] md:h-[3em] text-veryDarkCyan ps-[1em]" />
        <input type="button" value="submit" className="rounded-md bg-pink hover:bg-lightPink cursor-pointer h-[2em] w-[8em] md:h-[3em] md:w-[10em] absolute right-0 top-[150%] md:relative md:top-0" />
      </div>
    </div>
  );
}
