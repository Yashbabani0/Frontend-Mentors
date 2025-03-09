import chrome from "/public/images/logo-chrome.svg";
import dots from "/public/images/bg-dots.svg";

function Card({
  image,
  title = "Add to Chrome",
  version = "Minimum version 62",
}) {
  return (
    <div className="bg-white shadow-lg shadow-Soft-Blue/40 rounded-lg p-4 flex flex-col gap-4 text-center items-center justify-center">
      <img src={image} alt={title} className="mt-8" />
      <h3 className="text-Very-Dark-Blue text-lg font-medium">{title}</h3>
      <p className="text-Grayish-Blue text-sm font-medium">{version}</p>
      <img src={dots} alt="" className="my-2" />
      <button className="bg-Soft-Blue text-sm md:text-lg text-White px-4 py-2 rounded-md cursor-pointer border-2 border-Soft-Blue hover:bg-transparent hover:text-Soft-Blue transition-all duration-300 font-medium">
        Add & Install Extension
      </button>
    </div>
  );
}

export default Card;
