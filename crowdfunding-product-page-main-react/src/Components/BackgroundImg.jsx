import Pcimg from "/images/image-hero-desktop.jpg";
import Mobileimg from "/images/image-hero-mobile.jpg";
function BackgroundImg() {
  return (
    <div className="absolute top-0 left-0 -z-10 w-screen h-72">
      <picture>
        <source srcSet={Pcimg} media="(min-width: 1024px)" />
        <img src={Mobileimg} className="w-full h-full" alt="" />
      </picture>
    </div>
  );
}

export default BackgroundImg;
