import check from "/images/icon-check.svg";

function ThankuforSupport() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen hidden items-center justify-center bg-Black/20">
      <div className="absolute top-20 left-[50%] translate-x-[-50%] flex flex-col items-center justify-center shadow-2xl text-center gap-4 bg-white w-[20em] p-8 rounded-lg md:w-[30em]">
        <img src={check} alt="" />
        <h2 className="text-xl md:text-2xl font-bold">
          Thanks for your support!
        </h2>
        <p className="text-sm leading-6">
          Your pledge brings us one step closer to sharing Mastercraft Bamboo
          Monitor Riser worldwide. You will get an email once our campaign is
          completed.
        </p>
        <button className="bg-Green-400 text-white font-bold rounded-full cursor-pointer hover:bg-Green-700 transition-all duration-300 ease-in border-0 py-3 px-8 mt-4">
          Got it!
        </button>
      </div>
    </div>
  );
}

export default ThankuforSupport;
