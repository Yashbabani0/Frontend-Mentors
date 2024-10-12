import { useState } from "react";
import logo from "../assets/logo.svg";
import menuImg from "../assets/icon-hamburger.svg";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="py-[2em] px-[3em] flex items-center justify-between relative z-10">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="menulink">
          <img
            src={menuImg}
            className="md:hidden cursor-pointer"
            alt="Menu Icon"
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <div className="menuMobileData absolute bottom-[-250%] left-[50%] translate-x-[-50%] bg-white w-[80%] h-[12em] text-center flex items-center justify-center">
              <div className="triangleShape md:hidden bg-white w-[2em] h-[2em] absolute right-[0] top-[-8%] rounded-tl-[20em] rounded-br-[2em] rounded-l-[20em] rotate-[225deg]"></div>
              <ul className="leading-8 text-grayishBlue font-bold">
                <li className="cursor-pointer">About</li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">Projects</li>
                <li className="mt-[1em] md:mt-0 px-[2em] md:py-[0.4em] py-[0.7em] font-semibold rounded-[3em] bg-yellow text-black hover:bg-opacity-40 md:hover:bg-opacity-70 cursor-pointer transition duration-300 ease-in-out font-fraunces tracking-wider md:bg-white">
                  Contact
                </li>
              </ul>
            </div>
          )}
          {/* PC Menu */}
          <div className="hidden md:flex md:items-center md:justify-between">
            <ul className="leading-8 text-white font-bold md:flex md:items-center md:justify-center md:gap-[2em]">
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Services</li>
              <li className="cursor-pointer">Projects</li>
              <li className="px-[2em] py-[0.4em] font-semibold rounded-[3em] text-black hover:bg-opacity-70 cursor-pointer transition duration-300 ease-in-out font-fraunces tracking-wider bg-white">
                Contact
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
