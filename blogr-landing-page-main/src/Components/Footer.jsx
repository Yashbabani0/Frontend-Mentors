import { images } from "./Images.jsx";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center lg:justify-between lg:px-16 lg:flex-row bg-neutral-veryDarkBlackBlue w-screen h-full gap-8 text-center py-8 rounded-tr-[6em]">
      <div>
        <img src={images.logo} alt="" />
      </div>
      <div className="flex flex-col gap-2">
        <b className="pb-4 text-white">Product</b>
        <a href="#">Overview</a>
        <a href="#">Pricing</a>
        <a href="#">Marketplace</a>
        <a href="#">Features</a>
        <a href="#">Integrations</a>
      </div>
      <div className="flex flex-col gap-2">
        <b className="pb-4 text-white">Company</b>
        <a href="#">About</a>
        <a href="#">Team</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
      </div>
      <div className="flex flex-col gap-2">
        <b className="pb-4 text-white">Connect</b>
        <a href="#">Contact</a>
        <a href="#">Newslatter</a>
        <a href="#">LinkedIn</a>
      </div>
    </div>
  );
}
