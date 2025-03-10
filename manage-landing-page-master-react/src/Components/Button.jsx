function Button({ text = "Get Started" }) {
  return (
    <button className="bg-Bright-Red text-white px-6 py-2 rounded-full cursor-pointer hover:bg-Bright-Red/70 shadow-xl shadow-Very-Dark-Blue/30 transition-all duration-300">
      {text}
    </button>
  );
}

export default Button;
