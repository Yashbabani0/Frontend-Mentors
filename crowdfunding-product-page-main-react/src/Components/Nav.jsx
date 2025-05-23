import logo from "/images/logo.svg";
import IconMenuClose from "/images/icon-close-menu.svg";
import IconMenuOpen from "/images/icon-hamburger.svg";
import { useState } from "react";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-screen flex items-center justify-between p-8 lg:py-12 lg:px-24 xl:px-40 relative">
      <img src={logo} alt="Logo" />

      {/* Desktop Menu */}
      <section className="hidden md:block text-white">
        <ul className="flex items-center gap-8">
          <li className="cursor-pointer hover:text-gray-200 transition-colors duration-300 ease-out">
            About
          </li>
          <li className="cursor-pointer hover:text-gray-200 transition-colors duration-300 ease-out">
            Discover
          </li>
          <li className="cursor-pointer hover:text-gray-200 transition-colors duration-300 ease-out">
            Get Started
          </li>
        </ul>
      </section>

      {/* Mobile Menu Toggle */}
      <section className="block md:hidden relative z-50">
        {!menuOpen ? (
          <img
            src={IconMenuOpen}
            className="cursor-pointer"
            alt="Open Menu"
            onClick={() => setMenuOpen(true)}
          />
        ) : (
          <img
            src={IconMenuClose}
            className="cursor-pointer"
            alt="Close Menu"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </section>

      {/* Mobile Menu */}
      {menuOpen && (
        <section className="absolute top-32 left-[50%] translate-x-[-50%] w-[80vw] text-black bg-white shadow-2xl rounded-xl z-40">
          <ul className="flex flex-col w-full h-full items-center justify-center">
            <li className="cursor-pointer  py-4 ease-out border-b w-full text-left font-bold px-8">
              About
            </li>
            <li className="cursor-pointer  py-4 ease-out border-b w-full text-left font-bold px-8">
              Discover
            </li>
            <li className="cursor-pointer  py-4 ease-out w-full text-left font-bold px-8">
              Get Started
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}

export default Nav;
