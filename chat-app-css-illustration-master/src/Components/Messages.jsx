import React from "react";
import dog1 from "../../public/dog-image-1.jpg";
import dog2 from "../../public/dog-image-2.jpg";
import dog3 from "../../public/dog-image-3.jpg";

export default function Messages() {
  return (
    <div className="h-[30em] bg-transparent p-[1em] flex flex-col gap-[0.7em] text-[0.7em]">
      <div className="w-[50%] md:w-[60%] bg-pale-violet bg-opacity-70 text-moderate-violet font-medium tracking-wide p-[0.5em] px-[1em] rounded-t-[1em] rounded-br-[1em] rounded-bl-[0.5em]">That sounds great. I’d be happy with that.</div>
      <div className="w-[55%] md:w-[80%] bg-pale-violet bg-opacity-70 text-moderate-violet font-medium tracking-wide p-[0.5em] px-[1em] rounded-t-[1em] rounded-br-[1em] rounded-bl-[0.5em]">Could you send over some pictures of your dog, please?</div>
      <div className="flex gap-[0.6em] items-center justify-end w-full mt-[1em]">
        <img src={dog1} alt="" className="w-[4em] rounded-xl" />
        <img src={dog2} alt="" className="w-[4em] rounded-xl" />
        <img src={dog3} alt="" className="w-[4em] rounded-xl" />
      </div>
      <div className="flex items-center w-[70%] rounded-t-[1em] rounded-bl-[1em] rounded-br-[0.5em] text-desaturated-dark-violet border self-end text-[0.9em] bg-white py-[1em] px-[1em]">Here are a few pictures. She’s a happy girl!</div>
      <div className="flex items-center w-[45%] rounded-t-[1em] rounded-bl-[1em] rounded-br-[0.5em] text-desaturated-dark-violet border self-end text-[0.9em] bg-white py-[1em] px-[1em]">Can you make it?</div>
      <div className="w-[73%] bg-pale-violet bg-opacity-70 text-moderate-violet font-medium tracking-wide p-[0.5em] px-[1em] rounded-t-[1em] rounded-br-[1em] rounded-bl-[0.5em]">
        She looks so happy! The time we discussed works. How long shall I take
        her out for?
      </div>
      <div className="flex items-center justify-between price rounded-br-[1em] rounded-bl-[0.5em] rounded-t-[1em] p-[1em]">
        <div className="flex gap-[1em] items-center">
          <div className="w-[1.5em] h-[1.5em] border-2 border-very-light-magenta rounded-full"></div>
          <p className="text-light-grayish-violet">30 minute walk</p>
        </div>
        <b className="text-xl text-white">$29</b>
      </div>
      <div className="flex items-center justify-between price rounded-br-[1em] rounded-bl-[0.5em] rounded-t-[1em] p-[1em]">
        <div className="flex gap-[1em] items-center">
          <div className="w-[1.5em] h-[1.5em] border-2 border-very-light-magenta rounded-full"></div>
          <p className="text-light-grayish-violet">1 hour walk</p>
        </div>
        <b className="text-xl text-white">$49</b>
      </div>
      <div className="flex justify-between items-center bg-white rounded-full mt-[1em] h-[5em]">
        <div className="text-desaturated-dark-violet pl-[1em]">Type a message…</div>
        <div className="bg-very-dark-desaturated-violet w-[4em] h-[4em] rounded-full flex justify-center items-center">
          <b className="font-bold text-white text-[1.5em]">{">"}</b>
        </div>
      </div>
    </div>
  );
}
