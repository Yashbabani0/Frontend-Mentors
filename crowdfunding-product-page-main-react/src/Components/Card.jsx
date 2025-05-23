function Card({
  title = "Bamboo Stand",
  pledge = "Pledge $25 or more",
  para = `You get an ergonomic stand made of
natural bamboo. You've helped us
launch our promotional campaign,
and you'll be added to a special
Backer member list.`,
  left = "101",
  button = "Select Reward",
  isLast = false,
}) {
  return (
    <div className="relative w-full z-10">
      <div
        className={`p-8 w-full flex flex-col items-start justify-start gap-6 border-2 border-gray-300 rounded-xl bg-white`}
      >
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <b className="font-bold text-xl">{title}</b>
          <b className="text-Green-400 text-sm">{pledge}</b>
        </div>
        <p className="font-medium">{para}</p>
        <div className="flex flex-col md:flex-row gap-8 md:items-center md:justify-between w-full">
          <p className="text-Gray-500">
            <span className="text-Black text-2xl font-bold">{left}</span> left
          </p>
          <button
            className="rounded-full py-3 w-[14em] text-white font-bold cursor-pointer transition-colors duration-300 ease-in"
            style={{
              backgroundColor: isLast ? "#cbcbcb" : "hsl(176, 50%, 47%)",
              cursor: isLast ? "not-allowed" : "pointer",
            }}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
