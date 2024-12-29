export default function Creations({ desktopImage, mobileImage, title }) {
  return (
    <div className="flex items-center justify-center w-[16em] relative text-center">
      {/* Desktop Image */}
      <div>
        <img src={desktopImage} className="hidden md:block" alt={title} />
      </div>

      {/* Mobile Image */}
      <div>
        <img src={mobileImage} className="md:hidden" alt={title} />
      </div>

      {/* Overlay Title */}
      <div className="absolute bottom-[10%] left-[10%] text-left">
        <h3 className="text-white text-2xl md:text-3xl font-light uppercase leading-none pr-16">
          {Array.isArray(title)
            ? title.map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))
            : title}
        </h3>
      </div>
    </div>
  );
}
