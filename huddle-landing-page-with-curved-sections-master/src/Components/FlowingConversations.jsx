import React from "react";
import FlowingConversationsImg from "../../public/illustration-flowing-conversation.svg";

export default function FlowingConversations() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center mb-[6em] pb-[2em] md:flex-row">
      <div className="img md:w-[50%]">
        <img src={FlowingConversationsImg} alt="" className="w-[60%] m-auto" />
      </div>
      <div className="content px-[1.5em] leading-7 mt-[2em] md:w-[50%] md:flex md:items-left md:justify-center md:flex-col md:h-[20em] md:text-left">
        <h2 className="mb-[1em] tracking-wider text-xl text-veryDarkCyan md:text-left md:ps-20 md:text-3xl md:mb-[0.6em]">
          Flowing Conversations
        </h2>
        <p className="text-veryDarkCyan md:ps-20 md:tracking-wider">
          You wouldn't paginate a conversation in real life, so why do it
          online? Our threads have just-in-time loading for a more natural flow.
        </p>
      </div>
    </div>
  );
}
