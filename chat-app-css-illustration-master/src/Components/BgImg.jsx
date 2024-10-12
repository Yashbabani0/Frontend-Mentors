import React from "react";

export default function BgImg() {
  return (
    <div className="relative w-screen md:h-[100vh] h-[150vh] z-[-10]">
      <div className="w-[50vw] md:w-[30vw] h-[60vh] md:h-[90vh] absolute top-0 left-0 gradient rounded-br-[12em] md:rounded-b-[15em]"></div>
      <div className="w-[50vw] md:w-[40vw] md:h-[90vh] h-[80vh] absolute bottom-0 right-[-15%] bg-light-grayish-violet md:rounded-t-[30em] rounded-tl-[15em]"></div>
    </div>
  );
}
